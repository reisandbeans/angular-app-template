import cli from '@angular/cli';

const options = {
    inputStream: process.stdin,
    outputStream: process.stdout,
    cliArgs: ['run', 'client:serve-test']
}

cli(options)
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.error(error);
    });
