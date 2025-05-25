// myPortfolio/server/src/app.js

import cors from 'cors';
import express from 'express';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get('/api', (req, res) => {
    res.status(200).json({
        message: '¡Bienvenido a la API de MyPortfolio!',
        status: 'running',
    });
});

export default app;
