const {svContact, listContact, detailContact, deleteContact} = require('./contacts');
const yargs = require('yargs');

yargs.command({
    command: 'add',
    describe: 'add new contact',
    builder: {
        nama: {
            describe: 'your nama',
            demandOption: true,
            type: 'string'
        },
        email: {
            describe: 'your email',
            demandOption: false,
            type: 'string'
        },
        phone: {
            describe: 'your phone',
            demandOption: true,
            type: 'string'
        },
    },
    handler(argv) {
        svContact(argv.nama, argv.email, argv.phone);
    }
}).demandCommand();

// menampilkan daftar semua contact
yargs.command({
    command: 'list',
    describe: 'show all contact',
    handler(){
        listContact();
    }
});

//menampilkan detail contact
yargs.command({
    command: 'detail',
    describe: 'show contact detail',
    builder: {
        nama: {
            describe: 'contact nama',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        detailContact(argv.nama);
    }
});

//menghapus detail contact
yargs.command({
    command: 'remove',
    describe: 'remove contact',
    builder: {
        nama: {
            describe: 'contact nama',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        deleteContact(argv.nama);
    }
});

yargs.parse();