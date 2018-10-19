let index = async (ctx, next) => {
    // let title = 'index';
    await ctx.render('index', {
        title: 111
    });
    // ctx.response.body = '<h1>this is index!</h1>';
}

module.exports = {
    'GET ': index
};