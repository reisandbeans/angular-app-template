const { config: configEnv } = require('dotenv-safe');
const { resolve } = require('path');
const { pick } = require('lodash');
const webpack = require('webpack');

const whitelist = ['API_URL', 'USE_SSR'];
const example = resolve(process.cwd(), '.env.example');
configEnv({ example });

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
