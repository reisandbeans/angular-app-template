import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '@environments/environment';
import { RootRoutingModule } from './root-routing.module';
import { RootComponent } from './root.component';

const { appId, useSsr } = environment as any;

const browserModule = useSsr ?
    BrowserModule.withServerTransition({ appId }) :
    BrowserModule;

@NgModule({
    bootstrap: [RootComponent],
    declarations: [RootComponent],
    imports: [
        RootRoutingModule,
        browserModule,
    ],
    providers: [],
})
export class RootModule {}
