# 介绍

:::caution 注意

开放平台相关接口为限频接口，请注意频率限制。

:::

## 名词简介

* **SDK**: 本文中指代 `AnyWeb JS SDK`。
* **appid**: 从开放平台获取到的App的 `appid`。
* **secret**: 从开放平台获取到的App的 `secret`。
* **serviceToken**: 通过 `appid` 和 `secret` 换取的 `serviceToken`，用于调用开放平台接口。
* **unionid**: 标识每个用户的一组字符串 `id` ，每个开发者下的所有 DApp 获取到同一用户的 `unionid` 相同，但不同开发者获取的不同。

## 错误码

| 错误码      | 内容              |
|----------|-----------------|
| 1000     | 正常              | 
| A108P001 | serviceToken 错误 |
| A108P002 | appid 为空        |
| A108P003 | secret 为空       |
| A108P004 | secret 无效       |
| A108P005 | appid 无效        |
| A108P006 | 用户未授权           |
