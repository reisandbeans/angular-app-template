import { enableProdMode } from '@angular/core';
import { environment } from '../../../client/src/environments/environment';
// import { getEnvironment } from './client-provider';
// const environment = getEnvironment();

if (environment.production) {
    enableProdMode();
}

export { renderModule, renderModuleFactory } from '@angular/platform-server';
