import { createLogger, format, transports } from 'winston';
import { serverConfig } from '../../server/config/server-config';

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

const template = createTemplate(formatter);

// TODO: reuse logger from server?
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
