import '@init';
import { buildApp } from './config/app-setup';
import { startServer } from './config/http-server';

const app = buildApp();

function run() {
    const port = process.env.PORT || 4000;

    const server = app();
    server.listen(port, () => {
        console.log(`Node Express server listening on http://localhost:${port}`);
    });
}

run();
