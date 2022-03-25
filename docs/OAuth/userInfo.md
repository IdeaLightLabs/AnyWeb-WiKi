# 用户信息获取

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem';

## 基本介绍

### 获取信息过程

开发者获取用户相关信息时，需要以下步骤：

1. 获取 `accessToken`
2. 通过 `accessToken` 和 `unionid` 获取具体用户信息

### 信息分级

AnyWeb 可以在通过用户授权后获取到用户的相关信息，具体的用户信息分为四个等级（返回值的 `level` 字段）：

- 0：用户基础信息，包含用户的基本信息，如：昵称、头像等（需要用户授予 [baseInfo](https://wiki.anyweb.cc/docs/usage#conflux) 权限）
- 1：用户手机号信息（返回值增加 `phone` 字段）（需要用户授予 [identity](https://wiki.anyweb.cc/docs/usage#conflux) 权限）
- 2：用户实名认证信息（暂未开放）（返回值增加 `name` 字段）
- 3：用户活体认证信息（暂未开放）

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

| 参数名         | 类型     | 备注                            |
|-------------|--------|-------------------------------|
| appid       | String | 从 open.anyweb.cc 拿到的 `appid`  |
| secret      | String | 从 open.anyweb.cc 拿到的 `secret` |
| accessToken | String | `accessToken`                 |
| unionid     | String | `unionid`                     |

#### 返回值

| 参数名      | 类型     | 备注                                                                                         |
|----------|--------|--------------------------------------------------------------------------------------------|
| nickName | String | 用户昵称                                                                                       |
| headImg  | String | 头像地址                                                                                       |
| level    | Number | 获取到的信息等级                                                                                   |
| unionid  | String | 用户的 unionid                                                                                |
| phone    | String | 手机号（需要 [identity](https://wiki.anyweb.cc/docs/usage#conflux) 权限）                           |
| name     | String | 用户的真实姓名（需要 [identity](https://wiki.anyweb.cc/docs/usage#conflux) 权限，并且用户的信息等级 `level` ≥ 2） |

```json
{
  "code": 1000,
  "message": "success",
  "data": {
    "nickName": "xxx",
    "headImg": "https://anyweb.oss-cn-hangzhou.aliyuncs.com/header.jpg",
    "level": 0,
    "unionid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxx",
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


