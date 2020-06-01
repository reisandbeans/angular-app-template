import Ajv from 'ajv';
import { camelCase, cloneDeep, mapKeys, pick } from 'lodash';
import { resolve } from 'path';
import { parse as parseArgv } from 'yargs';
import { envSchema, argvSchema, ENV_VARS, ARG_VARS } from './server-config-schema';

export class ServerConfig {
    readonly distFolderPath: string;
    readonly port: number;
    readonly isProduction: boolean;
    readonly useShutdownHandler: boolean;
    readonly useSsr: boolean;

    constructor() {
        this.distFolderPath = resolve(process.cwd(), './dist/client');

        const mergedConfigs = this.mergeConfigs();

        this.isProduction = process.env.NODE_ENV === 'production';
        this.port = mergedConfigs.port;
        this.useSsr = mergedConfigs.useSsr;
        this.useShutdownHandler = mergedConfigs.useShutdownHandler;
    }

    private mergeConfigs() {
        const ajv = new Ajv({
            allErrors: true,
            coerceTypes: true,
            format: 'full',
            useDefaults: true,
        });
        const relevantEnvVars = pick(process.env, ENV_VARS);
        const argvCopy = pick(cloneDeep(parseArgv()), ARG_VARS);
        this.validateEnv(ajv, relevantEnvVars);
        this.validateArgv(ajv, argvCopy);

        const mappedEnvVars = mapKeys(relevantEnvVars, (value: any, key: string) => camelCase(key));
        return Object.assign({}, mappedEnvVars, argvCopy) as any;
    }

    private validateEnv(ajv: Ajv.Ajv, envVars: object) {
        const valid = ajv.validate(envSchema, envVars);
        if (!valid) {
            throw this.formatAjvError(ajv.errors);
        }
    }

    private validateArgv(ajv: Ajv.Ajv, argVars: object) {
        const valid = ajv.validate(argvSchema, argVars);
        if (!valid) {
            throw this.formatAjvError(ajv.errors);
        }
    }

    private formatAjvError(errors: Ajv.ErrorObject[]) {
        // TODO add better error formatting
        throw new Ajv.ValidationError(errors);
    }
}

export const serverConfig = new ServerConfig();
