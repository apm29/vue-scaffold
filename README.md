# 智安小区招标演示-手机端

## 技术选型
Vue2 + VantUI + WindiCss

## 项目初始化
vue ui:
* babel
* eslint + prettier
* vue-router
* vuex
* node-sass

## 引入vant
1. 添加依赖
```shell
yarn add vant
```
2.按需引入
```shell
 babel-plugin-import -D
```
babel.config.js文件加入
```javascript
module.exports = {
  plugins: [
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }, 'vant']
  ]
};
```
3.导入所有组件
```javascript
import Vue from 'vue';
import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);
```

## windicss
```shell
vue add windicss
```

## 空值安全

```shell
# 安装支持"?."语法的插件
yarn add -D @babel/plugin-proposal-optional-chaining
# 安装支持"??"语法的插件
yarn add -D @babel/plugin-proposal-nullish-coalescing-operator
```
babel.config.js文件
```javascript
// 在工程根目录下的babel.config.js文件中引入插件
module.exports = {
  "plugins": [
    "@babel/plugin-proposal-nullish-coalescing-operator", //支持??
    "@babel/plugin-proposal-optional-chaining",           //支持?.
  ],
};
```
