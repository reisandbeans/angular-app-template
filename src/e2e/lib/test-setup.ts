import { appUrl } from './server-runner';

beforeEach(async () => {
    await page.goto(appUrl, { waitUntil: 'domcontentloaded' });
});
