// myPortfolio/server/bootstrap.js
import path from 'path';
import { fileURLToPath } from 'url';

import { config } from 'dotenv';

// Determinar __dirname y __filename para la resolución de rutas relativas
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Detectar entorno
const nodeEnv = process.env.NODE_ENV;

// Cargar dotenv solo en local/desarrollo
if (nodeEnv === 'development') {
    const envFile = `.env.development`;
    const envPath = path.join(__dirname, envFile);
    // eslint-disable-next-line no-console
    console.log(`📂 Cargando variables de entorno desde archivo: ${envFile}`);
    config({ path: envPath, override: true });
} else if (nodeEnv === 'test') {
    const envFile = `.env.test`;
    const envPath = path.join(__dirname, envFile);
    // eslint-disable-next-line no-console
    console.log(`📂 Cargando variables de entorno desde archivo: ${envFile}`);
    config({ path: envPath, override: true });
} else {
    // eslint-disable-next-line no-console
    console.log(`🌐 Variables de entorno cargadas directamente desde el entorno del servidor.`);
}
