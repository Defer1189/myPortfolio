// myPortfolio/server/src/config/db.js
import mongoose from 'mongoose';

import logger from '../utils/logger.js';

const clientOptions = {
    serverApi: {
        version: '1',
        strict: true,
        deprecationErrors: true,
    },
    connectTimeoutMS: 10000,
    socketTimeoutMS: 45000,
};

export const connectDB = async () => {
    logger.info('⏳ Intentando conectar a MongoDB...');
    try {
        const conn = await mongoose.connect(process.env.DB_URI, clientOptions);
        logger.info(`✅ MongoDB conectado: ${conn.connection.host}`);
    } catch (error) {
        const errorDetails = {
            message: `❌ Error MongoDB: ${error.message}`,
            code: error.code,
            uri: process.env.DB_URI,
        };
        logger.error(errorDetails);
        // eslint-disable-next-line no-console
        console.error('❌ ERROR FATAL EN CONEXIÓN MONGODB:', errorDetails);
        // eslint-disable-next-line n/no-process-exit
        process.exit(1);
    }
};
