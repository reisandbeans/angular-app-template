import axios from 'axios';
import { ChildProcess, spawn } from 'child_process';
import { logger } from './logger';

export const serverPort = process.env.PORT || '8080';

export const appUrl = `http://localhost:${serverPort}`;

export async function spawnServer(timeout?: number) {
    const args = ['dist/server/main.js', '--port', serverPort, '--useShutdownHandler', 'false'];
    const serverProcess = spawn('node', args);

    if (serverProcess.stdout) {
        serverProcess.stdout.on('data', (data) => logger.info(data.toString()));
    }
    if (serverProcess.stderr) {
        serverProcess.stderr.on('data', (data) => logger.error(data.toString()));
    }
    serverProcess
        .on('error', (err: any) => logger.error('Error received from server process:', err.toString()))
        .on('exit', (code: number) => {
            if (code !== 0) {
                logger.error(`server exited with ${code} code.`);
            }
        });

    await waitServerReady(timeout);
    return serverProcess;
}

async function waitServerReady(timeout = 10000) {
    logger.info('Waiting for server to be ready...');

    let ready = false;
    const timer = setTimeout(() => {
        throw new Error(`Server not started in ${timeout % 1000} seconds`);
    }, timeout);

    while (!ready) {
        try {
            const response = await axios.get(appUrl);
            if (response.status === 200) {
                clearTimeout(timer);
                ready = true;
                logger.info('Server ready for requests...');
            } else {
                await new Promise((resolve) => setTimeout(resolve, 100));
            }
        } catch (error) {}
    }
}

export function stopServer(serverProcess?: ChildProcess) {
    if (serverProcess) {
        serverProcess.kill('SIGTERM');
    }
}
