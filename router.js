const router = require('koa-router')();
let index = require('./controller/index');
let list = require('./controller/list');

const routers = router
    .all('/cdp', async ctx => {
        index.index(ctx);
    })
    .all('/list', async ctx => {
        list.index(ctx);
    })

module.exports = routers;