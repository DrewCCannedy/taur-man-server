const axios = require('axios');
const yargs = require('yargs');
const _ = require('lodash');

const argv = yargs
    .command(['post', 'p'], 'post an instance')
    .help()
    .argv;

var command = argv._[0];

if (command == 'post'){
    url = "https://fierce-thicket-30230.herokuapp.com/instance";
    axios.post(url, {})
    .then((res) => {
        console.log(`statusCode: ${res.statusCode}`);
        console.log(res.body);
    })
    .catch((error) => {
        console.error(error);
    });
}
