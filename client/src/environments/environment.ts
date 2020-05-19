const { USE_SSR } = process.env;

export const environment = {
    appId: 'app',
    production: false,
    useSsr: USE_SSR,
};
