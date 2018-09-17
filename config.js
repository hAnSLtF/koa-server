const yaml = require('js-yaml');
const fs = require('fs');
let configpath = '';

if (process.env.NODE_ENV === 'pro') {
    configpath = './config/pro.yaml'
} else if (process.env.NODE_ENV === 'test') {
    configpath = './config/test.yaml'
} else {
    configpath = './config/dev.yaml';
}

console.log(process.env.NODE_ENV);

module.exports = yaml.load(fs.readFileSync(configpath));