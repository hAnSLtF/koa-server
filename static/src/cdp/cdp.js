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
            onlyme: {
                checked: false
            },
            projects: {
                header: [
                    {
                        title: '项目名'
                    }, {
                        title: '备注描述'
                    }, {
                        title: 'BU',
                        filter: true
                    }, {
                        title: '文件类型'
                    }, {
                        title: '更新时间',
                        sort: 1
                    }, {
                        title: '发布人'
                    }
                ],
                body: [

                ]
            }
        },
        created: function() {
            this.getUserInfo();
            this.getProduction();
        },
        methods: {
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
            getProduction: function() {
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
                        console.log(1);
                        that.projects.body = res.data.results;
                    }
                }).catch(function(err) {
                    console.log(err);
                });
            },
            ctrClick: function(item) {
                this.ctrlist.forEach(ele => {
                    ele.active = false;
                });
                item.active = true;
            },
            navClick: function(item) {
                this.navList.forEach(ele => {
                    ele.active = false;
                });
                item.active = true;
            }
        }
    });
})();

