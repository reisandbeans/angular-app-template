function createLogger() {
    const logger: any = {
        error: jest.fn().mockImplementation(() => logger),
        debug: jest.fn().mockImplementation(() => logger),
        info: jest.fn().mockImplementation(() => logger),
        warn: jest.fn().mockImplementation(() => logger),
    };
    return logger;
}

jest.mock('winston', () => ({
    child: createLogger,
    createLogger,
    format: {
        colorize: jest.fn(),
        combine: jest.fn(),
        errors: jest.fn(),
        label: jest.fn(),
        printf: jest.fn(),
        timestamp: jest.fn(),
    },
    transports: {
        Console: jest.fn(),
    },
}));
