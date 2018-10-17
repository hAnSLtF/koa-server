const yaml = require('js-yaml');
const fs = require('fs');
let configpath = './config/development.yaml';

if (process.env.NODE_ENV === 'production') {
    configpath = './config/production.yaml';
}

module.exports = yaml.load(fs.readFileSync(configpath));