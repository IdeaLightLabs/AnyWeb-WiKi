# 用户信息获取

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem';

## 基本介绍

### 获取信息过程

开发者获取用户相关信息时，需要以下步骤：

1. 获取 `accessToken`
2. 通过 `accessToken` 和 `unionid` 获取具体用户信息

### 信息权限分级

AnyWeb 可以在通过用户授权后获取到用户的相关信息，具体的的返回内容由用户授予 DApp 的权限决定，在返回值的 `scopes` 字段中，当含有字段：

- [baseInfo](https://wiki.anyweb.cc/docs/usage#conflux) 权限：可获得用户基本信息，包括：
  - `unionid` String 每个用户在开发者账户下的唯一标识
  - `addressList` String[] 用户授予的地址列表
  - `network` Number 用户授予的网络ID
- [identity](https://wiki.anyweb.cc/docs/usage#conflux) 权限：可获得用户身份信息，包括：
  - `phone` Number 用户手机号
  - `level` Number 用户实名等级
    - 0: 手机号认证
    - 1: 身份证认证
  - `name` String 用户真实姓名(当 `level` 为 1 时才会出现该字段)
  - `idNumber` String 用户身份证号(当 `level` 为 1 时才会出现该字段)

## 具体过程

### 获取 Access Token

见[获取 Access Token](https://wiki.anyweb.cc/docs/OAuth/accessToken)

### 获取用户信息

:::caution 注意

目前只支持获取用户手机号等基本信息

:::

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
| level       | Number   | 获取到的信息等级    |
| phone       | String   | 手机号         |
| name        | String   | 用户真实姓名      |
| idNumber    | String   | 用户身份证号      |

:::caution 注意

返回字段具体逻辑参考信息权限分级

:::

```json
{
  "code": 1000,
  "message": "success",
  "data": {
    "scopes": [
      "baseInfo",
      "identity"
    ],
    "unionid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxx",
    "addressList": [
      "cfx:xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      "cfx:xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    ],
    "availableNetwork": 1029,
    "level": 0,
    "phone": "xxxxxxxxxxx"
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


