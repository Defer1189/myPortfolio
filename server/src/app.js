// myPortfolio/server/src/app.js
import express from 'express';

import { swaggerDocs } from './config/swagger.js';
import errorHandler from './middlewares/errorHandler.middleware.js';
import setupAppMiddlewares from './middlewares/setupMiddlewares.js';
import contactRoutes from './routes/contact.routes.js';
import homepageRoutes from './routes/homepage.routes.js';
import pageContentRoutes from './routes/pageContent.routes.js';
import logger from './utils/logger.js';

const app = express();

// Aplicar middlewares generales
setupAppMiddlewares(app);

// Configuración de Swagger
swaggerDocs(app);

// Rutas de la API
app.use('/api/homepage', homepageRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/content', pageContentRoutes);

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

// Middleware Centralizado de Errores
app.use(errorHandler);

export default app;
