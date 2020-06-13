const { setup: puppeteerSetup } = require('jest-environment-puppeteer');
const { spawnServer } = require('./server-runner');
const { logger } = require('./logger');
const config = require('../jest-puppeteer.config');

module.exports = async () => {
    logger.info('Starting server...');
    await puppeteerSetup(config);
    global.serverProcess = await spawnServer();
};
