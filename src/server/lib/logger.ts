import { createLogger, format, transports } from 'winston';
import { serverConfig } from '@server/config/server-config';

const { combine, timestamp: getTimestamp, label: getLabel, printf: createTemplate } = format;

function formatter({
    label,
    level,
    message,
    timestamp,
    stack,
    prefix = '',
}: { [key: string]: any }) {
    const logPrefix = `${timestamp} [${label}] ${prefix ? prefix + ' -' : '-'}`;
    let log = `${logPrefix} ${level}: ${message}`;
    if (stack) {
        log = `${log}\n${stack}`;
    }
    return log;
}

// TODO: export logger format as a constant to be reused by angular app?
const template = createTemplate(formatter);

export const logger = createLogger({
    level: 'debug',
    format: combine(
        format.errors({ stack: true }),
        format.colorize(),
        getLabel({ label: serverConfig.label }),
        getTimestamp(),
        template,
    ),
    transports: [new transports.Console()],
});

export function createPrefixedLogger(prefix: string) {
    return logger.child({ prefix });
}
