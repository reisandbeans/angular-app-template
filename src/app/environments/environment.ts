export const environment = {
    useSsr: String(process.env.USE_SSR).toLowerCase() !== 'false',
    appId: 'app',
    production: false,
};
