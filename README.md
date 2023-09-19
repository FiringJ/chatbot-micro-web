# 框架介绍

基础框架：Vue 3 + Typescript + Vite

CSS 框架：待补充

UI 框架：element-plus

Vue 工具类：@vueuse/core

状态管理：pinia

路由配置：vite-plugin-pages, vite-plugin-vue-layouts

开发套件：unplugin-vue-components, unplugin-auto-import

包管理工具：pnpm

建议 IDE：vscode

## 开发环境

nodejs 版本：16+

全局安装 pnpm 包管理工具：`npm install -g pnpm`

开发命令： `npm run dev`

## 目录结构

### /config

预留这个文件夹，预计放一些与环境相关的配置

### /dist

构建后的前端资源目录，部署时需要：

1. 将该目录全部同步至 CDN 对应目录(如果有的话)
2. 将该目录同 deploy 目录同步至应用服务器

### /public

用于存放需要静态部署的资源，该目录的文件在构建时会被打包至 dist 目录。

通常存放：ico 文件，robot.txt，以及一些域名校验文件

### /src

前端开发源码目录，所有业务代码存放在此目录下。

### /tools

预留这个文件夹，预计存放一些开发/构建时需要使用到的脚手架工具。

## 源码模块划分

待补充
