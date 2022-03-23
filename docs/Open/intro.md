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

| 错误码      | 内容             |
|----------|----------------|
| 1000     | 正常             | 
| A107P001 | accessToken 为空 |
| A107P002 | appid 为空       |
| A107P003 | unionid 为空     |
| A107P004 | secret 为空      |
| A107P005 | secret 无效      |
| A107P006 | accessToken 无效 |
| A107P007 | appid 无效       |
| A107P008 | unionid 无效     |
| A107P009 | code 无效        |
| A107P010 | 应用开发者不存在       |
| A107P011 | 用户未授权          |
| A107P012 | 用户不存在          |

