import { enableProdMode } from '@angular/core';
import { environment } from '@environments/environment';

jest.mock('@angular/core', () => ({ enableProdMode: jest.fn() }));
jest.mock('@angular/platform-server', () => ({
    renderModule: jest.fn(),
    renderModuleFactory: jest.fn(),
}));
jest.mock('@environments/environment');

describe('server-main.spec.ts', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('Should enable prod mode if environment is production', () => {
        environment.production = true;

        return new Promise((resolve) => {
            jest.isolateModules(() => {
                require('@server/server-side-rendering/server-main');
                expect(enableProdMode).toHaveBeenCalled();
                resolve();
            });
        });
    });

    it('Should not enable prod mode if environment is not production', () => {
        environment.production = false;

        return new Promise((resolve) => {
            jest.isolateModules(() => {
                require('@server/server-side-rendering/server-main');
                expect(enableProdMode).not.toHaveBeenCalled();
                resolve();
            });
        });
    });
});
