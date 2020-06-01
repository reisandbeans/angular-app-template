import { $enum } from 'ts-enum-util';

enum EnvVars {
    NodeEnv = 'NODE_ENV',
    Port = 'PORT',
    UseShutDownHandler = 'USE_SHUTDOWN_HANDLER',
    UseSsr = 'USE_SSR'
}

enum ArgVars {
    Port = 'port',
    UseShutDownHandler = 'useShutdownHandler',
    UseSsr = 'useSsr'
}

export const ENV_VARS = $enum(EnvVars).getValues();

export const ARG_VARS = $enum(ArgVars).getValues();

export const DEFAULTS = {
    port: 8080,
    useSsr: true,
    useShutdownHandler: false
};

export const envSchema: object = {
    properties: {
        [EnvVars.Port]: {
            type: 'number',
            default: DEFAULTS.port,
        },
        [EnvVars.UseShutDownHandler]: {
            type: 'boolean',
            default: DEFAULTS.useShutdownHandler,
        },
        [EnvVars.UseSsr]: {
            type: 'boolean',
            default: DEFAULTS.useSsr,
        }
    },
    type: 'object'
};

export const argvSchema: object = {
    properties: {
        [ArgVars.Port]: {
            type: 'number',
        },
        [ArgVars.UseShutDownHandler]: {
            type: 'boolean',
        },
        [ArgVars.UseSsr]: {
            type: 'boolean',
        }
    },
    type: 'object'
};
