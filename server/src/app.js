// myPortfolio/server/src/app.js
import cors from 'cors';
import express from 'express';

import { swaggerDocs } from './config/swagger.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de Swagger
swaggerDocs(app);

// Ruta de prueba
app.get('/api', (req, res) => {
    try {
        res.status(200).json({
            message: '¡Bienvenido a la API de MyPortfolio!',
            documentation: '/api-docs',
            status: 'running',
        });
    } catch (error) {
        res.status(500).json({
            error: 'Error al procesar la solicitud de bienvenida',
            details: error.message,
        });
    }
});

export default app;
