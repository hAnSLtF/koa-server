const views = require('koa-views');
const path = require('path');

class index {
    async index(ctx) {
        console.log(ctx);
        console.log(this);
        console.log(views);
        let title = '1';
        ctx.render('index', {
            title
        });
    }
}

module.exports = new index();