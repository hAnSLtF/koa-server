const fs = require('fs');

function addController(router, dir) {
    let files = fs.readdirSync(__dirname + '/' + dir);
    //过滤出js文件
    let jsFiles = files.filter((f) => {
        return f.endsWith('.js');
    })

    for (let f of jsFiles) {
        console.log(`process controller ${f}...`);
        //导入js文件
        let mapping = require(__dirname + '/' + dir + '/' + f);
        for (let url in mapping) {
            if (url.startsWith('GET ')) {
                let path = url.substring(4);
                router.get(path, mapping[url]);
                console.log(`register URL mapping: GET ${path}`);
            } else if (url.startsWith('POST ')) {
                let path = url.substring(5);
                router.post(path, mapping[url]);
                console.log(`register URL mapping: POst ${path}`);
            } else {
                console.log(`invalid URL: ${url}`);
            }
        }
    }
}

module.exports = function(dir) {
    let controllerDir = dir || 'controller';
    router = require('koa-router')();
    addController(router, controllerDir);
    return router.routes();
}
