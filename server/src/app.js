// myPortfolio/server/src/app.js
import path from 'path';
import { fileURLToPath } from 'url';

import express from 'express';

import { swaggerDocs } from './config/swagger.js';
import errorHandler from './middlewares/errorHandler.middleware.js';
import setupAppMiddlewares from './middlewares/setupMiddlewares.js';
import authRoutes from './routes/auth.routes.js';
import contactRoutes from './routes/contact.routes.js';
import experienceRoutes from './routes/experience.routes.js';
import homepageRoutes from './routes/homepage.routes.js';
import pageContentRoutes from './routes/pageContent.routes.js';
import projectRoutes from './routes/project.routes.js';
import skillRoutes from './routes/skill.routes.js';
import logger from './utils/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Aplicar middlewares generales
setupAppMiddlewares(app);

// Configuración de Swagger
swaggerDocs(app);

// Rutas de la API
app.use('/api/auth', authRoutes);
app.use('/api/homepage', homepageRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/content', pageContentRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/experience', experienceRoutes);

// Servir archivos estáticos de React
const reactBuildPath = path.join(__dirname, '..', 'public');
app.use(express.static(reactBuildPath));

// SPA fallback para cualquier ruta que NO sea /api/*
app.get('*', (req, res, next) => {
    if (!req.originalUrl.startsWith('/api')) {
        res.sendFile(path.join(reactBuildPath, 'index.html'));
    } else {
        next();
    }
});

// Ruta raíz para "/"
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Bienvenido a MyPortfolio API 🦾',
        documentation: '/api-docs',
        status: 'running',
    });
});

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
    if (req.originalUrl.startsWith('/api')) {
        const error = new Error(`No encontrada - ${req.originalUrl}`);
        res.status(404);
        next(error);
    } else {
        next();
    }
});

// Middleware Centralizado de Errores
app.use(errorHandler);

export default app;
