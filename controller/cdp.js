let cdp = async(ctx, next) => {
    Object.assign(ctx.state, {
        file: 'cdp',
        headTitle: 'cdp',
        needVue: true
    });
    await ctx.render('cdp/cdp');
};

module.exports = {
    'GET /cdp': cdp
};

