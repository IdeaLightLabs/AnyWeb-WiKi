# 异常信息

:::info 提示

这里错误码指的是 SDK 抛出的错误码, 且本 SDK 遵循 [EIP-1193协议](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1193.md)。

:::

## 接口

```typescript
interface ProviderRpcError extends Error {
    code: number;
    data?: unknown;
    message?: string
}
```

* `code`: 错误码, 具体见下
* `data`: 错误数据, 一般为对象类型, 可选
* `message`: 错误可读性信息, 可选

## 错误码


:::caution 注意

负数的错误码如 `-32015` 为 Conflux 错误码, 请参考 [Conflux 错误码](https://developer.confluxnetwork.org/sending-tx/en/transaction_send_common_error) 排查和解决。

:::

| 错误                   | 错误码  | 类型      | 内容                             |
|----------------------|------|---------|--------------------------------|
| UserRejectedRequest  | 4001 | 用户操作异常  | 用户拒绝该请求                        |
| Unauthorized         | 4100 | 用户操作异常  | 用户未授权                          |
| UnsupportedMethod    | 4200 | 开发者调用异常 | 方法不存在                          |
| Disconnected         | 4900 | 开发者调用异常 | 未连接到钱包                         |
| ChainDisconnected    | 4901 | 其他      | 链断开连接                          |
| SDKNotReady          | 5000 | 开发者调用异常 | SDK未初始化                        |
| ParamsError          | 6000 | 开发者调用异常 | 参数错误                           |
| RequestError         | 7000 | 其他      | 请求错误, 具体信息见 `Message` 和 `data` |
| SendTransactionError | 7001 | 其他      | 发送交易失败                         |
| ImportAddressError   | 7002 | 其他      | 导入地址失败                         |

