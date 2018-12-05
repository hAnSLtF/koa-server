(function() {
    let vm = new Vue({
        el: '#Cdp',
        data: {
            token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbXBfaWQiOiJzMzkzODAiLCJleHAiOjE1NDM2MzU5Nzl9.kYFp9MnWBSl3-L-OULa4MXbp6uXEx02FwKO-sPwaSRA',
            user: {
                name: '登陆',
                id: '',
                login: false
            },
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
            ctrlist: [
                {
                    name: '全部',
                    active: true
                }, {
                    name: 'Sketch',
                    active: false
                }, {
                    name: 'Axure',
                    active: false
                }
            ],
            projects: {
                header: [
                    {
                        title: '项目名',
                        width: '25%'
                    }, {
                        title: '备注描述',
                        width: '20%'
                    }, {
                        title: 'BU',
                        width: '13%',
                        filter: true
                    }, {
                        title: '文件类型',
                        width: '13%'
                    }, {
                        title: '更新时间',
                        width: '19%',
                        sort: 1
                    }, {
                        title: '发布人',
                        width: '10%'
                    }
                ],
                headerMy: [
                    {
                        title: '项目名',
                        width: '25%'
                    }, {
                        title: '备注描述',
                        width: '20%'
                    }, {
                        title: '文件类型',
                        width: '13%'
                    }, {
                        title: '更新时间',
                        width: '19%',
                        sort: 1
                    }, {
                        title: '',
                        width: '23%'
                    }
                ],
                body: [

                ]
            },
            search: {
                currentNav: 0,
                currentType: '全部',
                name: '',
                creator: '',
                onlyme: false,
                history: []
            }
        },
        created: function() {
            this.checkClient();
            if (getCookie('searchHistory')) {
                this.search.history = JSON.parse(getCookie('searchHistory'));
            }
            this.getUserInfo();
            this.getProject();
        },
        methods: {
            //检查应用版本
            checkClient: function() {
                let that = this;
                axios({
                    url: '/api/v1/clientversion/',
                    method: 'get',
                    headers: {
                        Authorization: `Bearer ${ that.token }`
                    }
                }).then(function(res) {
                }).catch(function(err) {
                    console.log(err.response.data);
                });
            },
            //获取用户信息
            getUserInfo: function() {
                let that = this;
                axios({
                    url: '/api/v1/user/who/',
                    method: 'get',
                    headers: {
                        Authorization: `Bearer ${ that.token }`
                    }
                }).then(function(res) {
                    if (res && res.status === 200) {
                        that.user.name = res.data.display_name;
                        that.user.login = true;
                    }
                }).catch(function(err) {
                    console.log(err);
                });
            },
            //获取项目列表
            getProject: function() {
                let that = this;
                axios({
                    url: '/api/v1/projects/',
                    method: 'get',
                    headers: {
                        Authorization: `Bearer ${that.token}`
                    },
                    params: {
                        page: 1,
                        size: 10
                    }
                }).then(function(res) {
                    if (res && res.data.results.length) {
                        res.data.results.forEach(ele => {
                            ele.active = false;
                        });
                        that.projects.body = res.data.results;
                    }
                }).catch(function(err) {
                    console.log(err);
                });
            },
            //搜索项目
            searchProject: function() {
                this.getProject();
                if (this.search.name.trim() && !this.search.history.includes(this.search.name.trim())) {
                    this.search.history.push(this.search.name.trim());
                    setCookie('searchHistory', JSON.stringify(this.search.history));
                }
            },
            ctrClick: function(item) {
                this.ctrlist.forEach(ele => {
                    ele.active = false;
                });
                item.active = true;
                this.search.currentType = item.name;
            },
            navClick: function(item, index) {
                this.navList.forEach(ele => {
                    ele.active = false;
                });
                item.active = true;
                this.search.currentNav = index;
            },
            projectClick: function(item) {
                item.active ? item.active = false : item.active = true;
            },
            //清除历史
            clearHistory: function() {
                if (this.search.history.length) {
                    this.search.history = [];
                    setCookie('searchHistory', JSON.stringify(this.search.history));
                }
            }
        }
    });
    function setCookie(name, value) {
        var Days = 30;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
    }
    function getCookie(name) {
        let reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        let arr = document.cookie.match(reg);
        if (arr && arr.length)
            return unescape(arr[2]);
        else
            return null;
    }
    function delCookie(name) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = getCookie(name);
        if (cval !== null)
            document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    }
})();

