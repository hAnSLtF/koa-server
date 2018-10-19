const Koa = require('koa');
const app = new Koa;
const bodyParse = require('koa-bodyparser');
const controller = require('./controller');
const config = require('./config');
const isProduction = process.env.NODE_ENV === 'production';
const views = require('koa-views');

app.use(views('view', { extension:'ejs' }));

//静态文件处理
if (!isProduction) {
    const staticFiles = require('./static');
    app.use(staticFiles('/static/', __dirname + '/static'));
}

// 报错处理
app.on('error', (err, ctx) => {
    if (process.env.NODE_ENV != 'test') {
        console.log(err.message);
        console.log(err);
    }
});

app.use(bodyParse());

app.use(controller()).use(router.allowedMethods());

app.listen(config.port, () => {
    console.log('start koa at localhost:' + config.port);
});
