let index = async(ctx, next) => {
    Object.assign(ctx.state, {
        file: 'index',
        headTitle: 'index',
        needVue: 'false'
    });
    await ctx.render('index/index', {
    });
};

module.exports = {
    'GET /': index
};
