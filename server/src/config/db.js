// myPortfolio/server/src/config/db.js
import mongoose from 'mongoose';

import logger from '../utils/logger.js';

const clientOptions = {
    serverApi: {
        version: '1',
        strict: true,
        deprecationErrors: true,
    },
};

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI, clientOptions);
        logger.info('✅ MongoDB conectado');
    } catch (error) {
        const message = `❌ Error al conectar con MongoDB: ${error.message}`;
        logger.error(message, error);
        throw new Error(message);
    }
};
