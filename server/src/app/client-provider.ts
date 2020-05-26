import * as path from 'path';
import { existsSync } from 'fs';

export interface ClientProvider {
    appModule: any;
    appComponent: any;
    environment: any;
    distFolderPath: string;
    root: string;
}

let provider: ClientProvider | undefined;

function findClientRoot(clientPath: string) {
    const { root } = path.parse(process.cwd());

    console.log('<<<<<<<<<< ROOT:', root, '>>>>>>>>');

    let currentDir = clientPath;
    while (currentDir && currentDir !== root) {
        console.log('<<<<<<<<<<< CHECKING', currentDir, '>>>>>>>>>>>');
        const p = path.join(currentDir, 'package.json');
        if (existsSync(p)) {
            return currentDir;
        }
        currentDir = path.dirname(currentDir);
    }
    throw new Error('Could not determine client root');
}

function validateProvider(data: any) {

}

function assertRegistered() {
    if (!provider) {
        throw new Error('You must register the client provider');
    }
}

export function registerProvider(clientPath: string, clientProvider: any) {
    console.log('<<<<<<<<<<<<', clientPath, '>>>>>>>>>>>>>>>>');
    validateProvider(provider);
    const root = findClientRoot(clientPath);
    const distFolderPath = path.resolve(root, clientProvider.distFolderPath);
    provider = Object.assign({}, clientProvider, { root, distFolderPath }) as ClientProvider;
}

export function getProvider() {
    assertRegistered();
    return provider;
}

export function getAppModule() {
    return getProvider().appModule;
}

export function getAppComponent() {
    return getProvider().appComponent;
}

export function getEnvironment() {
    return getProvider().environment;
}

export function getClientDistFolderPath() {
    return getProvider().distFolderPath;
}
