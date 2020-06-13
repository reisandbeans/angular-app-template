const { USE_SSR } = process.env;

export const environment = {
    appId: 'app',
    production: true,
    useSsr: USE_SSR
};
