import winston from "winston";

const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({timestamp, level, message }) => {
            return `${timestamp} [${level.toUpperCase()}]: ${message}`;
        })
    ),
    transports: [
        new winston.transports.Console(),

        new winston.transports.File({
            filename: "logs/error.log",
            level: "error"
        }),
        new winston.transports.File({
            filename: "logs/combined.log"
        }),
    ]    
});

export default logger;


// Why do we need a logger?
// - Keeps a history of application events
// - Helps debug issues after server restarts
// - Stores errors in logs/error.log
// - Stores all activity in logs/combined.log
// - Replaces scattered console.log() statements