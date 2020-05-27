import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { AppModule } from '@client/core/app-component/app.module';
import { AppComponent } from '@client/core/app-component/app.component';

@NgModule({
    imports: [
        ServerModule,
        AppModule,
    ],
    bootstrap: [AppComponent],
})
export class AppServerModule {}
