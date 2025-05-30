// myPortfolio/server/src/config/db.js
import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI);
        // eslint-disable-next-line no-console
        console.log('✅ MongoDB conectado');
    } catch (error) {
        const message = `❌ Error al conectar con MongoDB: ${error.message}`;
        // eslint-disable-next-line no-console
        console.error(message);
        throw new Error(message);
    }
};
