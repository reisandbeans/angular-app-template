const { teardown: puppeteerTeardown } = require('jest-environment-puppeteer');
const { stopServer } = require('./server-runner');
const { logger } = require('./logger');
const config = require('../jest-puppeteer.config');

module.exports = async () => {
    logger.info('Stopping server...');
    await stopServer(global.serverProcess);
    await puppeteerTeardown(config);
};
