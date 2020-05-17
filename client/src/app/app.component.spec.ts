import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
    let spectator: Spectator<AppComponent>;
    const createComponent = createComponentFactory(AppComponent);

    beforeEach(() => spectator = createComponent());

    it('Should have the hello world string as the content', () => {
        expect(spectator.query('h1')).toContainText('Hello world!');
    });
});
