const Koa = require('koa');
const app = new Koa;
const config = require('./config/config');
const router = require('./router');

app.on('error', function(err, ctx){
    if (process.env.NODE_ENV != 'test') {
        console.log(err.message);
        console.log(err);
    }
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(config.port);

console.log('start koa at localhost:' + config.port);