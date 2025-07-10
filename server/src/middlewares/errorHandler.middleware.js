// myPortfolio/server/src/middlewares/errorHandler.middleware.js
import logger from '../utils/logger.js';

/**
 * Clasifica el tipo de error basado en el código de estado
 *
 * @param {number} statusCode - Código de estado HTTP
 * @param {Error} err - Objeto de error
 * @returns {string} Tipo de error
 */
const classifyErrorType = (statusCode, err) => {
    if (statusCode >= 400 && statusCode < 500) {
        return err.name === 'ValidationError' ? 'ValidationError' : 'ClientError';
    }
    return 'ServerError';
};

/**
 * Construye contexto de log para errores
 *
 * @param {number} statusCode - Código de estado HTTP
 * @param {import('express').Request} req - Objeto de solicitud
 * @param {Error} err - Objeto de error
 * @returns {object} Contexto de log
 */
const buildLogContext = (statusCode, req, err) => ({
    statusCode,
    path: req.originalUrl,
    method: req.method,
    ip: req.ip,
    userAgent: req.headers['user-agent'],
    timestamp: new Date().toISOString(),
    stack: process.env.NODE_ENV !== 'production' ? err.stack : undefined,
});

/**
 * Construye respuesta de error estandarizada
 *
 * @param {string} errorType - Tipo de error clasificado
 * @param {Error} err - Objeto de error
 * @param {number} statusCode - Código de estado HTTP
 * @returns {object} Respuesta de error
 */
const buildErrorResponse = (errorType, err, statusCode) => {
    const response = {
        success: false,
        error: {
            type: errorType,
            message: err.message,
            statusCode,
        },
    };

    if (process.env.NODE_ENV !== 'production') {
        response.error.details = err.details || err.stack;
        if (err.errors) {
            response.error.validation = Object.values(err.errors).map((e) => e.message);
        }
    }
    return response;
};

/**
 * Middleware de manejo de errores centralizado
 *
 * @param {Error} err - Error capturado
 * @param {import('express').Request} req - Objeto de solicitud
 * @param {import('express').Response} res - Objeto de respuesta
 * @param {import('express').NextFunction} _next - Función next (no utilizada)
 */
const errorHandler = (err, req, res, _next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    const errorType = classifyErrorType(statusCode, err);
    const logContext = buildLogContext(statusCode, req, err);
    if (statusCode >= 500) {
        logger.error(`❌ [${errorType}] ${err.message}`, logContext);
    } else {
        logger.warn(`⚠️ [${errorType}] ${err.message}`, logContext);
    }
    const response = buildErrorResponse(errorType, err, statusCode);
    res.status(statusCode).json(response);
};

export default errorHandler;
