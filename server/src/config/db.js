// myPortfolio/server/src/config/db.js
import mongoose from 'mongoose';

import logger from '../utils/logger.js';

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI);
        logger.info('✅ MongoDB conectado');
    } catch (error) {
        const message = `❌ Error al conectar con MongoDB: ${error.message}`;
        logger.error(message, error);
        throw new Error(message);
    }
};
