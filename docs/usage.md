# Provider API

## Conflux

### Provider API提供的功能

| method               | 说明                  |
|----------------------|---------------------|
| cfx_accounts         | 获取 Conflux 账户授权     |
| exit_accounts        | 取消 Conflux 账户授权     |
| cfx_sendTransaction  | 发起 Conflux 合约调用     |
| anyweb_importAccount | 将账户地址导入 AnyWeb 中    |
| anyweb_version       | 获取 AnyWeb JS-SDK 版本 |
| anyweb_home          | 启动 AnyWeb 首页        |

### 获取授权 `cfx_accounts`

在开始使用之前，需要获取授权，以获取到用户的地址等信息。

可选参数:

* `availableNetwork`: 限定用户可以选择的区块链网络ID 如`[1,1029]`(在 Conflux 中 1029 为主网络、1 为测试网)。那么用户只能选择在指定的网络中进行授权。
* `scopes`: 指定请求的授权的信息，有以下可选值：
    * `baseInfo`: 获取基本信息，`unionid` `addresses`字段 地址检查功能等。
    * `identity`: 授权获取手机号等信息。

返回值：

| 键名        | 类型       | 说明                                                            |
|-----------|----------|---------------------------------------------------------------|
| code      | String   | 用于换取 OAuth 的 accessToken, 失效时间 5 分钟                           |
| address   | String[] | 地址列表                                                          |
| networkId | Number   | 用户选择对 DApp 授权的区块链网络ID                                         |
| chainId   | Number   | 用户选择对 DApp 授权的区块链（目前仅支持 Conflux 链， Conflux 链 `chainId` 为 `1`） |

 ```javascript
/**
 * 指定网络的获取账户授权
 */
provider.request({
  method: 'cfx_accounts',
  params: {
    availableNetwork: [1, 1029],
    scopes: ['baseInfo', 'identity'],
  },
}).then((result) => {
  const {chainId, networkId, address, code} = data
  console.log(
    'DApp 获取到的授权结果',
    chainId,
    networkId,
    address,
    code
  )
}).catch((e) => {
  console.error('调用失败', e)
})
```

:::caution 接口变动

对比上一个版本的接口`provider.request` 中的 `params` 参数去除了无意义的数组包裹

    params: [{
      availableNetwork: [1, 1029],
      scopes: ['baseInfo', 'identity'],
    }],

变更为

    params: {
      availableNetwork: [1, 1029],
      scopes: ['baseInfo', 'identity'],
    }

:::

:::caution 说明

用户首次授权时，会跳转到 AnyWeb 的授权页面，用户点击授权后，会返回 `code` 等数据。 再次调用时该接口时：

- 如果用户已授权的网络ID不在`availableNetwork`内，或 `scopes` 超越了用户已授权的范围，则会提示用户重新授权，若授权成功返回数据同首次授权。
- 否则DApp未越权时返回数据同首次授权。

:::

### 取消授权 `exit_accounts`

取消授权后，会跳转到 AnyWeb 进行取消。取消成功后会自动返回DApp。

```javascript
/**
 * 取消授权
 */
provider.request({
  method: 'exit_accounts'
}).then(() => {
  // 后续操作
}).catch((e) => {
  console.error('调用失败', e)
})
```

### 发起交易

当需要进行签名交易时，调用 `cfx_sendTransaction` 并传入交易参数即可。

`gatewayPayload` 参数为自定义参数。该字段用于在开放平台填写的网关地址中作为参数，该字段功能可自定义。

如发起CFX转账交易:

```javascript
/**
 * 发起交易
 */
provider.request({
  method: 'cfx_sendTransaction',
  params: {
    payload: {
      from: 'cfx:xxxxxx',
      to: 'cfx:xxxxxx',
      value: '0x1',
    },
    // gatewayPayload 可选
    gatewayPayload: {},
  }
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

当需要调用合约方法时候，通过调用 `cfx_sendTransaction` 并将参数 `to` 设置为合约地址及 `data` 设置为调用合约的数据即可。

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

* **导入地址**: 只导入该地址的账户信息，不导入该地址的私钥，可以查看该地址信息但无法进行链上操作。

[//]: # (* **导入私钥**: 导入私钥，可以查看该地址信息，可以进行链上操作。)

#### 导入地址

导入地址时参数只需要传入 `address` 即可。

如果希望自定义展示地址名称，只增加 `addressName` 即可，`addressName` 长度需和 `address` 保持一致。

不传 `addressName` 或长度为 0 时系统会默认为地址添加自增的名称如：Account1

```javascript
/**
 * 导入地址
 * @return {string[]} 地址列表 ['cfx:xxxxxx', 'cfx:xxxxxx']
 */
provider.request({
  method: 'anyweb_importAccount',
  params: {
    address: ['cfx:xxxxxx', 'cfx:xxxxxx'],
    addressName: ['账户1', '账户2'], // 选填
  },
}).then((result) => {
  console.log('导入的地址列表', result)
}).catch((e) => {
  console.error('调用失败', e)
})
```

[//]: # (#### 导入私钥 )

[//]: # ()

[//]: # (导入私钥时参数只需要传入 `privateKey` 即可: )

[//]: # ()

[//]: # (```javascript)

[//]: # (/**)

[//]: # ( * 导入私钥)

[//]: # ( * @return {string[]} 地址列表 ['cfx:xxxxxx', 'cfx:xxxxxx'])

[//]: # ( */)

[//]: # (provider.request&#40;{)

[//]: # (    method: 'anyweb_importAccount',)

[//]: # (    params: [{)

[//]: # (        privateKey: ['0xaaaaaa', '0xaaaaaa'],)

[//]: # (    }],)

[//]: # (}&#41;.then&#40;&#40;result&#41; => {)

[//]: # (    console.log&#40;'导入的地址列表', result&#41;)

[//]: # (}&#41;.catch&#40;&#40;e&#41; => {)

[//]: # (    console.error&#40;'调用失败', e&#41;)

[//]: # (}&#41;)

[//]: # (```)

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
