const Koa = require('koa');
const app = new Koa();
const bodyParse = require('koa-bodyparser');
const controller = require('./controller');
const proxy = require('./proxy');
const config = require('./config');
const isProduction = process.env.NODE_ENV === 'production';
const views = require('koa-views');

//公共变量
app.use(async(ctx, next) => {
    ctx.state = {
        headTitle: '',
        needVue: 'false',
        isProduction: isProduction,
        isLogin: false,
        file: ''
    };
    await next();
});


//记录执行时间
app.use(async(ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    let start = new Date().getTime();
    let execTime;
    await next();
    execTime = new Date().getTime() - start;
    ctx.response.set('X-Response-Time', `${execTime}ms`);
});

//静态文件处理
if (!isProduction) {
    const staticFiles = require('./static');
    app.use(staticFiles('/static/', __dirname + '/static/'));
}

//ejs支持
app.use(views('view', { extension: 'ejs' }));


// 报错处理
app.on('error', (err, ctx) => {
    if (process.env.NODE_ENV != 'test') {
        console.log(err.message);
        console.log(err);
    }
});

//处理post
app.use(bodyParse());

app.use(controller());

// const proxy = require('koa-proxy');
// //http://10.5.108.14:80
// app.use(proxy({
//     host: 'http://10.5.108.14:80', // proxy alicdn.com...
//     match: /^\/api\//,
//     jar: true
// }));

app.use(proxy());


app.listen(config.port, () => {
    console.log('start koa at localhost:' + config.port);
});
