import { PLATFORM_ID } from '@angular/core';
import { RootComponent } from './root.component';
import { TestBed } from '@angular/core/testing';

describe('AppComponent', () => {
    function createComponent(providers: any[]) {
        TestBed.configureTestingModule({
            providers,
            declarations: [RootComponent],
        });
        return TestBed.createComponent(RootComponent);
    }

    it('Should have the hello world string as the content', () => {
        const component = createComponent([]);
        expect(component.nativeElement.querySelector('h1').textContent).toBe('Hello world!');
    });

    it('Should indicate we are in the browser context', () => {
        const component = createComponent([{ provide: PLATFORM_ID, useValue: 'browser' }]);
        expect(component.componentInstance.platform).toBe('Browser');
    });

    it('Should indicate we are in the server context', () => {
        const component = createComponent([{ provide: PLATFORM_ID, useValue: 'server' }]);
        expect(component.componentInstance.platform).toBe('Server');
    });
});
