// myPortfolio/server/src/index.js

import 'dotenv/config';

import app from './app.js';

// Define el puerto para el servidor
const PORT = process.env.PORT;

// Inicia el servidor
const server = app.listen(PORT, () => {
    if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.log(`🚀 Servidor Express escuchando en el puerto ${PORT}`);
    }
});

export default server;
