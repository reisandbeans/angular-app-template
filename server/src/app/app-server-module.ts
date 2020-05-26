import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

// import { getAppModule, getAppComponent } from './client-provider';

import { AppModule } from '../../../client/src/app/app.module';
import { AppComponent } from '../../../client/src/app/app.component';
// const AppModule = getAppModule();
// const AppComponent = getAppComponent();

@NgModule({
    imports: [
        ServerModule,
        AppModule,
    ],
    bootstrap: [AppComponent],
})
export class AppServerModule {}
