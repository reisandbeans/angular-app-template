# Server

This folder contains all the files related to [Express](https://expressjs.com/) server that serves the application

## Project Structure

```
- api
    - health-check          // Endpoints to be used by kubernetes liveness probe
    - v1                    // Folder with version 1 of the server api. Endpoints are namespaced by versions to allow the api to evolve
    - index.ts              // File that loads and mounts all the server api endpoints
- config                    // Files used to config and run the server
    - app-setup.ts          // Builds and registers the routes in the express app
    - http-server.ts        // Builds and runs the http server
    - init.ts               // This file is included in the first line of the server code and register modules that should be loaded before anything else 
    - server-config.ts      // Configuration resolver for the server
    - shutdown-handler.ts   // Shutdown handler to allow the server to exit and close cleanly
- lib                       // Generic helpers and services used by the server
- server-side-rendering     // Classes needed to use Angular server side rendering
- tests                     // Folder with test related files, like spec files, mocks and setups
- index.ts                  // Entry point of the code    
- README.md
- tsconfig.server.json
```
