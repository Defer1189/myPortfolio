// myPortfolio/server/bootstrap.js
import path from 'path';
import { fileURLToPath } from 'url';

import { config } from 'dotenv';

// Determinar __dirname y __filename para la resolución de rutas relativas
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Obtener el entorno actual
const nodeEnv = process.env.NODE_ENV;
const envFile = `.env.${nodeEnv}`;
const envPath = path.join(__dirname, envFile);

// Cargar las variables de entorno desde el archivo .env apropiado
config({ path: envPath, override: true });
