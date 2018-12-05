# 简介
基于[Koa2](https://github.com/koajs/koa)搭建的 MVC 服务系统，用以承载前端服务工具。

# 安装：
- `npm i`

# 启动：
- 命令行`npm start`
- 在vscode编辑器中可直接按`F5`启动
- 命令行输入`gulp`开启本地编译

# 结构
```
.
├── README.md
├── app.js //项目入口
├── assets
├── config
│   ├── development.yaml
│   └── production.yaml
├── config.js //配置文件处理
├── controller
├── controller.js //controller文件处理
├── gulpfile.js
├── package-lock.json
├── package.json
├── proxy.js //跨域接口代理
├── static //静态资源
│   ├── common
│   ├── dest
│   └── src
├── static.js //静态资源处理
└── view
    └── base
        ├── footer.ejs
        └── header.ejs
```

