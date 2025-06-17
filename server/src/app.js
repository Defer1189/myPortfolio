// myPortfolio/server/src/app.js
import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

import { swaggerDocs } from './config/swagger.js';
import contactRoutes from './routes/contact.routes.js';
import logger from './utils/logger.js';

const app = express();

// Middlewares
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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

// app.get('/favicon.ico', (req, res) => res.sendStatus(204));

// Limitador de tasa (Rate Limiter)
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Demasiadas peticiones desde esta IP, por favor intenta de nuevo después de 15 minutos.',
    standardHeaders: true,
    legacyHeaders: false,
});
app.use(apiLimiter);

// Middleware para registrar cada solicitud entrante
app.use((req, res, next) => {
    logger.info(`📡 ${req.method} ${req.originalUrl}`);
    next();
});

// Configuración de Swagger
swaggerDocs(app);

// Rutas de la API
app.use('/api/contact', contactRoutes);

// Ruta de prueba
app.get('/api', (req, res) => {
    try {
        logger.info('Solicitud recibida en /api');
        res.status(200).json({
            message: '¡Bienvenido a la API de MyPortfolio!',
            documentation: '/api-docs',
            status: 'running',
        });
    } catch (error) {
        logger.error('Error al procesar la solicitud de bienvenida en /api', error);
        res.status(500).json({
            error: 'Error al procesar la solicitud de bienvenida',
            details: error.message,
        });
    }
});

// Manejo de Rutas No Encontradas (404)
app.use((req, res, next) => {
    const error = new Error(`No encontrada - ${req.originalUrl}`);
    res.status(404);
    next(error);
});

// Middleware de Manejo de Errores Globales
// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);

    logger.error(`❌ Error en la API: ${error.message}`, {
        status: statusCode,
        path: req.originalUrl,
        method: req.method,
        stack: process.env.NODE_ENV === 'production' ? '🚫' : error.stack,
        errorDetails: error.details || 'No details provided',
    });

    res.json({
        message: error.message,
        stack: process.env.NODE_ENV === 'production' ? '🚫' : error.stack,
        details: error.details || undefined,
    });
});

export default app;
