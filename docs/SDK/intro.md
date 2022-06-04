# AnyWeb JS SDK 介绍

AnyWeb JS SDK 是为 [AnyWeb](https://wiki.anyweb.cc/docs/anyweb/) 开发的SDK，提供了一套简单的API，方便开发者快速将 Dapp 接入到 AnyWeb 中实现便捷的钱包服务。

Features:

* 支持在移动端和PC端调用钱包服务
* 支持网页内和跳转App调用钱包服务
* 支持多链钱包服务
* 支持 ` 热钱包 ` 和 ` 冷钱包 `
* 简单易用快速上手

## 支持性

### 已支持

* Conflux

### 待支持

* Conflux EVM Space

## Docs

* [AnyWeb 介绍](https://wiki.anyweb.cc/docs/AnyWeb/into)
* [SDK](https://wiki.anyweb.cc/SDK/intro)
    * [SDK 介绍](https://wiki.anyweb.cc/docs/SDK/intro)
    * [SDK 快速开始](https://wiki.anyweb.cc/docs/SDK/quick_start)
    * [SDK 用法](https://wiki.anyweb.cc/docs/SDK/usage)
    * [SDK 错误码](https://wiki.anyweb.cc/docs/SDK/errorCode)
    * [更新日志](https://wiki.anyweb.cc/docs/SDK/CHANGELOG)
    * [OAuth 接口](https://wiki.anyweb.cc/docs/SDK/OAuth/intro)
        * [OAuth 接口介绍](https://wiki.anyweb.cc/docs/SDK/OAuth/intro)
        * [accessToken 获取](https://wiki.anyweb.cc/docs/SDK/OAuth/accessToken)
        * [用户信息获取](https://wiki.anyweb.cc/docs/SDK/OAuth/userInfo)
* [服务端能力](https://wiki.anyweb.cc/docs/Service/intro)
    * [服务端能力介绍](https://wiki.anyweb.cc/docs/Service/intro)
    * [serviceToken 获取](https://wiki.anyweb.cc/docs/Service/serviceToken)
    * [检查地址](https://wiki.anyweb.cc/docs/Service/checkAddress)
    * [批量检查地址](https://wiki.anyweb.cc/docs/Service/checkAddresses)

前往[ 官网文档 ](https://wiki.anyweb.cc)了解更多

## 开始之前

请先在[ AnyWeb开放平台 ](https://open.anyweb.cc)注册账号获取到AppId等相关信息。

## 安装

` npm ` 安装

```sh
$ npm install --save @idealight-labs/anyweb-js-sdk
```
