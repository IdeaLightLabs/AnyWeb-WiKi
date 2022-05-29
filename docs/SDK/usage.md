# Provider API

:::info 提示

AnyWeb JS SDK的 `Provider` 在 `1.2.0` 后被修改为单例模式，因此请在页面初始化时实例化 `Provider` 并且立即调用 `on('ready', function)` 方法来设置 SDK
初始化完成的回调，请勿在 SDK 初始化完成前调用任何 SDK 方法。

同时 `Provider` 也提供了静态属性 `Provider.ready` 用于判断 SDK 是否初始化完成，请结合项目需求使用。

:::

## Conflux

### Provider API提供的功能

| method               | 说明                           |
|----------------------|------------------------------|
| cfx_accounts         | 获取 Conflux 账户授权              |
| cfx_sendTransaction  | 发起 Conflux 合约调用              |
| anyweb_importAccount | 将账户地址导入 AnyWeb 中             |
| anyweb_identify      | 跳转到 AnyWeb 进行实名认证            |
| exit_accounts        | 取消钱包账户授权 (不推荐将废弃, 目前全版本暂时兼容) |
| anyweb_revoke        | 取消钱包账户授权 (推荐 1.2.2后支持)       |
| anyweb_logout        | 退出登录                         |
| anyweb_version       | 获取 AnyWeb JS-SDK 版本          |
| anyweb_home          | 启动 AnyWeb 首页                 |
| anyweb_loginstate    | 判断 AnyWeb 用户是否登录             |

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

- 如果用户已授权的网络ID不在`availableNetwork`内，或 `scopes` 超越了用户已授权的范围，则会提示用户重新授权，若授权成功则会返回新的 `code` 及其他参数。
- 如果请求参数与上一次相同，则会直接返回新的 `code` 及其他参数。

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

### 实名认证 `anyweb_identify`

一些场景下需要用户的实名信息，可以先通过 [用户信息获取](https://wiki.anyweb.cc/docs/OAuth/userInfo) 接口尝试获取用户实名信息。如果用户未进行实名认证，可通过以下代码跳转到 AnyWeb
进行实名认证。认证成功后可再次尝试通过 [用户信息获取](https://wiki.anyweb.cc/docs/OAuth/userInfo) 接口获取实名认证信息。

返回值：

| 键名     | 类型      | 说明                              |
|--------|---------|---------------------------------|
| result | Boolean | `result` 为 `true` 时说明用户已经通过了认证。 |

```javascript
/**
 * 取消授权
 */
provider.request({
    method: 'anyweb_identify',
    params: []
}).then((data) => {
    console.log('result', data.result)
    // 后续操作
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
    params: [{
        address: ['cfx:xxxxxx', 'cfx:xxxxxx'],
        addressName: ['账户1', '账户2'], // 选填
    }],
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

### 获取登录状态

返回当前 AnyWeb 的用户是否登录。

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

```javascript
conflux.provider = new Provider({
    logger: console,
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
