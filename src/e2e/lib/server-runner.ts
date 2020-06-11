import { AddressInfo, createServer } from 'net';
import { spawn } from 'child_process';
import axios from 'axios';

function getAvailablePort(): Promise<number> {
    return new Promise((resolve, reject) => {
        const server = createServer();
        server
            .unref()
            .on('error', reject)
            .listen(0, () => {
                const { port } = server.address() as AddressInfo;
                server.close(() => resolve(port));
            });
    });
}

export async function spawnServer() {
    const port = await getAvailablePort();
    const args = ['dist/server/main.js', '--port', String(port), '--useShutdownHandler', 'false'];
    const proc = spawn('node', args);
    if (proc.stdout) {
        proc.stdout.on('data', (data) => console.log(data.toString()));
    }
    if (proc.stderr) {
        proc.stderr.on('data', (data) => console.error(data.toString()));
    }
    proc
        .on('error', err => console.error(err.toString()))
        .on('exit', code => {
            if (code !== 0) {
                console.error(`server exited with ${code} code.`);
            }
        });

    return { port, process: proc };
}

export async function waitServerReady(url: string, timeout = 10000) {
    let ready = false;
    const timer = setTimeout(() => {
        throw new Error(`Server not started in ${timeout % 1000} seconds`);
    }, timeout);

    while (!ready) {
        try {
            const response = await axios.get(url);
            if (response.status === 200) {
                clearTimeout(timer);
                ready = true;
            } else {
                await new Promise((resolve) => setTimeout(resolve, 100));
            }
        } catch (error) {}
    }
}
