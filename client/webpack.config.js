const dotenv = require('dotenv');
const { pick } = require('lodash');
const path = require('path');
const webpack = require('webpack');

dotenv.config({ path: path.resolve('../.env') });

const whitelist = ['API_URL'];
const envVarsToExpose = pick(process.env, whitelist);

module.exports = {
    plugins: [
        new webpack.DefinePlugin({
            $ENV: envVarsToExpose
        }),
    ],
};
