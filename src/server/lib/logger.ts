import { createLogger, format, transports } from 'winston';

const { combine, timestamp: getTimestamp, label: getLabel, printf: createTemplate } = format;

function formatter({ level, message, label, timestamp }: { [key: string]: any }) {
    return `${timestamp} [${label}] ${level}: ${message}`;
}

// TODO: export logger format as a constant to be reused by angular app?
const template = createTemplate(formatter);

export const logger = createLogger({
    level: 'debug',
    format: combine(
        format.colorize(),
        getLabel({ label: 'angular-app-server' }),
        getTimestamp(),
        template,
    ),
    transports: [new transports.Console()],
});
