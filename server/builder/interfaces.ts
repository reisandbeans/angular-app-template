import { JsonObject } from '@angular-devkit/core';

export interface Options extends JsonObject {
    browserTarget: string;
    browserWorkspaceRoot: string;
    serverTarget: string;
    host: string | null;
    port: number | null;
    publicHost: string | null;
    open: boolean | null;
    progress: boolean | null;
}
