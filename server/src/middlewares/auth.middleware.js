// myPortfolio/server/src/middlewares/auth.middleware.js
import jwt from 'jsonwebtoken';

import User from '../models/User.js';
import logger from '../utils/logger.js';

/**
 * Extrae el token JWT de la solicitud
 *
 * @param {import('express').Request} req - Objeto de solicitud
 * @returns {string|null} Token JWT o null si no existe
 */
const extractToken = (req) => {
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        return req.headers.authorization.split(' ')[1];
    } else if (req.cookies && req.cookies.jwt) {
        return req.cookies.jwt;
    }
    return null;
};

/**
 * Verifica y obtiene el usuario a partir del token
 *
 * @param {string} token - Token JWT
 * @returns {Promise<object>} Usuario autenticado
 */
const verifyTokenAndGetUser = async (token) => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
        throw new Error('El usuario ya no existe');
    }
    return user;
};

/**
 * Middleware para proteger rutas que requieren autenticación
 *
 * @param {import('express').Request} req - Objeto de solicitud
 * @param {import('express').Response} res - Objeto de respuesta
 * @param {import('express').NextFunction} next - Función next
 * @returns {void}
 */
export const protect = async (req, res, next) => {
    try {
        const token = extractToken(req);
        if (!token) {
            res.status(401);
            return next(new Error('No estás autenticado, por favor inicia sesión'));
        }
        const currentUser = await verifyTokenAndGetUser(token);
        req.user = currentUser;
        logger.debug(`Usuario autenticado: ${currentUser.email} (${currentUser._id})`);
        next();
    } catch (error) {
        logger.warn(`Error de autenticación: ${error.message}`);
        res.status(401);
        if (error.name === 'JsonWebTokenError') {
            return next(new Error('Token inválido'));
        }
        if (error.name === 'TokenExpiredError') {
            return next(new Error('Tu sesión ha expirado. Por favor, inicia sesión nuevamente'));
        }
        next(error);
    }
};

/**
 * Middleware para restricción de acceso según roles
 *
 * @param {...string} roles - Roles permitidos para acceder a la ruta
 * @returns {Function} Middleware
 */
export const restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            res.status(500);
            return next(new Error('Error de configuración: El middleware protect debe ejecutarse primero'));
        }
        if (!roles.includes(req.user.role)) {
            logger.warn(
                `Acceso denegado: ${req.user.email} (rol: ${req.user.role}) intentó acceder a una ruta restringida`,
            );
            res.status(403);
            return next(new Error('No tienes permiso para realizar esta acción'));
        }
        logger.debug(`Acceso autorizado para ${req.user.email} (rol: ${req.user.role})`);
        next();
    };
};
