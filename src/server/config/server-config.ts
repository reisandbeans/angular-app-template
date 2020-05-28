import { resolve } from 'path';

class ServerConfig {
    readonly distFolderPath: string;
    readonly port: number;
    readonly useShutdownHandler: boolean;
    readonly useSsr: boolean;

    constructor() {
        this.distFolderPath = resolve(process.cwd(), './dist/client');
        this.port = Number(process.env.PORT);
        this.useSsr = String(process.env.USE_SSR).toLowerCase() === 'true';
        this.useShutdownHandler = String(process.env.USE_SHUTDOWN_HANDLER).toLowerCase() === 'true';
    }
}

export const serverConfig = new ServerConfig();
