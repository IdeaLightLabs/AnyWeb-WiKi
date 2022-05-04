# 获取 AccessToken

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem';

## 基本介绍

AccessToken 是用户授权后的凭证，用于调用其他 OAuth API。

## 具体过程

### 获取授权

> 注意：下述为 Conflux 链例子，其他链同理。

通过调用 SDK 中的 `cfx_accounts` 方法来获取到用户的授权，并取得 `code` 用于后续步骤换取 `accessToken`。

```javascript
provider.request({
  method: 'cfx_accounts',
  params: [{
    availableNetwork: [1, 1029],
    scopes: ['baseInfo', 'identity'],
  }]
}).then((result) => {
  const {address, code, scopes} = result
  console.log("用户地址", address, "OAuth Code", code, "Scope", scopes)
}).catch((e) => {
  console.error('调用失败', e)
})
```

### 获取 OAuth AccessToken

DApp 拿到了 `code` 后，后端需要自行通过 POST 请求指定接口换取 `accessToken`。

#### 请求信息

| 标题   | 内容                                      |
|------|-----------------------------------------|
| 地址   | https://api.anyweb.cc/oauth/accessToken |
| 方法   | POST                                    |

#### 具体参数内容

| 参数名    | 类型     | 备注                            |
|--------|--------|-------------------------------|
| appid  | String | 从 open.anyweb.cc 拿到的 `appid`  |
| secret | String | 从 open.anyweb.cc 拿到的 `secret` |
| code   | String | 上一步获取的 `code`                 |

#### 返回值

| 参数名          | 类型     | 备注                                                                       |
|--------------|--------|--------------------------------------------------------------------------|
| unionid      | String | 用户的 `unionid`                                                            |
| accessToken  | String | 换取到的 `accessToken`                                                       |
| expiresIn    | Number | `accessToken` 有效时间                                                       |
| refreshToken | Number | 用于更新 `accessToken` 的 `refreshToken`                                      |
| expiresIn    | Number | `refreshToken` 过期时间戳                                                     |
| scope        | String | `accessToken` 的[权限列表](https://wiki.anyweb.cc/docs/usage#conflux) , `,`隔开 |

```json
{
  "code": 1000,
  "message": "success",
  "data": {
    "unionid": "fdf3db80-xxxx-xxxx-xxxx-e1060de07d80",
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX1hZjMyLWUxMDYwZGUwN2Q4MCIsImFwcGlkIjoiMWQxNDdjMDctNjM5Zi00YWI0LWFiNDktNzNkMWQ4OTkwOTk5IiwiaXNSZWZyZXNoIjpmYWxzZSwiaWF0IjoxNjXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.zKKYZcNTZ-PMSW6OgpIomai5IU1ehDYgxDw90RU8rRs",
    "expiresIn": 7200,
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXQtYWYzMi1lMTA2MGRlMDdkODAiLCJhcHBpZCI6IjFkMTQ3YzA3LTYzOWYtNGFiNC1hYjQ5LTczZDFkODk5MDk5OSIsImlzUmVmcmVzaCI6dHJ1ZSwiaWF0IjoxNjXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.fHm7xf9CWAXbN3rlJ83ExAC1aW9kmK-N6FyvyqcYumA",
    "refreshExpiresIn": 2592000,
    "scope": "baseInfo,identity"
  }
}
```

#### 权限说明

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

### 刷新 OAuth AccessToken

后端换取到 `accessToken` 后，由于 `accessToken` 有效期只有两个小时所以需要使用 `refreshToken` 自行刷新 `accessToken`。

#### 请求信息

| 标题   | 内容                                      |
|------|-----------------------------------------|
| 地址   | https://api.anyweb.cc/open/refreshToken |
| 方法   | POST                                    |

#### 具体参数内容

| 参数名          | 类型     | 备注                                   |
|--------------|--------|--------------------------------------|
| refreshToken | String | 获取 `accessToken` 时返回的 `refreshToken` |

#### 返回值

| 参数名          | 类型     | 备注                                  |
|--------------|--------|-------------------------------------|
| token        | String | 换取到的 `accessToken`                  |
| expire       | Number | `accessToken` 有效时间                  |
| refreshToken | Number | 用于更新 `accessToken` 的 `refreshToken` |
| expiresIn    | Number | `refreshToken` 过期时间戳                |

```json
{
  "code": 1000,
  "message": "success",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX1hZjMyLWUxMDYwZGUwN2Q4MCIsImFwcGlkIjoiMWQxNDdjMDctNjM5Zi00YWI0LWFiNDktNzNkMWQ4OTkwOTk5IiwiaXNSZWZyZXNoIjpmYWxzZSwiaWF0IjoxNjXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.zKKYZcNTZ-PMSW6OgpIomai5IU1ehDYgxDw90RU8rRs",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXQtYWYzMi1lMTA2MGRlMDdkODAiLCJhcHBpZCI6IjFkMTQ3YzA3LTYzOWYtNGFiNC1hYjQ5LTczZDFkODk5MDk5OSIsImlzUmVmcmVzaCI6dHJ1ZSwiaWF0IjoxNjXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.fHm7xf9CWAXbN3rlJ83ExAC1aW9kmK-N6FyvyqcYumA",
    "refreshExpiresIn": 2592000
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
  'url': 'https://api.anyweb.cc/open/refreshToken',
  formData: {
    'refreshToken': '获取 accessToken 时返回的 refreshToken'
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

response = requests.request("POST", "https://api.anyweb.cc/oauth/refreshToken", data={
    'refreshToken': '获取 accessToken 时返回的 refreshToken'
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
                .addFormDataPart("refreshToken", "获取 accessToken 时返回的 refreshToken")
                .build();
        Request request = new Request.Builder()
                .url("https://api.anyweb.cc/oauth/refreshToken")
                .method("POST", body)
                .build();
        Response response = client.newCall(request).execute();
        System.out.println(response.body().string());
    }
}

```

</TabItem>
</Tabs>

