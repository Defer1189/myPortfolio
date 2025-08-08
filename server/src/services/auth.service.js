// myPortfolio/server/src/services/auth.service.js
import jwt from 'jsonwebtoken';

import logger from '../utils/logger.js';

/**
 * Genera un token JWT
 *
 * @param {string} id - ID del usuario
 * @returns {string} Token JWT
 */
export const generateToken = (id) => {
    try {
        return jwt.sign({ id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });
    } catch (error) {
        logger.error('Error al generar token JWT:', error);
        throw new Error('Error al generar token de autenticación');
    }
};

/**
 * Genera un token de refresco con expiración más larga
 *
 * @param {string} id - ID del usuario
 * @returns {string} Token de refresco
 */
export const generateRefreshToken = (id) => {
    try {
        return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, {
            expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
        });
    } catch (error) {
        logger.error('Error al generar refresh token JWT:', error);
        throw new Error('Error al generar token de refresco');
    }
};

/**
 * Configura las cookies con el token JWT
 *
 * @param {object} res - Objeto de respuesta
 * @param {string} token - Token JWT
 * @param {string} refreshToken - Token de refresco
 */
export const sendTokenCookie = (res, token, refreshToken = null) => {
    try {
        const cookieOptions = {
            expires: new Date(Date.now() + parseInt(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: '/',
        };
        res.cookie('jwt', token, cookieOptions);
        if (refreshToken) {
            const refreshCookieOptions = {
                ...cookieOptions,
                expires: new Date(
                    Date.now() + parseInt(process.env.JWT_REFRESH_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000,
                ),
            };
            res.cookie('refresh_token', refreshToken, refreshCookieOptions);
        }
        logger.debug('Cookies de autenticación configuradas correctamente');
    } catch (error) {
        logger.error('Error al configurar cookies de autenticación:', error);
        throw new Error('Error al configurar cookies de autenticación');
    }
};
