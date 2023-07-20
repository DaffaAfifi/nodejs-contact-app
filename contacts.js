const fs = require('fs');
const { json } = require('stream/consumers');
const chalk = require('chalk');
const validator = require('validator')

//membuat folder data jika belum ada
const dirPath = './data';
if(!fs.existsSync(dirPath)){
    fs.mkdirSync(dirPath);
}

//membuat file contacts.json jika belum ada
const dataPath = './data/contacts.json';
if(!fs.existsSync(dataPath)){
    fs.writeFileSync(dataPath, '[]', 'utf-8');
}

const loadContact = () => {
    const file = fs.readFileSync('data/contacts.json', 'utf-8');
    const contacts = JSON.parse(file);
    return contacts;
}

const svContact = (nama, email, phone) => {
    const contact = { nama, email, phone };
    const contacts = loadContact();

    //cek email
    if(!validator.isEmail(email)){
        console.log(chalk.red.inverse.bold('email not valid'));
        return false;
    }

    //cek duplikat email
    const duplikat = contacts.find((contact) => contact.email === email);
    if(duplikat){
        console.log(chalk.red.inverse.bold('email already exist'));
        return false;
    }

    //cek phone
    if(!validator.isMobilePhone(phone, 'id-ID')){
        console.log(chalk.red.inverse.bold('phone not valid'));
        return false;
    }

    contacts.push(contact);
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
    console.log(chalk.green.inverse.bold('Terimakasih sudah memasukkan data'));
}

const listContact = () => {
    const contacts = loadContact();
    const titleTxt = chalk`{green.inverse.bold Contact List : }`;
    console.log(titleTxt);
    contacts.forEach((data, i) => {
        console.log(`${i + 1}. ${data.nama} - ${data.phone}`);
    });
}

const detailContact = (nama) => {
    const contacts = loadContact();
    const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase());

    if(!contact){
        console.log(chalk.red.inverse.bold(`${nama} not found`));
        return false;
    }

    const data = chalk`
    nama : {red.inverse.bold ${contact.nama}},
    email : ${contact.email ? contact.email : '-'},
    phone : ${contact.phone}
    `;

    console.log(data);
}

const deleteContact = (nama) => {
    const contacts = loadContact();
    const newContacts = contacts.filter((contact) => contact.nama.toLowerCase() !== nama.toLowerCase());
    
    if(contacts.length === newContacts.length){
        console.log(chalk.red.inverse.bold(`${nama} not found`));
        return false;
    }

    fs.writeFileSync('data/contacts.json', JSON.stringify(newContacts));
    console.log(chalk.green.inverse.bold(`${nama} remove sucessfully`));
};

module.exports = {svContact, listContact, detailContact, deleteContact};