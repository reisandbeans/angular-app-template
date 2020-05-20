const angularCli = require('@angular/cli').default;

const options = {
    cliArgs: ['run', 'client:server:production'],
    inputStream: process.stdin,
    outputStream: process.stdout,
}
angularCli(options)
    .then(() => {
        console.log('build finished');
        process.exit(0);
    })
    .catch((error) => {
        console.error('error building', error);
        process.exit(1);
    });
