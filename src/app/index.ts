import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { RootModule } from '@core/root-component/root.module';
import { environment } from '@environments/environment';

const { production, useSsr } = environment as any;

if (production) {
    enableProdMode();
}

if (useSsr) {
    document.addEventListener('DOMContentLoaded', () => {
        platformBrowserDynamic().bootstrapModule(RootModule);
    });
} else {
    platformBrowserDynamic().bootstrapModule(RootModule);
}
