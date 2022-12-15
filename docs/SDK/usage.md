# Provider API

:::info 提示

AnyWeb JS SDK的 `Provider` 在 `1.2.0` 后被修改为单例模式，因此请在页面初始化时实例化 `Provider`
并且立即调用 `on('ready', function)` 方法来设置 SDK
初始化完成的回调，请勿在 SDK 初始化完成前调用任何 SDK 方法。

同时 `Provider` 也提供了静态属性 `Provider.ready` 用于判断 SDK 是否初始化完成，请结合项目需求使用。

:::

## Conflux

### Provider API提供的功能

| method               | 说明                           |
| -------------------- |------------------------------|
| cfx_accounts         | 获取 Conflux 账户授权              |
| cfx_sendTransaction  | 发起 Conflux 合约调用              |
| cfx_signTypedData    | 发起 Conflux 签名                |
| anyweb_importAccount | 将账户地址导入 AnyWeb 中             |
| anyweb_identify      | 跳转到 AnyWeb 进行实名认证            |
| anyweb_revoke        | 解除钱包账户授权      |
| anyweb_logout        | 退出登录                         |
| anyweb_version       | 获取 AnyWeb JS-SDK 版本          |
| anyweb_home          | 启动 AnyWeb 首页                 |
| anyweb_loginstate    | 判断 AnyWeb 用户是否登录             |

### 获取授权 `cfx_accounts`

在开始使用之前，需要获取授权，以获取到用户的地址等信息。

#### 参数

* `availableNetwork`: 限定用户可以选择的区块链网络 ID 列表，如 `[1029]` (在 Conflux 中 1029 为主网络、1 为测试网)，用户只能在指定的网络列表中进行选择和授权。
* `scopes`: 指定请求的授权的信息，有以下可选值：
    * `baseInfo`: 获取基本信息，`unionid` `addresses`字段 地址检查功能等。
    * `identity`: 授权获取手机号等信息。

#### 返回值

| 键名        | 类型     | 说明                                                            |
|-----------| -------- |---------------------------------------------------------------|
| code      | String   | 用于换取 OAuth 的 accessToken, 失效时间 5 分钟                           |
| address   | String[] | 地址列表                                                          |
| networkId | Number   | 用户选择对 DApp 授权的区块链网络ID                                         |
| chainId   | Number   | 用户选择对 DApp 授权的区块链（目前仅支持 Conflux 链， Conflux 链 `chainId` 为 `1`） |
| scope     | String[] | 获取到的授权类型                                                      |
| phone     | String   | 用户手机号(选填)，可以跳过输入手机号的页面，直接进入输入验证码页面                            |                                                    |

```json
{
  "code": "a5d5de55-5555-4b55-b555-555c5555de5b",
  "address": [
    "cfx:aargcrcwsaztcgcne0gb56zk1f08t9mdjpt9v08dep"
  ],
  "networkId": 1,
  "chainId": 1,
  "scopes": [
    "baseInfo",
    "identity"
  ]
}
```

#### 异常

| 错误                | 错误码 | 类型           | 内容                                     |
| ------------------- | ------ | -------------- | ---------------------------------------- |
| UserRejectedRequest | 4001   | 用户操作异常   | 用户拒绝该请求                           |
| Unauthorized        | 4100   | 用户操作异常   | 用户未授权                               |
| UnsupportedMethod   | 4200   | 开发者调用异常 | 方法不存在                               |
| Disconnected        | 4900   | 开发者调用异常 | 未连接到钱包                             |
| ChainDisconnected   | 4901   | 其他           | 链断开连接                               |
| SDKNotReady         | 5000   | 开发者调用异常 | SDK未初始化                              |
| ParamsError         | 6000   | 开发者调用异常 | 参数错误                                 |
| RequestError        | 7000   | 其他           | 请求错误, 具体信息见 `Message` 和 `data` |

#### 实例

 ```javascript
/**
 * 指定网络的获取账户授权
 */
provider.request({
    method: 'cfx_accounts',
    params: [{
        availableNetwork: [1, 1029],
        scopes: ['baseInfo', 'identity'],
    }],
}).then((data) => {
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

:::caution 说明

用户首次授权时，会跳转到 AnyWeb 的授权页面，用户点击授权后，会返回 `code` 等数据。 再次调用时该接口时：

- 如果用户已授权的网络ID不在`availableNetwork`内，或 `scopes`
  超越了用户已授权的范围，则会提示用户重新授权，若授权成功则会返回新的 `code` 及其他参数。
- 如果请求参数与上一次相同，则会直接返回新的 `code` 及其他参数。

:::

### 解除授权 `anyweb_revoke`

在 DApp 获取到用户授权后，如果需要重新获取用户授权或者解除用户授权，可以调用 `anyweb_revoke` 以解除授权。

解除授权后，需要重新调用 `cfx_accounts` 才能再次获取授权。

#### 参数

无

#### 返回值

无

#### 异常

| 错误                | 错误码 | 类型           | 内容                                     |
| ------------------- | ------ | -------------- | ---------------------------------------- |
| UserRejectedRequest | 4001   | 用户操作异常   | 用户拒绝该请求                           |
| Unauthorized        | 4100   | 用户操作异常   | 用户未授权                               |
| UnsupportedMethod   | 4200   | 开发者调用异常 | 方法不存在                               |
| Disconnected        | 4900   | 开发者调用异常 | 未连接到钱包                             |
| ChainDisconnected   | 4901   | 其他           | 链断开连接                               |
| SDKNotReady         | 5000   | 开发者调用异常 | SDK未初始化                              |
| ParamsError         | 6000   | 开发者调用异常 | 参数错误                                 |
| RequestError        | 7000   | 其他           | 请求错误, 具体信息见 `Message` 和 `data` |

#### 实例

```javascript
/**
 * 解除授权
 */
provider.request({
    method: 'anyweb_revoke'
}).then(() => {
    // 后续操作
}).catch((e) => {
    console.error('调用失败', e)
})
```

### 实名认证 `anyweb_identify`

一些场景下需要用户的实名信息，可以先通过 [用户信息获取](https://wiki.anyweb.cc/docs/OAuth/userInfo)
接口尝试获取用户实名信息。如果用户未进行实名认证，可通过以下代码跳转到 AnyWeb
进行实名认证。认证成功后可再次尝试通过 [用户信息获取](https://wiki.anyweb.cc/docs/OAuth/userInfo) 接口获取实名认证信息。

#### 参数

无

#### 返回值

| 键名 | 类型    | 说明                                 |
| ---- | ------- | ------------------------------------ |
| -    | Boolean | 为 `true` 时说明用户已经通过了认证。 |

```json
true
```

#### 异常

| 错误                | 错误码 | 类型           | 内容                                     |
| ------------------- | ------ | -------------- | ---------------------------------------- |
| UserRejectedRequest | 4001   | 用户操作异常   | 用户拒绝该请求                           |
| Unauthorized        | 4100   | 用户操作异常   | 用户未授权                               |
| UnsupportedMethod   | 4200   | 开发者调用异常 | 方法不存在                               |
| Disconnected        | 4900   | 开发者调用异常 | 未连接到钱包                             |
| ChainDisconnected   | 4901   | 其他           | 链断开连接                               |
| SDKNotReady         | 5000   | 开发者调用异常 | SDK未初始化                              |
| ParamsError         | 6000   | 开发者调用异常 | 参数错误                                 |
| RequestError        | 7000   | 其他           | 请求错误, 具体信息见 `Message` 和 `data` |

#### 实例

```javascript
/**
 * 实名认证
 */
provider.request({
    method: 'anyweb_identify',
    params: []
}).then((result) => {
    console.log('result', result)
    // 后续操作
}).catch((e) => {
    console.error('调用失败', e)
})
```

### 调用合约 `cfx_sendTransaction`

#### 参数

| 键名 | 类型   | 说明                                       |
| ---- | ------ | ------------------------------------------ |
| from | String | 调用方地址                                 |
| to   | String | 合约地址                                   |
| data | String | 十六进制调用数据（通过Conflux JS SDK生成） |

#### 返回值

| 键名 | 类型   | 说明     |
| ---- | ------ | -------- |
| -    | String | 交易Hash |

```text
0xb80ccf2584bb3ab316cd682bb9b0ee967c249071ed2c1807eff04a6ccd796081
```

#### 异常

| 错误                 | 错误码 | 类型           | 内容                                     |
| -------------------- | ------ | -------------- | ---------------------------------------- |
| UserRejectedRequest  | 4001   | 用户操作异常   | 用户拒绝该请求                           |
| Unauthorized         | 4100   | 用户操作异常   | 用户未授权                               |
| UnsupportedMethod    | 4200   | 开发者调用异常 | 方法不存在                               |
| Disconnected         | 4900   | 开发者调用异常 | 未连接到钱包                             |
| ChainDisconnected    | 4901   | 其他           | 链断开连接                               |
| SDKNotReady          | 5000   | 开发者调用异常 | SDK未初始化                              |
| ParamsError          | 6000   | 开发者调用异常 | 参数错误                                 |
| RequestError         | 7000   | 其他           | 请求错误, 具体信息见 `Message` 和 `data` |
| SendTransactionError | 7001   | 其他           | 发送交易失败                             |

:::info 参考文档

Conflux
交易发送失败的常见错误及原因: [http://wiki.conflux123.xyz/books/faqs/chapter/96da2](http://wiki.conflux123.xyz/books/faqs/chapter/96da2)

:::

#### 实例

当需要调用合约方法时候，通过调用 `cfx_sendTransaction` 并将参数 `to` 设置为合约地址及 `data` 设置为调用合约的数据即可。

```javascript
/**
 * 调用合约
 * @return {string} hash 0xb80ccf2584bb3ab316cd682bb9b0ee967c249071ed2c1807eff04a6ccd796081
 */
const data = contract.balanceOf('cfx:aargcrcwsaztcgcne0gb56zk1f08t9mdjpt9v08dep').data   //contract 为Conflux JS SDK中的合约对象， 见部署合约例子中的contract 
provider.request({
    method: 'cfx_sendTransaction', params: [{
        from: 'cfx:aargcrcwsaztcgcne0gb56zk1f08t9mdjpt9v08dep',
        to: 'cfx:aargcrcwsaztcgcne0gb56zk1f08t9mdjpt9v08dep',
        data: data,
    }]
}).then((result) => {
    console.log("调用结果", result)
}).catch((e) => {
    console.error('调用失败', e)
})
```

### 签名

部分场景下需要获取用户签名时，通过调用 `cfx_signTypedData` 可获得签名。

:::info 参考文档

Conflux sign
官方文档: [https://docs.confluxnetwork.org/js-conflux-sdk/docs/sign_methods](https://docs.confluxnetwork.org/js-conflux-sdk/docs/sign_methods)

CIP-23
标准: [https://github.com/Conflux-Chain/CIPs/blob/2d9fdbdb08f66f705348669a6cd85e2d53509e97/CIPs/cip-23.md](https://github.com/Conflux-Chain/CIPs/blob/2d9fdbdb08f66f705348669a6cd85e2d53509e97/CIPs/cip-23.md)
:::

`params` 参数：

| index | 类型      | 默认值   | 说明                           |
|-------|---------|-------|------------------------------|
| 0     | String  | 无     | 对 `data` 签名的区块链账户地址          |
| 1     | String  | 无     | JSON序列化后的 `data` （CIP-23 标准） |
| 2     | Boolean | false | 是否以rsv格式返回                   |

返回值（默认）：

| 键名        | 类型     | 说明        |
|-----------|--------|-----------|
| signature | String | 十六进制格式的签名 |
| recovery  | Number | 用于公钥恢复    |

返回值（以rsv格式返回）：

| 键名  | 类型     | 说明     |
|-----|--------|--------|
| r   | String | 十六进制格式 |
| s   | String | 十六进制格式 |
| v   | Number | 用于公钥恢复 |

```javascript
/**
 * 签名
 */
const from = 'cfxtest:aan5d7p1y1j3gkn3v3wgref76ae69kx81y1b5uckjz' // 发起签名的账户地址
const data = JSON.stringify({...})   // CIP-23 标准格式数据
provider.request({
    method: 'cfx_signTypedData', params: [from, data, false]
}).then((result) => {
    console.log("调用结果", result)
}).catch((e) => {
    console.error('调用失败', e)
})
```

## AnyWeb

> 和 AnyWeb 相关的方法

### 导入账户

只导入该地址的账户信息，不导入该地址的私钥，可以查看该地址信息但无法进行链上操作。

#### 参数

| 键名        | 类型     | 说明     |
| ----------- | -------- | -------- |
| address     | String[] | 地址列表 |
| addressName | String[] | 账户名   |

#### 返回值

| 键名 | 类型     | 说明               |
| ---- | -------- | ------------------ |
| -    | String[] | 导入成功的地址列表 |

```javascript
[
    'cfx:aca8paka2w86tpgmmh7ufdv005u2cheb76578khwd2'
]
```

#### 异常

| 错误                | 错误码 | 类型           | 内容                                     |
| ------------------- | ------ | -------------- | ---------------------------------------- |
| UserRejectedRequest | 4001   | 用户操作异常   | 用户拒绝该请求                           |
| Unauthorized        | 4100   | 用户操作异常   | 用户未授权                               |
| UnsupportedMethod   | 4200   | 开发者调用异常 | 方法不存在                               |
| Disconnected        | 4900   | 开发者调用异常 | 未连接到钱包                             |
| ChainDisconnected   | 4901   | 其他           | 链断开连接                               |
| SDKNotReady         | 5000   | 开发者调用异常 | SDK未初始化                              |
| ParamsError         | 6000   | 开发者调用异常 | 参数错误                                 |
| RequestError        | 7000   | 其他           | 请求错误, 具体信息见 `Message` 和 `data` |

#### 实例

导入地址时参数只需要传入 `address` 即可。

如果希望自定义展示地址名称，只增加 `addressName` 即可，`addressName` 长度需和 `address` 保持一致。

不传 `addressName` 或长度为 0 时系统会默认为地址添加自增的名称如：Account1

```javascript
/**
 * 导入地址
 * @return {string[]} 地址列表 ['cfx:aargcrcwsaztcgcne0gb56zk1f08t9mdjpt9v08dep', 'cfx:aargcrcwsaztcgcne0gb56zk1f08t9mdjpt9v08dep']
 */
provider.request({
    method: 'anyweb_importAccount',
    params: [{
        address: ['cfx:aargcrcwsaztcgcne0gb56zk1f08t9mdjpt9v08dep', 'cfx:aargcrcwsaztcgcne0gb56zk1f08t9mdjpt9v08dep'],
        addressName: ['账户1', '账户2'], // 选填
    }],
}).then((result) => {
    console.log('导入的地址列表', result)
}).catch((e) => {
    console.error('调用失败', e)
})
```

### 获取版本号

返回当前 SDK 的版本号。

#### 参数

无

#### 返回值

| 键名 | 类型   | 说明               |
| ---- | ------ | ------------------ |
| -    | String | 导入成功的地址列表 |

```
1.2.2
```

#### 异常

| 错误              | 错误码 | 类型           | 内容         |
| ----------------- | ------ | -------------- | ------------ |
| UnsupportedMethod | 4200   | 开发者调用异常 | 方法不存在   |
| Disconnected      | 4900   | 开发者调用异常 | 未连接到钱包 |

#### 实例

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

### 获取登录状态

返回当前 AnyWeb 的用户是否登录。

#### 参数

无

#### 返回值

| 键名 | 类型 | 说明     |
| ---- | ---- | -------- |
| -    | Bool | 是否登陆 |

```
true
```

#### 异常

| 错误                | 错误码 | 类型           | 内容                                     |
| ------------------- | ------ | -------------- | ---------------------------------------- |
| UserRejectedRequest | 4001   | 用户操作异常   | 用户拒绝该请求                           |
| Unauthorized        | 4100   | 用户操作异常   | 用户未授权                               |
| UnsupportedMethod   | 4200   | 开发者调用异常 | 方法不存在                               |
| Disconnected        | 4900   | 开发者调用异常 | 未连接到钱包                             |
| ChainDisconnected   | 4901   | 其他           | 链断开连接                               |
| SDKNotReady         | 5000   | 开发者调用异常 | SDK未初始化                              |
| ParamsError         | 6000   | 开发者调用异常 | 参数错误                                 |
| RequestError        | 7000   | 其他           | 请求错误, 具体信息见 `Message` 和 `data` |

#### 实例

```javascript
/**
 * 获取是否登录
 * @return {bool} 是否登录 true/false
 */
provider.request({
    method: 'anyweb_loginstate', params: []
}).then((result) => {
    console.log('登录状态', result)
}).catch((err) => {
    console.error('调用失败', e)
})
```

### SDK 初始化完成回调

设置 SDK 完成初始化后的回调

#### 实例

```javascript
const provider = new Provider({
    logger: console, // SDK 的 logger, 设置为 null 可关闭 SDK 的日志
    appId: '从open.anyweb.cc拿到的AppId',
})
provider.on('ready', () => {
    console.log('SDK 初始化完成 可以调用接口方法')
    provider.request({
        method: 'cfx_accounts',
        params: [{
            availableNetwork: [1, 1029],
            scopes: ['baseInfo', 'identity'],
        }],
    }).then((data) => {
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
})
```
