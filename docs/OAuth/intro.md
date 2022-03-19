# 介绍

:::caution 注意

OAuth 相关接口为限频接口，请自行对 `AccessToken` 等信息进行缓存。

:::

## 名词简介

* **SDK**: 本文中指代 `AnyWeb JS SDK`。
* **OAuth**: OAuth（开放授权）是一个开放标准，允许用户让第三方应用访问该用户在某网站上存储的私密的资源（如本例中的个人信息），而无需将用户名和密码提供给第三方应用。
* **OAuth Code:** 简称 `code` ，是 SDK 返回给 DApp 前端的一个字符串，用于换取 `accessToken` ，为一次性的，请注意尽快换取**有效期较长**的 `accessToken`。
* **OAuth AccessToken**: 简称 `accessToken` ，是 DApp 自身后端服务器通过 `code` 换取的用于获取用户信息的令牌，有效期 2 小时，需要开发者自行进行缓存。
* **unionid**: 标识每个用户的一组字符串 `id` ，每个开发者下的所有 DApp 获取到同一用户的 `unionid` 相同，但不同开发者获取的不同。

## 错误码

| 错误码 | 内容 |
| ---- | ---- |
| 1000 | 正常| 
|A107P001 | accessToken 为空
|A107P002 | appid 为空
| A107P003 | unionid 为空
| A107P004 | accessToken 无效
| A107P005 | appid 无效
|A107P006 | unionid 无效
|A107P007| code 无效
|A107P008|应用开发者不存在
|A107P009|未查询到用户的授权
|A107P010|用户不存在

