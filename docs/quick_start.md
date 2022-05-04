# 快速开始
> 所有代码块中包含 `$` 代表终端/命令行操作

## AnyWeb JS SDK

AnyWeb JS SDK 是为 Anyweb 开发的SDK，提供了一套简单的API，方便开发者快速将 Dapp 接入到 AnyWeb 中实现便捷的钱包服务。

Features:

* 支持在移动端和PC端调用钱包服务
* 支持网页内和跳转App调用钱包服务
* 支持多链钱包服务
* 支持 ` 热钱包 ` 和 ` 冷钱包 `
* 简单易用快速上手

## 开始之前

请先在[ AnyWeb开放平台 ](https://open.anyweb.cc)注册账号获取到AppId等相关信息。

## 安装

`npm` 安装

```sh
$ npm install --save @idealight-labs/anyweb-js-sdk
```

## 引用方法

### ESM

```javascript
import {Provider} from '@idealight-labs/anyweb-js-sdk';

conflux.provider = new Provider({
    logger: console,
    appId: '从open.anyweb.cc拿到的AppId',
})
```

### UMD

从 `anyweb-js-sdk` 的 `dist` 目录中进行引用  `umd` 版本.

```html

<script type="text/javascript"
        src="https://cdn.jsdelivr.net/npm/@idealight-labs/anyweb-js-sdk@1.1.6/dist/anyweb-js-sdk.umd.min.js"></script>

<script type="text/javascript">
    conflux.provider = new window.AnyWeb.Provider({
        logger: console,
        appId: '从open.anyweb.cc拿到的AppId'
    })
</script>
```

## 用法

AnyWeb JS SDK遵循[ EIP1193 ](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1193.md)
开发，兼容[ js-sdk-conflux ](https://github.com/Conflux-Chain/js-conflux-sdk) ，只需要将AnyWeb注入为对应的Provider即可。

### Conflux

AnyWeb SDK JS 实现了 Provider 的主要方法，通过 `request` 方法进行调用。

```javascript
/**
 * 获取账户授权
 * @return {string[]} ['cfx:xxxxxx', 'cfx:xxxxxx']
 */
provider.request({
    method: 'cfx_accounts',
})

/**
 * 发起交易
 * @return {string} 0xb80ccf2584bb3ab316cd682bb9b0ee967c249071ed2c1807eff04a6ccd796081
 */
provider.request({
    method: 'cfx_sendTransaction',
    params: [
        {
            from: 'cfx:xxxxxx',
            to: 'cfx:xxxxxx',
            value: '0x1',
        },
    ],
})

/**
 * 导入账户地址到钱包
 * @return {string} success
 * @return {string} fail
 */
provider.request({
    method: 'anyweb_importAddress',
    params: [
        {
            address: ['cfx:xxxxxx', 'cfx:xxxxxx']
        }
    ]
})

/**
 * 获取AnyWeb版本号
 * @return {1.0.0}
 */
provider.request({
    method: 'anyweb_version',
})

/**
 * 获取账户改变事件
 */
provider.on('accountsChanged', (accounts: string[]) => {
    console.log("获取到新的账户信息", accounts)
})

/**
 * 链或网络变更事件
 */
provider.on('chainChanged', (chainId: string) => {
    // 这里需要手动获取下NetworkId
    const networkId = provider.request({
        method: 'cfx_netVersion',
    })
    console.log("链或网络变更事件", {chainId, networkId})
})
```
