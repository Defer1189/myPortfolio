// myPortfolio/server/src/controllers/auth.controller.js
import jwt from 'jsonwebtoken';

import User from '../models/User.js';
import { generateToken, generateRefreshToken, sendTokenCookie } from '../services/auth.service.js';

import logger from '../utils/logger.js';

/**
 * Verifica si el email ya está registrado
 *
 * @param {string} email - Dirección de correo electrónico a verificar
 * @throws {Error} Error con statusCode 400 si el email ya está registrado
 * @returns {Promise<void>}
 */
const checkExistingUser = async (email) => {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        const error = new Error('Este correo electrónico ya está registrado');
        error.statusCode = 400;
        throw error;
    }
};

/**
 * Crea un nuevo usuario y genera sus tokens
 *
 * @param {object} userData - Datos del usuario a crear
 * @param {string} userData.name - Nombre del usuario
 * @param {string} userData.email - Email del usuario
 * @param {string} userData.password - Contraseña del usuario
 * @param {string} [userData.title] - Título profesional del usuario
 * @param {string} [userData.bio] - Biografía del usuario
 * @returns {Promise<object>} Objeto con user, token y refreshToken
 */
const createUserWithTokens = async (userData) => {
    const { name, email, password, title, bio } = userData;
    const isFirstUser = (await User.countDocuments()) === 0;
    const role = isFirstUser ? 'admin' : 'editor';
    logger.info(`Registrando nuevo usuario ${email} con rol ${role}`);
    const user = await User.create({
        name,
        email,
        password,
        title,
        bio,
        role,
    });
    const token = generateToken(user._id);
    const refreshToken = generateRefreshToken(user._id);
    return { user, token, refreshToken };
};

/**
 * Registra un nuevo usuario en el sistema
 *
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registra un nuevo usuario
 *     description: Crea una nueva cuenta de usuario en el sistema
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *               title:
 *                 type: string
 *               bio:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *       400:
 *         description: Email ya registrado o datos incorrectos
 *       500:
 *         description: Error del servidor
 *
 * @param {object} req - Objeto de solicitud Express
 * @param {object} res - Objeto de respuesta Express
 * @param {Function} next - Función middleware next de Express
 */
export const register = async (req, res, next) => {
    try {
        const { name, email, password, title, bio } = req.body;
        await checkExistingUser(email);
        const { user, token, refreshToken } = await createUserWithTokens({
            name,
            email,
            password,
            title,
            bio,
        });
        sendTokenCookie(res, token, refreshToken);
        user.password = undefined;
        logger.info(`✅ Usuario registrado exitosamente: ${email} (${user._id})`);
        res.status(201).json({
            success: true,
            data: { user, token },
        });
    } catch (error) {
        logger.error(`❌ Error al registrar usuario: ${error.message}`);
        if (error.statusCode) {
            res.status(error.statusCode);
        }
        next(error);
    }
};

/**
 * Valida las credenciales de usuario y devuelve el usuario si son válidas
 *
 * @param {string} email - Email del usuario
 * @param {string} password - Contraseña del usuario
 * @returns {Promise<object>} - Objeto usuario
 */
const validateCredentials = async (email, password) => {
    if (!email || !password) {
        const error = new Error('Por favor, proporciona email y contraseña');
        error.statusCode = 400;
        throw error;
    }
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
        logger.warn(`Intento de inicio de sesión con email no registrado: ${email}`);
        const error = new Error('Credenciales incorrectas');
        error.statusCode = 401;
        throw error;
    }
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
        logger.warn(`Contraseña incorrecta para usuario: ${email}`);
        const error = new Error('Credenciales incorrectas');
        error.statusCode = 401;
        throw error;
    }
    return user;
};

/**
 * Inicia sesión de usuario
 *
 * @param {object} req - Objeto de solicitud Express
 * @param {object} res - Objeto de respuesta Express
 * @param {Function} next - Función middleware next de Express
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Inicia sesión de usuario
 *     description: Autentica a un usuario con email y contraseña
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Correo electrónico del usuario
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       $ref: '#/components/schemas/User'
 *                     token:
 *                       type: string
 *       400:
 *         description: Faltan credenciales
 *       401:
 *         description: Credenciales incorrectas
 *       500:
 *         description: Error del servidor
 */
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await validateCredentials(email, password);
        const token = generateToken(user._id);
        const refreshToken = generateRefreshToken(user._id);
        sendTokenCookie(res, token, refreshToken);
        user.password = undefined;
        logger.info(`✅ Inicio de sesión exitoso: ${email} (${user._id})`);
        res.status(200).json({
            success: true,
            data: {
                user,
                token,
            },
        });
    } catch (error) {
        logger.error(`❌ Error en inicio de sesión: ${error.message}`);
        if (error.statusCode) {
            res.status(error.statusCode);
        }
        next(error);
    }
};

/**
 * Cierra la sesión del usuario
 *
 * @param {object} _req - Objeto de solicitud Express
 * @param {object} res - Objeto de respuesta Express
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Cierra la sesión del usuario
 *     description: Invalida las cookies de autenticación y cierra la sesión actual
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Sesión cerrada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Error al cerrar sesión"
 */
export const logout = (_req, res) => {
    try {
        res.cookie('jwt', 'loggedout', {
            expires: new Date(Date.now() + 10 * 1000),
            httpOnly: true,
        });
        res.cookie('refresh_token', 'loggedout', {
            expires: new Date(Date.now() + 10 * 1000),
            httpOnly: true,
        });
        logger.info('Usuario cerró sesión exitosamente');
        res.status(200).json({ success: true });
    } catch (error) {
        logger.error(`❌ Error al cerrar sesión: ${error.message}`);
        res.status(500).json({
            success: false,
            error: 'Error al cerrar sesión',
        });
    }
};

/**
 * Obtiene la información del usuario actual
 *
 * @param {object} req - Objeto de solicitud Express
 * @param {object} res - Objeto de respuesta Express
 * @param {Function} next - Función middleware next de Express
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Obtiene la información del usuario actual
 *     description: Retorna los datos del usuario autenticado actualmente
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Información del usuario obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       $ref: '#/components/schemas/User'
 *       401:
 *         description: No autorizado - Token inválido o faltante
 *       500:
 *         description: Error del servidor
 */
export const getMe = async (req, res, next) => {
    try {
        logger.debug(`Obteniendo perfil del usuario: ${req.user.email}`);
        res.status(200).json({
            success: true,
            data: {
                user: req.user,
            },
        });
    } catch (error) {
        logger.error(`❌ Error al obtener perfil de usuario: ${error.message}`);
        next(error);
    }
};

/**
 * Extrae el token de refresco de la solicitud
 *
 * @param {object} req - Express request object
 * @returns {string|null} - Token de refresco o null
 */
const extractRefreshToken = (req) => {
    if (req.cookies && req.cookies.refresh_token) {
        return req.cookies.refresh_token;
    } else if (req.body.refresh_token) {
        return req.body.refresh_token;
    }
    return null;
};

/**
 * Verifica el token y obtiene el usuario
 *
 * @param {string} refreshToken - Token de refresco
 * @returns {Promise<object>} - Usuario encontrado
 */
const verifyTokenAndGetUser = async (refreshToken) => {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
        const error = new Error('El usuario ya no existe');
        error.statusCode = 401;
        throw error;
    }
    return user;
};

/**
 * Refresca el token JWT
 *
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {void} - Envía una respuesta HTTP con el nuevo token o un mensaje de error
 * @swagger
 * /api/auth/refresh-token:
 *   post:
 *     summary: Refresca el token JWT
 *     description: Genera un nuevo token de acceso utilizando el token de refresco proporcionado
 *     tags: [Authentication]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refresh_token:
 *                 type: string
 *                 description: Token de refresco (opcional si se envía por cookie)
 *                 example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *     responses:
 *       200:
 *         description: Token refrescado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       description: Nuevo token de acceso
 *                       example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       401:
 *         description: Token de refresco inválido, expirado o faltante
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Token inválido o expirado. Por favor, inicia sesión nuevamente"
 *       500:
 *         description: Error del servidor
 */
export const refreshToken = async (req, res, next) => {
    try {
        const refreshToken = extractRefreshToken(req);
        if (!refreshToken) {
            res.status(401);
            throw new Error('Por favor, inicia sesión nuevamente');
        }
        const user = await verifyTokenAndGetUser(refreshToken);
        const token = generateToken(user._id);
        sendTokenCookie(res, token);
        logger.info(`✅ Token refrescado para: ${user.email} (${user._id})`);
        res.status(200).json({
            success: true,
            data: { token },
        });
    } catch (error) {
        logger.error(`❌ Error al refrescar token: ${error.message}`);
        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            res.status(401);
            return next(new Error('Token inválido o expirado. Por favor, inicia sesión nuevamente'));
        }
        next(error);
    }
};
