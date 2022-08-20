# 用户信息获取

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem';

## 基本介绍

### 获取信息过程

开发者获取用户相关信息时，需要以下步骤：

1. 获取 `accessToken`
2. 通过 `accessToken` 和 `unionid` 获取具体用户信息

## 具体过程

:::caution 注意

请使用 json 格式提交请求。

:::

### 获取 Access Token

见[获取 Access Token](https://wiki.anyweb.cc/docs/OAuth/accessToken)

### 获取用户信息

后端拿到 `accessToken` 后，再请求获取用户信息接口即可获取到用户具体信息。

#### 请求信息

| 标题   | 内容                                   |
|------|--------------------------------------|
| 地址   | https://api.anyweb.cc/oauth/userInfo |
| 方法   | POST                                 |

#### 请求参数

| 参数名         | 类型             | 是否必填 | 备注                                   |
|-------------|----------------|------|--------------------------------------|
| appid       | String         | 是    | 从 open.anyweb.cc 拿到的 `appid`         |
| secret      | String         | 是    | 从 open.anyweb.cc 拿到的 `secret`        |
| accessToken | String         | 是    | `accessToken`                        |
| unionid     | String         | 是    | `unionid`                            |
| scopes      | Array<String\> | 否    | 请求的数据范围，默认不填写或填写错误时，该字段为开放平台申请的全部权限。 |

#### 返回值

AnyWeb 可以在通过用户授权后获取到用户的相关信息，具体的的返回内容由用户授予 DApp 的权限决定和本请求的 `scopes` 参数共同决定。

本接口的返回信息根据请求参数 `scopes` 决定：

- 包含 `baseInfo` 时，返回字段将包含用户的基本信息（手机号和基本认证情况等）：
  - `unionid` String 每个用户在开发者账户下的唯一标识
  - `addressList` String[] 用户授予的地址列表
  - `network` Number 用户授予的网络ID
  - `scopes` String[] 用户授予的权限列表
  - `phone` String 用户的登录手机号
  - `level` Number 用户实名等级
    - 0: 手机号认证
    - 1: 身份证认证

- 包含 `identity` 时，返回字段将包含用户的实名身份信息：
  - `name` String 用户真实姓名(当 `level` 为 1 时才会出现该字段)
  - `idNumber` String 用户身份证号(当 `level` 为 1 时才会出现该字段)

:::caution 注意

1、请求参数中 `scopes` 如果为空则默认请求该 `accessToken` 所包含的所有权限。

2、`baseInfo` 为必须申请的权限，如果 `scopes` 不包含 `baseInfo` 会抛出错误。

3、本请求的 `scopes` 范围应当被包含在 `cfx_accounts` 传递的 `scopes` 范围内（即 DApp 向用户所询问授予的权限内），否则将抛出越权错误。

:::

请求参数为：

```json
{
  "appid": "693b6401-135a-4dc3-846b-1c05ad2572f6",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiYWNjZXNzVG9rZW4iLCJpZCI6IjgzYzI2ZmU5LTdiNDgtNDQwMC1iZmQwLTIyNDc4OGU0ZTg1OCIsImFwcGlkIjoiNjkzYjY0MDEtMTM1YS00ZGMzLTg0NmItMWMwNWFkMjU3MmY2IiwiaXNSZWZyZXNoIjpmYWxzZSwiaWF0IjoxNjU2OTA1OTkxLCJleHAiOjE2NTY5MTMxOTF9.JUtnZSAiIAfuTuQq-1234_mbOJNQm_4RHsVaFoHmxz4",
  "unionid": "83c26fe9-7b48-4400-bfd0-224788e4e858",
  "secret": "713a7947-5a46-4a3b-9232-123456789012",
  "scopes": [
    "baseInfo"
  ]
}
```

返回值为：

```json
{
  "code": 1000,
  "message": "success",
  "data": {
    "unionid": "83c26fe9-7b48-4400-bfd0-224788e4e858",
    "addressList": [
      "cfxtest:aak6a2u06b2ww0v67xdej48rggvadfem0ecnzgapz4"
    ],
    "network": 1,
    "scopes": [
      "baseInfo",
      "identity"
    ],
    "level": 0,
    "phone": "12345678901"
  }
}
```

请求参数为：

```json
{
  "appid": "693b6401-135a-4dc3-846b-1c05ad2572f6",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiYWNjZXNzVG9rZW4iLCJpZCI6IjgzYzI2ZmU5LTdiNDgtNDQwMC1iZmQwLTIyNDc4OGU0ZTg1OCIsImFwcGlkIjoiNjkzYjY0MDEtMTM1YS00ZGMzLTg0NmItMWMwNWFkMjU3MmY2IiwiaXNSZWZyZXNoIjpmYWxzZSwiaWF0IjoxNjU2OTA1OTkxLCJleHAiOjE2NTY5MTMxOTF9.JUtnZSAiIAfuTuQq-1234_mbOJNQm_4RHsVaFoHmxz4",
  "unionid": "83c26fe9-7b48-4400-bfd0-224788e4e858",
  "secret": "713a7947-5a46-4a3b-9232-123456789012",
  "scopes": [
    "baseInfo",
    "identity"
  ]
}
```

`level` 为 1 时 返回值为：

```json
{
  "code": 1000,
  "message": "success",
  "data": {
    "unionid": "83c26fe9-7b48-4400-bfd0-224788e4e858",
    "addressList": [
      "cfxtest:aak6a2u06b2ww0v67xdej48rggvadfem0ecnzgapz4"
    ],
    "network": 1,
    "scopes": [
      "baseInfo",
      "identity"
    ],
    "level": 1,
    "phone": "12345678901",
    "idNumber": "XXXXXXXXXXXXXXXXXX",
    "name": "XXX"
  }
}
```

`level` 为 0 时

```json
{
  "code": 1000,
  "message": "success",
  "data": {
    "unionid": "83c26fe9-7b48-4400-bfd0-224788e4e858",
    "addressList": [
      "cfxtest:aak6a2u06b2ww0v67xdej48rggvadfem0ecnzgapz4"
    ],
    "network": 1,
    "scopes": [
      "baseInfo",
      "identity"
    ],
    "level": 0,
    "phone": "12345678901"
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
  'url': 'https://api.anyweb.cc/oauth/userInfo',
  formData: {
    'appid': '从open.anyweb.cc拿到的appid',
    'secret': '从open.anyweb.cc拿到的secret',
    'accessToken': 'accessToken',
    'unionid': 'unionid'
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

response = requests.request("POST", "https://api.anyweb.cc/oauth/userInfo", data={
  'appid': '从open.anyweb.cc拿到的appid',
  'secret': '从open.anyweb.cc拿到的secret',
  'accessToken': 'accessToken',
  'unionid': 'unionid'
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
            .addFormDataPart("secret", "从open.anyweb.cc拿到的secret")
            .addFormDataPart("accessToken", "accessToken")
            .addFormDataPart("unionid", "unionid")
            .build();
    Request request = new Request.Builder()
            .url("https://api.anyweb.cc/oauth/userInfo")
            .method("POST", body)
            .build();
    Response response = client.newCall(request).execute();
    System.out.println(response.body().string());
  }
}

```

</TabItem>
</Tabs>


