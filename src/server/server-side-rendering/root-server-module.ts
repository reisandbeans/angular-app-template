import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { RootModule } from '@client/core/root-component/root.module';
import { RootComponent } from '@client/core/root-component/root.component';

@NgModule({
    imports: [ServerModule, RootModule],
    bootstrap: [RootComponent],
})
export class RootServerModule {}
