// myPortfolio/server/src/index.js
import path from 'path';
import { fileURLToPath } from 'url';

import { config } from 'dotenv';
import mongoose from 'mongoose';

import app from './app.js';
import { connectDB } from './config/db.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const nodeEnv = process.env.NODE_ENV;
const envPath = path.join(__dirname, `../.env.${nodeEnv}`);
config({ path: envPath, override: true });

let httpServer;

// 1. Validación de variables de entorno
const validateEnvironment = () => {
    const requiredEnvVars = ['PORT', 'DB_URI', 'NODE_ENV', 'SWAGGER_SERVER'];
    const missingVars = requiredEnvVars.filter((varName) => !process.env[varName]);
    if (missingVars.length > 0) {
        throw new Error(`❌ Variables de entorno faltantes: ${missingVars.join(', ')}`);
    }
    const port = Number(process.env.PORT);
    if (isNaN(port)) throw new Error('PORT debe ser un número válido');
    if (port < 1024 || port > 65535) throw new Error('PORT debe estar entre 1024 y 65535');
};

// 2. Manejo centralizado de errores
const handleError = (error) => {
    // eslint-disable-next-line no-console
    console.error('\x1b[31m', `❌ Error crítico: ${error.message}`);
    // eslint-disable-next-line no-console
    if (error.stack) console.error('Stack trace:', error.stack);
    process.exitCode = 1;
};

// 3. Cierre del servidor
const shutdown = async (signal) => {
    // eslint-disable-next-line no-console
    console.log(`\n⚠️ Recibida señal ${signal}. Cerrando servidor...`);
    try {
        if (httpServer) {
            await new Promise((resolve) => httpServer.close(resolve));
            // eslint-disable-next-line no-console
            console.log('✅ Servidor HTTP cerrado correctamente');
        }
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('❌ Error cerrando servidor:', error.message);
    }
    try {
        await mongoose.disconnect();
        // eslint-disable-next-line no-console
        console.log('✅ Conexión MongoDB cerrada');
        await new Promise((resolve) => setTimeout(resolve, 100));
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('❌ Error desconectando MongoDB:', error.message);
        // eslint-disable-next-line n/no-process-exit
        process.exit(0);
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
                // eslint-disable-next-line no-console
                console.log(
                    '\x1b[36m%s\x1b[0m',
                    `🚀 Servidor Express en puerto ${port} (iniciado en ${duration}ms) [${serverEnvDescription}]`,
                );
                // eslint-disable-next-line no-console
                console.log('\x1b[35m', `📚 Docs: http://localhost:${port}/api-docs`);
                // eslint-disable-next-line no-console
                console.log('\x1b[35m', `📜 JSON: http://localhost:${port}/api-docs.json`);
                resolve();
            })
            .on('error', (err) => {
                reject(err);
            });
    });
};

// 5. Función principal
const startServer = async () => {
    try {
        validateEnvironment();
        // eslint-disable-next-line no-console
        console.log(`🧪 Modo de ejecución: ${process.env.NODE_ENV === 'production' ? 'Producción' : 'Desarrollo'}`);
        const PORT = Number(process.env.PORT);
        const start = Date.now();
        await connectDB();
        await startHttpServer(PORT, start);
    } catch (error) {
        handleError(error);
    }
};

// 6. Configuración de errores globales
process.on('unhandledRejection', (reason) => {
    // eslint-disable-next-line no-console
    console.error('⚠️ Promesa no manejada:', reason);
    process.exitCode = 1;
});
process.on('uncaughtException', (error) => {
    handleError(error);
    // eslint-disable-next-line n/no-process-exit
    process.exit(1);
});

// Iniciar aplicación
startServer();
