jest.mock('@angular/core', () => ({ enableProdMode: jest.fn() }));
jest.mock('@angular/platform-browser-dynamic', () => ({ platformBrowserDynamic: jest.fn() }));
jest.mock('@core/root-component/root.module', () => ({ RootModule: { foo: 'bar' } }));
jest.mock('@environments/environment');

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { environment } from '@environments/environment';
import { RootModule } from '@core/root-component/root.module';

describe('index.spec.ts', () => {
    let bootstrapStub: jest.Mock;

    beforeEach(() => {
        jest.clearAllMocks();
        bootstrapStub = jest.fn();
        (platformBrowserDynamic as jest.Mock).mockReturnValue({ bootstrapModule: bootstrapStub });
    });

    function importModule() {
        return new Promise((resolve) => {
            jest.isolateModules(() => {
                require('@root/index.ts');
                resolve();
            });
        });
    }

    it('Should bootstrap the application in production mode', async () => {
        environment.production = true;
        await importModule();
        expect(enableProdMode).toHaveBeenCalled();
    });

    it('Should not enable prod mode if not in production', async () => {
        environment.production = false;
        await importModule();
        expect(enableProdMode).not.toHaveBeenCalled();
    });

    it('Should bootstrap the application using ssr', async () => {
        environment.useSsr = true;
        await importModule();

        const fakeEvent = document.createEvent('Event');
        fakeEvent.initEvent('DOMContentLoaded', true, true);
        window.document.dispatchEvent(fakeEvent);

        expect(platformBrowserDynamic).toHaveBeenCalled();
        expect(bootstrapStub).toHaveBeenCalledWith(RootModule);
    });

    it('Should bootstrap the application not using ssr', async () => {
        environment.useSsr = false;
        await importModule();
        expect(platformBrowserDynamic).toHaveBeenCalled();
        expect(bootstrapStub).toHaveBeenCalledWith(RootModule);
    });
});
