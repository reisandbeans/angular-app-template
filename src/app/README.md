# Angular App

This folder contains all the files related to the Angular app itself

## Project Structure

```
- core                  // This is where the core services and modules of the application resides
    - api-client        // Files related to the api client to send requests to the server api
    - root-component    // Root component bootstrapped by Angular 
    - authentication    // Authentication related services and components
    - modules           // Other core modules
- modules               // These will be the main modules of your app, for example login, users, settings, etc. Services and components relevant to those modules should be inside them
- shared                // Folder with shared components and other helpers
    - components        // Components shared throught the application, like buttons and input fields
    - constants         // Constants used throught the application
    - exceptions        // Error classes thrown by the application
    - interfaces        // Typescript interfaces thrown by the application
    - modules           // Shared Angular modules used by the application 
    - pipes             // Angular Pipes used throught the application
    - util              // Utilities shared throught the application
    - validators        // Angular validators used by the application
- tests                 // Folder with test related files, like mocks and setups. The tests for each component and services are adjacent to their respective tested files in the project 
- global.d.ts           // Global Typescript definitions
- main.ts               // Entry point of the code
- polyfills.ts          // Pollyfills
- tsconfig.app.json
- tsconfig.client.json
- README.md
```
