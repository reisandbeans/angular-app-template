import { PLATFORM_ID } from '@angular/core';
import { RootComponent } from './root.component';
import { TestBed } from '@angular/core/testing';
import { Spectator } from '@ngneat/spectator';
import { createComponentFactory } from '@ngneat/spectator/jest';

describe('AppComponent', () => {
    const createComponent = createComponentFactory({
        component: RootComponent,
        providers: [{ provide: PLATFORM_ID, useValue: 'browser' }],
    });

    let spectator: Spectator<RootComponent>;

    it('Should have the hello world string as the content', () => {
        const component = createComponent();
        expect(component.query('h1')).toHaveText('Hello world');
    });

    it('Should indicate we are in the browser context', () => {
        spectator = createComponent({
            providers: [{ provide: PLATFORM_ID, useValue: 'browser' }],
        });
        expect(spectator.component.platform).toBe('Browser');
    });

    it('Should indicate we are in the server context', () => {
        spectator = createComponent({
            providers: [{ provide: PLATFORM_ID, useValue: 'server' }],
        });
        // this test fails. Platform is still browser.
        expect(spectator.component.platform).toBe('Server');
    });
});
