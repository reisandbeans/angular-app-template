const { USE_SSR } = $ENV;

export const environment = {
    appId: 'app',
    production: false,
    useSsr: USE_SSR,
};
