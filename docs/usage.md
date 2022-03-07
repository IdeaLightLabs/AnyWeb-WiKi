# 基本使用

## Conflux

### 获取地址授权

在开始使用之前，需要获取地址授权，以获取到用户的地址信息。

 ```javascript
/**
 * 获取账户授权
 * @return {string[]} 账户地址列表 ['cfx:xxxxxx', 'cfx:xxxxxx']
 */
provider.request({
    method: 'cfx_accounts',
}).then((result) => {
    console.log('账户地址列表', result)
}).catch((e) => {
    console.error('调用失败', e)
})
```

### 发起交易

当需要进行签名交易时，调用 `cfx_sendTransaction` 并传入交易参数即可。

如发起CFX转账交易：

```javascript
/**
 * 发起交易
 * @return {string} 交易hash 0xb80ccf2584bb3ab316cd682bb9b0ee967c249071ed2c1807eff04a6ccd796081
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
}).then((result) => {
    console.log('交易hash', result)
}).catch((e) => {
    console.error('调用失败', e)
})
```

### 部署合约

需要部署合约时，通过调用 `cfx_sendTransaction` 并传入合约的参数即可，其中 `data`
参数通过 [js-conflux-sdk](https://docs.confluxnetwork.org/js-conflux-sdk/docs/interact_with_contract#how-to-deploy-a-contract)
获取。

```javascript
/**
 * 部署合约
 * @return {string} 合约地址 0xAAAAAAA
 */
const {Conflux} = require('js-conflux-sdk');
const {abi, bytecode} = MINI_ERC20;
const contract = conflux.Contract({abi, bytecode});
const contractData = contract.constructor('MiniERC20', 18, 'MC', 10000).data
provider.request({
    method: 'cfx_sendTransaction', params: [{
        from: 'cfx:xxxxxx',
        data: contractData,
    }]
}).then((result) => {
    console.log("合约地址", result)
}).catch((e) => {
    console.error('调用失败', e)
})
```

### 调用合约

当需要调用合约方法时候，通过调用 `cfx_sendTransaction` 并将参数 `to` 设置为合约地址及 `data` 设置为调用合约的数据即可

```javascript
/**
 * 调用合约
 * @return {string} hash 0xb80ccf2584bb3ab316cd682bb9b0ee967c249071ed2c1807eff04a6ccd796081
 */
const data = contract.balanceOf('cfx:xxxxxx').data   //contract 为Conflux JS SDK中的合约对象， 见部署合约例子中的contract 
provider.request({
    method: 'cfx_sendTransaction', params: [{
        from: 'cfx:xxxxxx',
        to: 'cfx:xxxxxx',
        data: data,
    }]
}).then((result) => {
    console.log("调用结果", result)
}).catch((e) => {
    console.error('调用失败', e)
})
```

## AnyWeb

> 和 AnyWeb 相关的方法

### 导入账户

导入账户分为两类:

* **导入地址**: 只导入该地址的账户信息，不导入该地址的私钥，可以查看改地址信息但无法进行链上操作。
* **导入私钥**：导入私钥，可以查看该地址信息，可以进行链上操作。

#### 导入地址

导入地址时参数只需要传入 `address` 即可：

```javascript
/**
 * 导入地址
 * @return {string[]} 地址列表 ['cfx:xxxxxx', 'cfx:xxxxxx']
 */
provider.request({
    method: 'anyweb_importAccount',
    params: [{
        address: ['cfx:xxxxxx', 'cfx:xxxxxx'],
    }],
}).then((result) => {
    console.log('导入的地址列表', result)
}).catch((e) => {
    console.error('调用失败', e)
})
```

#### 导入私钥

导入私钥时参数只需要传入 `privateKey` 即可：

```javascript
/**
 * 导入私钥
 * @return {string[]} 地址列表 ['cfx:xxxxxx', 'cfx:xxxxxx']
 */
provider.request({
    method: 'anyweb_importAccount',
    params: [{
        privateKey: ['0xaaaaaa', '0xaaaaaa'],
    }],
}).then((result) => {
    console.log('导入的地址列表', result)
}).catch((e) => {
    console.error('调用失败', e)
})
```

### 获取版本号

返回当前 SDK 的版本号。

```javascript
/**
 * 获取版本号
 * @return {string} 版本号 1.0.8
 */
provider.request({
    method: 'anyweb_version',
}).then((result) => {
    console.log('AnyWeb JS SDK版本号', result)
}).catch((e) => {
    console.error('调用失败', e)
})
```

### 启动 AnyWeb

启动 AnyWeb 的首页

```javascript
/**
 * 获取版本号
 * @return {string} 状态 'ok'
 */
provider.request({
    method: 'anyweb_home',
}).then((result) => {
    if (result === 'ok') {
        console.log('启动AnyWeb成功')
    } else {
        console.error('启动AnyWeb失败')
    }
}).catch((e) => {
    console.error('调用失败', e)
})
```
