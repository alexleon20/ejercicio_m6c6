//instalar npm install --save yargs
const yargs = require('yargs');
const child_process = require('child_process');

yargs.command(
    'byn',
    'Cargar el proyecto de Black and White SpA',
    {
        key: {
            describe: 'Llave para ejecutar el codigo',
            demand: true,
            alias: 'k'
        }
    },
    function (arg) {
        const llave = arg.key
        if (llave != '123') {
            console.log('Llave incorrecta')
            return
        }
        child_process.exec('node index.js', (err, out) => {
            console.log(err)
        })
    }
).help().argv