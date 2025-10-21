import app from './app.js';

const PORT = process.env.PORT || 3001;

// Validate required environment variables
const requiredEnvVars = [
    'KICK_CLIENT_ID',
    'KICK_CLIENT_SECRET',
    'KICK_REDIRECT_URI',
    'COOKIE_SECRET',
];

const missingVars = requiredEnvVars.filter((varName) => !process.env[varName]);

if (missingVars.length > 0) {
    console.error('❌ Missing required environment variables:', missingVars.join(', '));
    console.error('Please create a .env file based on .env.example');
    process.exit(1);
}

const server = app.listen(PORT, () => {
    console.log(`\n🚀 Server running on port ${PORT}`);
    console.log(`📚 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🔗 Health check: http://localhost:${PORT}/health`);
    console.log(`🔗 API info: http://localhost:${PORT}/api/info`);
    console.log(`🔗 OAuth login: http://localhost:${PORT}/api/auth/login`);
});

// Graceful shutdown
const shutdown = (signal) => {
    console.log(`\n⚠️  Received ${signal}, closing server gracefully...`);
    server.close(() => {
        console.log('✅ Server closed');
        process.exit(0);
    });

    // Force shutdown after 10 seconds
    setTimeout(() => {
        console.error('❌ Forcing shutdown');
        process.exit(1);
    }, 10000);
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

// Handle uncaught errors
process.on('uncaughtException', (error) => {
    console.error('❌ Uncaught Exception:', error);
    shutdown('uncaughtException');
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
    shutdown('unhandledRejection');
});
