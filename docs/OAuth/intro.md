# 介绍

:::caution 注意

OAuth 相关接口为限频接口，请自行对 `AccessToken` 等信息进行缓存。

:::

## 基本介绍

### 名词简介

* **SDK**: 本文中指代 `AnyWeb JS SDK`。
* **OAuth**: OAuth（开放授权）是一个开放标准，允许用户让第三方应用访问该用户在某网站上存储的私密的资源（如本例中的个人信息），而无需将用户名和密码提供给第三方应用。
* **OAuth Code:** 简称 `code` ，是 SDK 返回给 DApp 前端的一个字符串，用于换取 `accessToken` ，为一次性的，请注意尽快换取**有效期较长**的 `accessToken`。
* **OAuth AccessToken**: 简称 `accessToken` ，是 DApp 自身后端服务器通过 `code` 换取的用于获取用户信息的令牌，有效期 2 小时，需要开发者自行进行缓存。
* **unionid**: 标识每个用户的一组字符串 `id` ，每个开发者下的所有 DApp 获取到同一用户的 `unionid` 相同，但不同开发者获取的不同。

## 具体过程

### 获取用户授权

> 注意：下述为 Conflux 链例子，其他链同理。

通过调用 SDK 中的 `cfx_accounts` 方法来获取到用户的授权:

```javascript
provider.request({
    method: 'cfx_accounts',
}).then((result) => {
    console.log('账户地址列表', result)
}).catch((e) => {
    console.error('调用失败', e)
})
```

### 获取 OAuth Code

:::info 提示

**在获取到用户授权后**才能调用 `anyweb_oauth` 来获取 `code`:

:::

```javascript
/**
 * 获取 OAuth Code
 * @return {string} 状态 'ok'
 */
provider.request({
    method: 'anyweb_oauth',
}).then((result) => {
    console.log('OAuth Code', result)
}).catch((e) => {
    console.error('获取失败', e)
})
```

### 获取 OAuth AccessToken

DApp 拿到了 `code` 后，后端需要自行通过 POST 请求指定接口换取 `accessToken`。

#### 请求信息

|  标题   | 内容  |
|  ----  | ----  |
| 地址  | https://api.anyweb.cc/oauth/accessToken |
| 方法  | POST |
| 频率限制  | 每天 **2000** 次 |

#### 具体参数内容

|  参数名   | 类型  | 备注
|  ----  | ----  | ---- 
| appid  | String | 从 open.anyweb.cc 拿到的 `appid`
| code  | String | 上一步获取的 `code`

#### 返回值

|  参数名   | 类型  | 备注
|  ----  | ----  | ---- 
| unionid  | String | 用户的 `unionid`
| accessToken  | String | 换取到的 `accessToken`
| expiresIn  | Number | `accessToken` 过期时间戳

```json
{
  "code": 1000,
  "message": "success",
  "data": {
    "unionid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxx",
    "accessToken": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxx",
    "expiresIn": 1647686326
  }
}
```

#### 请求示例

<Tabs>
<TabItem value="js" label="Node">

```javascript
const request = require('request');
const options = {
    'method': 'POST',
    'url': 'https://api.anyweb.cc/oauth/accessToken',
    formData: {
        'appid': '从open.anyweb.cc拿到的appid',
        'code': '上一步获取的code'
    }
};
request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
});
```

</TabItem>
<TabItem value="py" label="Python">

```py
import requests

response = requests.request("POST", "https://api.anyweb.cc/oauth/accessToken", data={
    'appid': '从open.anyweb.cc拿到的appid',
    'code': '上一步获取的code'
})
print(response.text)
```

</TabItem>
<TabItem value="java" label="Java">

```java
import java.io.*;

import okhttp3.*;

public class main {
    public static void main(String[] args) throws IOException {
        OkHttpClient client = new OkHttpClient().newBuilder()
                .build();
        MediaType mediaType = MediaType.parse("text/plain");
        RequestBody body = new MultipartBody.Builder().setType(MultipartBody.FORM)
                .addFormDataPart("appid", "从open.anyweb.cc拿到的appid")
                .addFormDataPart("code", "上一步获取的code")
                .build();
        Request request = new Request.Builder()
                .url("https://api.anyweb.cc/oauth/accessToken")
                .method("POST", body)
                .build();
        Response response = client.newCall(request).execute();
        System.out.println(response.body().string());
    }
}

```

</TabItem>
</Tabs>

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

