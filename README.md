# angular-app-template

This project is a template repo for angular applications that use an express server to serve static files. It was originally generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.6, and then re-organized to have a slightly different folder structure. [Angular SSR](https://angular.io/guide/universal) is also supported by this project and it can be toggled on and off through the env variable USE_SSR (more details on that below).
The project is composed mainly by two modules: app and server. The app comprehends mostly the angular app itself, while the server is the express server that serves the angular files. The HTTP serves also exposes API endpoints to provide data to the app.

## Project Structure

```
- infrastructure                // folder for infra related files like docker files, scripts and deployments
    - docker                    // infra files related to docker
        - .dockerignore         // files to be ignored during docker build
        - Dockerfile            // dockerfile to be used during build
    - kubernetes                // infra files associated with kubernetes
        - deployment.yaml       // example of deployment
- src                           // actual project code
    - app                       // angular app itself. See the README inside this folder for details on the hierarchy for the app
    - assets                    // static assets such as imgs, fonts and styles
    - environements             // angular environment files
    - server                    // server files. See the README inside this folder for details on the hierarchy for the server
- .editorconfig                 // configurations for IDEs who support it
- .env                          // .env file to be used by dotenv
- .env.example                  // example .env file with specification of expected environemtn vars
- .gitignore
- angular.json                  // angular json file with builds and targets configuration
- package.json
- package-lock.json
- README.md
- webpack.config.js             // webpack config file used in angular build
```

For more details on the folder structure for the [Angular app](./src/app), the [server](./src/server), or the [assets](./src/assets), see the README files inside each one.

## Developing

First checkout the repo and install the dependencies
```
git clone https://github.com/Tinadim/angular-app-template.git

cd angular-app-template

npm install
```

Checkout the available environment vars in the `.env.example` file. You can provide them either as env vars, or you can create a `.env` file in the root folder of the project and add your variables there. The available commands to build the application are:

```
npm run build:client - Builds the angular app

npm run build:server - Builder the server

npm run build - Builds both the app and the server
```

You can also use the `serve` scripts to speed up your development process as your application will be bootstrapped with hot reloading capabilities:

```
npm run serve:client - Builds and serves the angular app

npm run serve - Builds and serves both the app and the server
```

## Running

```
node dist/server/main.js
```

The available environment variables are:

```
PORT [number] - the port to serve the application on
USE_SHUTDOWN_HANDLER - controls if the shutdown handler should be used or not. The handler allows your application to cleanup before exiting. 
USE_SSR - controls if the application should be served using Angular Server Side rendering 
```
