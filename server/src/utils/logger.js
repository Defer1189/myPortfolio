// myPortfolio/server/src/utils/logger.js
import winston from 'winston';

const logger = winston.createLogger({
    level: 'debug',
    format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.json(),
    ),
    transports: [new winston.transports.Console()],
});
process.on('uncaughtException', (error) => {
    logger.error(`‼️ uncaughtException: ${error.message}`, { stack: error.stack });
    // eslint-disable-next-line n/no-process-exit
    process.exit(1);
});

process.on('unhandledRejection', (reason) => {
    logger.error(`‼️ unhandledRejection: ${reason}`);
    // eslint-disable-next-line n/no-process-exit
    process.exit(1);
});

export default logger;
