console.log('<<<<<<<<<< process.env.USE_SSR', process.env.USE_SSR, '>>>>>>>>>');

export const environment = {
    useSsr: String(process.env.USE_SSR).toLowerCase() !== 'false',
    appId: 'app',
    production: false,
};
