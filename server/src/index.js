// myPortfolio/server/src/index.js
import path from 'path';
import { fileURLToPath } from 'url';

import dotenv from 'dotenv';
import mongoose from 'mongoose';

import app from './app.js';
import { connectDB } from './config/db.js';
import logger from './utils/logger.js';
import seedDatabase from './utils/seedDatabase.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envFile = `.env.${process.env.NODE_ENV || 'development'}`;
const envPath = path.resolve(__dirname, '../', envFile);

try {
    dotenv.config({ path: envPath });
    // eslint-disable-next-line no-console
    console.log(`✅ Variables cargadas desde ${envPath}`);
} catch (error) {
    // eslint-disable-next-line no-console
    console.error(`❌ Error cargando variables de ${envPath}:`, error.message);
    if (process.env.NODE_ENV === 'staging' || process.env.NODE_ENV === 'production') {
        // eslint-disable-next-line no-console
        console.log('🌐 Usando variables del entorno de Azure');
        process.env.PORT = process.env.PORT || 8080;
    } else {
        throw error;
    }
}

let httpServer;

// 1. Validación de variables de entorno
const validateRequiredEnvVars = () => {
    const requiredEnvVars = [
        'PORT',
        'DB_URI',
        'NODE_ENV',
        'SWAGGER_SERVER',
        'CLIENT_URL_DEV',
        'CLIENT_URL_PROD',
        'JWT_SECRET',
        'JWT_EXPIRES_IN',
        'JWT_COOKIE_EXPIRES_IN',
        'JWT_REFRESH_SECRET',
        'JWT_REFRESH_EXPIRES_IN',
        'JWT_REFRESH_COOKIE_EXPIRES_IN',
    ];
    const missingVars = requiredEnvVars.filter((varName) => !process.env[varName]);
    if (missingVars.length > 0) {
        const errorMessage = `❌ Variables de entorno faltantes: ${missingVars.join(', ')}`;
        logger.error(errorMessage);
        throw new Error(errorMessage);
    } else {
        logger.info('✅ Variables de entorno cargadas correctamente desde el entorno del servidor.');
    }
};

const validatePort = () => {
    const port = Number(process.env.PORT);
    if (isNaN(port)) {
        const errorMessage = 'PORT debe ser un número válido';
        logger.error(errorMessage);
        throw new Error(errorMessage);
    }
    if (port < 1024 || port > 65535) {
        const errorMessage = 'PORT debe estar entre 1024 y 65535';
        logger.error(errorMessage);
        throw new Error(errorMessage);
    }
};

const validateEnvironment = () => {
    validateRequiredEnvVars();
    validatePort();
    logger.info('✅ Variables de entorno validadas correctamente.');
};

// 2. Manejo centralizado de errores
const handleError = (error, type = 'Error crítico') => {
    logger.error(`❌ ${type}: ${error.message}`, {
        stack: error.stack,
        details: error.message,
        timestamp: new Date().toISOString(),
    });
    process.exitCode = 1;
};

// 3. Cierre del servidor
const shutdown = async (signal) => {
    logger.warn(`\n⚠️ Recibida señal ${signal}. Cerrando servidor...`);
    try {
        if (httpServer) {
            await new Promise((resolve, reject) => {
                httpServer.close((err) => {
                    if (err) {
                        logger.error('❌ Error cerrando servidor HTTP:', err);
                        reject(err);
                    } else {
                        logger.info('✅ Servidor HTTP cerrado correctamente');
                        resolve();
                    }
                });
            });
        }
    } catch (error) {
        logger.error('❌ Error general al intentar cerrar servidor HTTP:', error.message);
    }
    try {
        if (mongoose.connection.readyState === 1) {
            await mongoose.disconnect();
            logger.info('✅ Conexión MongoDB cerrada');
        }
    } catch (error) {
        logger.error('❌ Error desconectando MongoDB:', error.message);
    } finally {
        // eslint-disable-next-line n/no-process-exit
        setTimeout(() => process.exit(0), 500);
    }
};
process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGUSR2', () => shutdown('SIGUSR2'));

// 4. Iniciar el servidor HTTP y manejo de los logs de inicio
const startHttpServer = async (port, startTime) => {
    return new Promise((resolve, reject) => {
        httpServer = app
            .listen(port, () => {
                const duration = Date.now() - startTime;
                const serverEnvDescription = process.env.NODE_ENV === 'production' ? 'Producción' : 'Desarrollo';
                logger.info(
                    `🚀 Servidor Express en puerto ${port} (iniciado en ${duration}ms) [${serverEnvDescription}]`,
                );
                logger.info(`📚 Docs: ${process.env.SWAGGER_SERVER}/api-docs`);
                logger.info(`📜 JSON: ${process.env.SWAGGER_SERVER}/api-docs.json`);
                resolve();
            })
            .on('error', (err) => {
                logger.error('❌ Error al iniciar el servidor HTTP:', err);
                reject(err);
            });
    });
};

// 5. Función principal
const startServer = async () => {
    try {
        // eslint-disable-next-line no-console
        console.log('✅ PASO 1: Validando entorno...');
        validateEnvironment();
        const PORT = Number(process.env.PORT);
        const start = Date.now();
        // eslint-disable-next-line no-console
        console.log('✅ PASO 2: Conectando a MongoDB...');
        await connectDB();
        if (process.env.NODE_ENV === 'development') {
            // eslint-disable-next-line no-console
            console.log('✅ PASO 3: Verificando estado DB (solo desarrollo)...');
            const collections = await mongoose.connection.db.listCollections().toArray();
            if (collections.length === 0) {
                logger.info(`Poblando datos iniciales en DESARROLLO...`);
                await seedDatabase();
            }
        } else {
            // eslint-disable-next-line no-console
            console.log('ℹ️ Saltando semilla de DB (entorno no de desarrollo)');
        }
        // eslint-disable-next-line no-console
        console.log('✅ PASO 4: Iniciando servidor HTTP...');
        await startHttpServer(PORT, start);
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('❌ ERROR CRÍTICO EN startServer:', error);
        // eslint-disable-next-line n/no-process-exit
        process.exit(1);
    }
};

// 6. Configuración de errores globales
process.on('unhandledRejection', (reason, promise) => {
    logger.error('⚠️ Promesa no manejada:', {
        reason: reason.message,
        stack: reason.stack,
        promise,
        timestamp: new Date().toISOString(),
    });
    // eslint-disable-next-line no-console
    console.error('⚠️ Promesa no manejada:', reason);
    // eslint-disable-next-line n/no-process-exit
    process.exit(1);
});
process.on('uncaughtException', (error) => {
    handleError(error, 'Excepción no capturada');
    // eslint-disable-next-line no-console
    console.error(error);
    // eslint-disable-next-line n/no-process-exit
    process.exit(1);
});

// Iniciar aplicación
startServer();
