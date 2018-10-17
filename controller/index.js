class index {
    async index(ctx) {
        console.log(ctx);
        let title = 'index';

        let body = await ctx.render('index', {
            title
        });
        ctx.type = 'text/html';
        ctx.body = '<h1>hello</h1>';
    }
}

module.exports = new index();