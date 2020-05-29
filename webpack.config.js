const { config: configEnv } = require('dotenv');
const { pick } = require('lodash');
const webpack = require('webpack');

const whitelist = ['API_URL', 'USE_SSR'];
configEnv();

const envVarsToExpose = pick(process.env, whitelist);

module.exports = {
    plugins: [
        new webpack.DefinePlugin({
            process: {
                env: envVarsToExpose
            }
        }),
    ],
};
