import { ChildProcess } from 'child_process';
import { spawnServer, waitServerReady } from './lib/server-runner';

let serverProcess: ChildProcess;
let url: string;

beforeAll(async () => {
    const { port, process } = await spawnServer();
    serverProcess = process;
    url = `http://localhost:${port}`;
    await waitServerReady(url);
});

beforeEach(async () => {
    await page.goto(url, { waitUntil: 'domcontentloaded' });
});

afterAll(() => {
    if (serverProcess) {
        serverProcess.kill('SIGTERM');
    }
});
