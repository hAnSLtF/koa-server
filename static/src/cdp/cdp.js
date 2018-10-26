(function() {
    var vm = new Vue({
        el: '#Cdp',
        data: {
            navList: [
                {
                    name: '所有项目',
                    active: true
                }, {
                    name: '我的发布',
                    active: false
                }, {
                    name: '使用帮助',
                    active: false
                }
            ],
            isLogin: false,
            logInfo: {
                name: '登陆',
                id: 0
            },
            onlyme: {
                checked: false
            }
        }
    });
})();

