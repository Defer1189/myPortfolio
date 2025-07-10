// myPortfolio/server/src/middlewares/setupMiddlewares.js
import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

import logger from '../utils/logger.js';

/**
 * Configura las opciones de CORS y las aplica a la aplicación.
 *
 * @param {import('express').Application} app - Instancia de la aplicación Express.
 */
const configureCors = (app) => {
    const allowedOrigins = [];
    if (process.env.NODE_ENV === 'development') {
        allowedOrigins.push(process.env.CLIENT_URL_DEV);
    } else if (process.env.NODE_ENV === 'staging') {
        allowedOrigins.push(process.env.CLIENT_URL_PROD);
        allowedOrigins.push(process.env.CLIENT_URL_DEV);
    } else if (process.env.NODE_ENV === 'production') {
        allowedOrigins.push(process.env.CLIENT_URL_PROD);
    }

    const corsOptions = {
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error(`Not allowed by CORS: ${origin}`));
            }
        },
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        credentials: true,
        optionsSuccessStatus: 204,
    };

    app.options('*', cors(corsOptions));
    app.use(cors(corsOptions));
};

/**
 * Configura los middlewares de parseo de cuerpo de solicitud.
 *
 * @param {import('express').Application} app - Instancia de la aplicación Express.
 */
const configureBodyParsers = (app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
};

/**
 * Configura los middlewares de seguridad (Helmet y Rate Limiter).
 *
 * @param {import('express').Application} app - Instancia de la aplicación Express.
 */
const configureSecurityMiddlewares = (app) => {
    app.use(helmet());

    const apiLimiter = rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 100,
        message: 'Demasiadas peticiones desde esta IP, por favor intenta de nuevo después de 15 minutos.',
        standardHeaders: true,
        legacyHeaders: false,
    });
    app.use(apiLimiter);
};

/**
 * Configura el middleware de logging de solicitudes.
 *
 * @param {import('express').Application} app - Instancia de la aplicación Express.
 */
const configureRequestLogging = (app) => {
    app.use((req, res, next) => {
        logger.info(`📡 ${req.method} ${req.originalUrl}`);
        next();
    });
};

/**
 * Configura y aplica los middlewares esenciales para la aplicación Express.
 *
 * @param {import('express').Application} app - Instancia de la aplicación Express
 */
const setupAppMiddlewares = (app) => {
    configureCors(app);
    configureBodyParsers(app);
    configureSecurityMiddlewares(app);
    app.get('/favicon.ico', (req, res) => res.sendStatus(204)); // Este puede quedarse aquí o ir a otra función
    configureRequestLogging(app);
};

export default setupAppMiddlewares;
