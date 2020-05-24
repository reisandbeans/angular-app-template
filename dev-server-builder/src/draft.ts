/*

1 - get workspace details: (server/node_modules/@angular/cli/lib/cli/index.js)

let projectDetails = project_1.getWorkspaceDetails(parsedArgs.config);

{
  "root": "F:\\Code\\angular-app-template\\server",
  "configFile": "angular.json"
}

2 - create context: (server/node_modules/@angular/cli/models/command-runner.js)

const analytics = options.analytics ||
(await _createAnalytics(!!workspace.configFile, description.name === 'update'));
const context = { workspace, analytics };

3 - create architect and host (server/node_modules/@angular/cli/models/architect-command.js)

const { workspace } = await core_1.workspaces.readWorkspace(this.workspace.root, core_1.workspaces.createWorkspaceHost(new node_2.NodeJsSyncHost()));
this._workspace = workspace;
this._architectHost = new node_1.WorkspaceNodeModulesArchitectHost(workspace, this.workspace.root);
this._architect = new architect_1.Architect(this._architectHost, this._registry);

4 - schedule (server/node_modules/@angular/cli/models/architect-command.js)

const run = await this._architect.scheduleTarget(target, overrides, {
    logger: this.logger,
    analytics: analytics_1.isPackageNameSafeForAnalytics(builderConf) ? this.analytics : undefined,
});

 */

