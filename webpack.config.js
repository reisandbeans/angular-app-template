const { config: configEnv } = require('dotenv');
const webpack = require('webpack');

configEnv();

const turnSsrOff = String(process.env.USE_SSR).toLowerCase() === 'false';

module.exports = {
    plugins: [
        new webpack.DefinePlugin({
            'process.env.USE_SSR': String(!turnSsrOff)
        }),
    ],
};
