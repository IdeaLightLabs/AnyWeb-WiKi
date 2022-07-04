# 用户信息获取

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem';

## 基本介绍

### 获取信息过程

开发者获取用户相关信息时，需要以下步骤：

1. 获取 `accessToken`
2. 通过 `accessToken` 和 `unionid` 获取具体用户信息

## 具体过程

### 获取 Access Token

见[获取 Access Token](https://wiki.anyweb.cc/docs/OAuth/accessToken)

### 获取用户信息

后端拿到 `accessToken` 后，再请求获取用户信息接口即可获取到用户具体信息。

#### 请求信息

| 标题   | 内容                                   |
|------|--------------------------------------|
| 地址   | https://api.anyweb.cc/oauth/userInfo |
| 方法   | POST                                 |

#### 具体参数内容

| 参数名         | 类型             | 是否必填 | 备注                                                           |
|-------------|----------------|------|--------------------------------------------------------------|
| appid       | String         | 是    | 从 open.anyweb.cc 拿到的 `appid`                                 |
| secret      | String         | 是    | 从 open.anyweb.cc 拿到的 `secret`                                |
| accessToken | String         | 是    | `accessToken`                                                |
| unionid     | String         | 是    | `unionid`                                                    |
| scopes      | Array<String\> | 否    | 请求的数据范围，默认开放平台申请的全部权限。若该次请求只想获得baseInfo数据,只需填写`['baseInfo']` |

#### 返回值

| 参数名         | 类型       | 备注          |
|-------------|----------|-------------|
| scopes      | String[] | 用户的权限列表     |
| unionid     | String   | 用户的 unionid |
| addressList | String[] | 用户的地址列表     |
| network     | Number   | 用户的网络ID     |
| phone       | String   | 手机号         |
| level       | Number   | 获取到的信息等级    |
| name        | String   | 用户真实姓名      |
| idNumber    | String   | 用户身份证号      |

##### 信息权限分级

AnyWeb 可以在通过用户授权后获取到用户的相关信息，具体的的返回内容由用户授予 DApp 的权限决定。

一定返回的有以下字段：
- `unionid` String 每个用户在开发者账户下的唯一标识
- `addressList` String[] 用户授予的地址列表
- `network` Number 用户授予的网络ID
- `scopes` String[] 用户授予的权限列表

在 `scopes` 字段中，当含有：

- `baseInfo` 时：意为用户愿意授予基本信息，若此时请求的参数`scopes`包含`baseInfo`，则返回值增加以下字段：
  - `phone` Number 用户手机号
- `identity` 时：意为用户愿意授予身份信息，若此时请求的参数`scopes`包含`identity`，则返回值增加以下字段：
  - `level` Number 用户实名等级
    - 0: 手机号认证
    - 1: 身份证认证
  - `name` String 用户真实姓名(当 `level` 为 1 时才会出现该字段)
  - `idNumber` String 用户身份证号(当 `level` 为 1 时才会出现该字段)

请求为：
```json
{
  "appid": "693b6401-135a-4dc3-846b-1c05ad2572f6",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiYWNjZXNzVG9rZW4iLCJpZCI6IjgzYzI2ZmU5LTdiNDgtNDQwMC1iZmQwLTIyNDc4OGU0ZTg1OCIsImFwcGlkIjoiNjkzYjY0MDEtMTM1YS00ZGMzLTg0NmItMWMwNWFkMjU3MmY2IiwiaXNSZWZyZXNoIjpmYWxzZSwiaWF0IjoxNjU2OTA1OTkxLCJleHAiOjE2NTY5MTMxOTF9.JUtnZSAiIAfuTuQq-1234_mbOJNQm_4RHsVaFoHmxz4",
  "unionid": "83c26fe9-7b48-4400-bfd0-224788e4e858",
  "secret": "713a7947-5a46-4a3b-9232-123456789012",
  "scopes": ["baseInfo"]
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
    "phone": "12345678901"
  }
}
```

请求为：
```json
{
  "appid": "693b6401-135a-4dc3-846b-1c05ad2572f6",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiYWNjZXNzVG9rZW4iLCJpZCI6IjgzYzI2ZmU5LTdiNDgtNDQwMC1iZmQwLTIyNDc4OGU0ZTg1OCIsImFwcGlkIjoiNjkzYjY0MDEtMTM1YS00ZGMzLTg0NmItMWMwNWFkMjU3MmY2IiwiaXNSZWZyZXNoIjpmYWxzZSwiaWF0IjoxNjU2OTA1OTkxLCJleHAiOjE2NTY5MTMxOTF9.JUtnZSAiIAfuTuQq-1234_mbOJNQm_4RHsVaFoHmxz4",
  "unionid": "83c26fe9-7b48-4400-bfd0-224788e4e858",
  "secret": "713a7947-5a46-4a3b-9232-123456789012",
  "scopes": ["identity"]
}
```
`level` 为 1 时
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
    "level": 1,
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
  }
}
```

请求为：
```json
{
  "appid": "693b6401-135a-4dc3-846b-1c05ad2572f6",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiYWNjZXNzVG9rZW4iLCJpZCI6IjgzYzI2ZmU5LTdiNDgtNDQwMC1iZmQwLTIyNDc4OGU0ZTg1OCIsImFwcGlkIjoiNjkzYjY0MDEtMTM1YS00ZGMzLTg0NmItMWMwNWFkMjU3MmY2IiwiaXNSZWZyZXNoIjpmYWxzZSwiaWF0IjoxNjU2OTA1OTkxLCJleHAiOjE2NTY5MTMxOTF9.JUtnZSAiIAfuTuQq-1234_mbOJNQm_4RHsVaFoHmxz4",
  "unionid": "83c26fe9-7b48-4400-bfd0-224788e4e858",
  "secret": "713a7947-5a46-4a3b-9232-123456789012",
  "scopes": ["baseInfo","identity"]
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
    "phone": "12345678901",
    "level": 1,
    "idNumber": "XXXXXXXXXXXXXXXXXX",
    "name": "XXX"
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


