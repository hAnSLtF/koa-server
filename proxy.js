const koaProxy = require('koa-proxy');

//http://10.5.108.14:80
function proxy() {
    return koaProxy({
        host: 'http://10.5.108.14:80', // proxy alicdn.com...
        match: /^\/api\//,
        jar: true
    });
}

module.exports = proxy;
