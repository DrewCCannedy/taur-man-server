const axios = require('axios');
const yargs = require('yargs');
const _ = require('lodash');

const argv = yargs
    .command(['create', 'c'], 'create an instance')
    .command(['update', 'u'], 'update an instance')
    .command(['delete', 'd'], 'delete an instane')
    .help()
    .argv;

var command = argv._[0];

if (command == 'create'){
    url = "https://fierce-thicket-30230.herokuapp.com/create";
    axios.post(url)
    .then((res) => {
        console.log(res.data);
    })
    .catch((error) => {
        console.error(error);
    });
}

if (command == 'update'){
    url = "https://fierce-thicket-30230.herokuapp.com/instance";
    axios.post(url + "/?humanX=3&humanY=4&taurX=1&taurY=2")
    .then((res) => {
        console.log(res.status);
    })
    .catch((error) => {
        console.error(error);
    });
}
if (command == 'delete'){
    url = "https://fierce-thicket-30230.herokuapp.com/delete/?id=5bcf6d9307885e0015958933";
    axios.post(url)
    .then((res) => {
        console.log(res.status);
    })
    .catch((error) => {
        console.error(error);
    });
}
