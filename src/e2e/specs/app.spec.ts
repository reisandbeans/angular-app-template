describe('app.e2e.spec.ts', () => {
    it('Should open the app page', async () => {
        const title = await page.title();
        expect(title).toBe('Client');
    });
});
