import {
    Architect,
    BuilderContext,
    createBuilder,
    targetFromTargetString
} from '@angular-devkit/architect';
import * as browserSync from 'browser-sync';
import * as rxjs from 'rxjs';
import { tags, workspaces } from '@angular-devkit/core';
import { NodeJsSyncHost } from '@angular-devkit/core/node';
import { WorkspaceNodeModulesArchitectHost } from '@angular-devkit/architect/node';
import {
    getAvailablePort,
    waitUntilServerIsListening
} from '@nguniversal/builders/src/ssr-dev-server/utils';
import * as operators from 'rxjs/operators';
import { BuilderHandlerFn } from '@angular-devkit/architect/src/api';
import {
    getBaseUrl,
    getClientWorkspaceDetails,
    initBrowserSync,
    mapErrorToMessage,
    startNodeServer,
} from './util';
import { Options } from './interfaces';

declare type MappedReturnType = [
    { success: boolean, error: string | undefined },
    number
]

async function scheduleClientTarget(options: Options) {
    const browserWorkspaceRoot = getClientWorkspaceDetails(options);
    const { workspace } = await workspaces.readWorkspace(
        browserWorkspaceRoot,
        workspaces.createWorkspaceHost(new NodeJsSyncHost()),
    )
    // this._registry = new core_1.json.schema.CoreSchemaRegistry();
    // this._registry.addPostTransform(core_1.json.schema.transforms.addUndefinedDefaults);
    const architectHost = new WorkspaceNodeModulesArchitectHost(workspace, browserWorkspaceRoot);
    const architect = new Architect(architectHost);
    const target = targetFromTargetString(options.browserTarget);

    return architect.scheduleTarget(target, {
        extractCss: true,
        serviceWorker: false,
        watch: true,
        progress: options.progress,
    });
}

async function scheduleServerTarget(context: BuilderContext, options: Options) {
    const serverTarget = targetFromTargetString(options.serverTarget);
    return context.scheduleTarget(serverTarget, {
        watch: true,
        progress: options.progress,
    });
}

export function execute(
    options: Options,
    context: BuilderContext,
) {
    const bsInstance = browserSync.create();
    const serverTarget = scheduleServerTarget(context, options);
    const browserTarget = scheduleClientTarget(options);

    return rxjs.zip(browserTarget, serverTarget, getAvailablePort())
        .pipe(
            operators.switchMap(([br, sr, nodeServerPort]) => {
                return rxjs.combineLatest([br.output, sr.output])
                    .pipe(
                        // This is needed so that if both server and browser emit close to each other
                        // we only emit once. This typically happens on the first build.
                        operators.debounceTime(120),
                        operators.switchMap(([b, s]) => {
                            if (!s.success || !b.success) {
                                return rxjs.of([b, s]);
                            }
                            return startNodeServer(s, nodeServerPort, context.logger)
                                .pipe(
                                    operators.mapTo([b, s]),
                                    operators.catchError(err => {
                                        context.logger.error(`A server error has occurred.\n${mapErrorToMessage(err)}`);
                                        return rxjs.EMPTY;
                                    })
                                );
                        }),
                        operators.map(([b, s]) => {
                            return [
                                {
                                    success: b.success && s.success,
                                    error: b.error || s.error,
                                },
                                nodeServerPort,
                            ] as MappedReturnType;
                        }),
                        operators.tap(([builderOutput]) => {
                            if (builderOutput.success) {
                                context.logger.info('\nCompiled successfully.');
                            }
                        }),
                        operators.debounce(([builderOutput]) => {
                            return builderOutput.success
                                ? waitUntilServerIsListening(nodeServerPort)
                                : rxjs.EMPTY
                        })
                    );
            }),
            operators.concatMap(([builderOutput, nodeServerPort]) => {
                if (!builderOutput.success) {
                    return rxjs.of(builderOutput);
                }
                if (bsInstance.active) {
                    bsInstance.reload();
                    return rxjs.of(builderOutput);
                }
                return rxjs.from(initBrowserSync(bsInstance, nodeServerPort, options))
                    .pipe(
                        operators.tap((bs: browserSync.BrowserSyncInstance) => {
                            const baseUrl = getBaseUrl(bs);
                            context.logger.info(tags.oneLine `
                                **
                                Angular Universal Live Development Server is listening on ${baseUrl},
                                open your browser on ${baseUrl}
                                **
                            `);
                        }),
                        operators.mapTo(builderOutput),
                    );
            }),
            operators.map(builderOutput => {
                return {
                    success: builderOutput.success,
                    error: builderOutput.error,
                    baseUrl: bsInstance && getBaseUrl(bsInstance),
                };
            }),
            operators.catchError(error => rxjs.of({
                success: false,
                error: mapErrorToMessage(error),
            })),
            operators.finalize(() => {
                if (bsInstance) {
                    bsInstance.exit();
                    bsInstance.cleanup();
                }
            }),
        );
}

export default createBuilder(execute as BuilderHandlerFn<Options>);
