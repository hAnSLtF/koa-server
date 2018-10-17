const Koa = require('koa');
const app = new Koa;
const config = require('./config/config');
const router = require('./router');
const views = require('koa-views');
const path = require('path');


app.on('error', (err, ctx) => {
    if (process.env.NODE_ENV != 'test') {
        console.log(err.message);
        console.log(err);
    }
});
// 加载模板引擎
app.use(views(path.join(__dirname, './public/template/index/'), {
    extension: 'ejs'
}));

app.use(router.routes()).use(router.allowedMethods());

app.use(async (ctx, next) => {
    await next();
    ctx.type = 'text/html';
    ctx.body = '<h1>hello</h1>';
});

app.listen(config.port, () => {
    console.log('start koa at localhost:' + config.port);
});
