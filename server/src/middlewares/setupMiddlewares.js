// myPortfolio/server/src/middlewares/setupMiddlewares.js
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

import logger from '../utils/logger.js';

const configureCors = (app) => {
    const allowedOrigins = ['https://myportfolio-staging-b7b6ffc6ftg5f9fd.brazilsouth-01.azurewebsites.net'];
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

const skipRateLimit = (req) =>
    req.originalUrl.startsWith('/assets/') ||
    req.originalUrl === '/favicon.ico' ||
    req.originalUrl === '/robots933456.txt' ||
    req.originalUrl === '/api-docs' ||
    req.originalUrl === '/api-docs.json' ||
    req.originalUrl === '/health';

const rateLimitKeyGenerator = (req, _res) => {
    let ip = req.ip;
    if (ip.includes(':')) {
        ip = ip.split(':')[0];
    }
    return ip;
};

const rateLimitHandler = (req, res, next, options) => {
    res.status(options.statusCode || 429).json(options.message);
};

const configureSecurityMiddlewares = (app) => {
    app.use(helmet());
    app.set('trust proxy', 1);
    const apiLimiter = rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 400,
        skip: skipRateLimit,
        keyGenerator: rateLimitKeyGenerator,
        message: {
            success: false,
            message: 'Demasiadas peticiones desde esta IP, por favor intenta de nuevo después de 15 minutos.',
            error: { code: 429, details: ['Too many requests'] },
        },
        standardHeaders: true,
        legacyHeaders: false,
        handler: rateLimitHandler,
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
    app.get('/health', (req, res) => res.status(200).send('OK'));
    configureRequestLogging(app);
};

export default setupAppMiddlewares;
