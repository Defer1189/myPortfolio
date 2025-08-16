// myPortfolio/server/src/middlewares/setupMiddlewares.js
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

import logger from '../utils/logger.js';

const getAllowedOrigins = () => {
    const allowedOrigins = [
        process.env.CLIENT_URL_DEV,
        process.env.CLIENT_URL_PROD,
        'http://localhost:3000',
        'https://myportfolio-staging-b7b6ffc6ftg5f9fd.brazilsouth-01.azurewebsites.net',
    ];
    if (process.env.NODE_ENV === 'development') {
        allowedOrigins.push(/http:\/\/localhost:\d+/);
    }
    return allowedOrigins.filter(Boolean).map((origin) => {
        if (typeof origin === 'string') {
            return origin.replace(/\/$/, '');
        }
        return origin;
    });
};

const corsOriginCallback = (allowedOrigins, origin, callback) => {
    if (!origin) {
        return callback(null, true);
    }
    const isAllowed = allowedOrigins.some((allowedOrigin) => {
        if (typeof allowedOrigin === 'string') {
            return origin === allowedOrigin;
        } else if (allowedOrigin instanceof RegExp) {
            return allowedOrigin.test(origin);
        }
        return false;
    });
    if (isAllowed) {
        callback(null, true);
    } else {
        logger.warn(`⚠️ Origen bloqueado por CORS: ${origin}`);
        // eslint-disable-next-line no-console
        console.warn(`⚠️ Origen bloqueado por CORS: ${origin}`);
        callback(new Error(`Not allowed by CORS: ${origin}`));
    }
};

const configureCors = (app) => {
    const allowedOrigins = getAllowedOrigins();
    logger.info(`🛡️ Orígenes permitidos: ${JSON.stringify(allowedOrigins)}`);
    const corsOptions = {
        origin: (origin, callback) => corsOriginCallback(allowedOrigins, origin, callback),
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

const configureHelmet = (app) => {
    app.use(
        helmet({
            contentSecurityPolicy: {
                directives: {
                    defaultSrc: ["'self'"],
                    scriptSrc: ["'self'", "'unsafe-inline'"],
                    styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
                    imgSrc: ["'self'", 'data:', 'https:'],
                    fontSrc: ["'self'", 'https://fonts.gstatic.com'],
                    connectSrc: [
                        "'self'",
                        process.env.CLIENT_URL_DEV,
                        process.env.CLIENT_URL_PROD,
                        'https://myportfolio-staging-b7b6ffc6ftg5f9fd.brazilsouth-01.azurewebsites.net',
                    ],
                    objectSrc: ["'none'"],
                    upgradeInsecureRequests: [],
                },
            },
            frameguard: { action: 'deny' },
            hsts: {
                maxAge: 31536000,
                includeSubDomains: true,
                preload: true,
            },
        }),
    );
    app.set('trust proxy', 1);
};

const configureRateLimiter = (app) => {
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

const configureSecurityMiddlewares = (app) => {
    configureHelmet(app);
    configureRateLimiter(app);
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
