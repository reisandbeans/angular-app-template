import { createLogger, format, transports } from 'winston';

const { combine, timestamp, label, printf } = format;

// TODO: export logger format as a constant to be reused by angular app?
const template = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

export const logger = createLogger({
    level: 'debug',
    format: combine(
        format.colorize(),
        label({ label: 'angular-app-server' }),
        timestamp(),
        template,
    ),
    transports: [
        new transports.Console(),
    ],
});
