import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';
import { RootComponent } from './root.component';

describe('AppComponent', () => {
    let spectator: Spectator<RootComponent>;
    const createComponent = createComponentFactory(RootComponent);

    beforeEach(() => spectator = createComponent());

    it('Should have the hello world string as the content', () => {
        expect(spectator.query('h1')).toContainText('Hello world!');
    });
});
