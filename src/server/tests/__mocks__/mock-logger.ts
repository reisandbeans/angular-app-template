jest.mock('winston', () => ({
    createLogger: () => ({
        error: jest.fn(),
        debug: jest.fn(),
        info: jest.fn(),
        warn: jest.fn(),
    }),
    format: {
        colorize: jest.fn(),
        combine: jest.fn(),
        timestamp: jest.fn(),
        label: jest.fn(),
        printf: jest.fn(),
    },
    transports: {
        Console: jest.fn(),
    },
}));
