// myPortfolio/server/src/middlewares/setupMiddlewares.js
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

import logger from '../utils/logger.js';

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

const configureBodyParsers = (app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
};

const configureSecurityMiddlewares = (app) => {
    app.use(helmet());
    const apiLimiter = rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 100,
        message: {
            success: false,
            message: 'Demasiadas peticiones desde esta IP, por favor intenta de nuevo después de 15 minutos.',
            error: { code: 429, details: ['Too many requests'] },
        },
        standardHeaders: true,
        legacyHeaders: false,
        handler: (req, res, next, options) => {
            res.status(options.statusCode || 429).json(options.message);
        },
    });
    app.use(apiLimiter);
};

const configureRequestLogging = (app) => {
    app.use((req, res, next) => {
        logger.info(`📡 ${req.method} ${req.originalUrl}`);
        next();
    });
};

const setupAppMiddlewares = (app) => {
    configureCors(app);
    configureBodyParsers(app);
    configureSecurityMiddlewares(app);
    app.get('/favicon.ico', (req, res) => res.sendStatus(204));
    configureRequestLogging(app);
};

export default setupAppMiddlewares;
