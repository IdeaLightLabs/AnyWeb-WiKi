# 用户信息获取

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem';

## 基本介绍

### 获取信息过程

开发者获取用户相关信息时，需要以下步骤：

1. 获取 `serviceToken`
2. 通过 `serviceToken` 和 `unionid` 获取具体用户信息

### 信息分级

AnyWeb 可以在通过用户授权后获取到用户的相关信息，具体的用户信息分为三个等级：

1. 用户手机号和其他基础信息
2. 用户实名认证信息
3. 用户活体认证信息

## 具体过程

### 获取 ServiceToken

见[获取 ServiceToken](https://wiki.anyweb.cc/docs/Open/ServiceToken)

### 获取用户信息

:::caution 注意

目前只支持获取用户手机号等基本信息

:::

后端拿到 `ServiceToken` 后，再请求获取用户信息接口即可获取到用户具体信息。

#### 请求信息

| 标题   | 内容                                  |
|------|-------------------------------------|
| 地址   | https://api.anyweb.cc/open/userInfo |
| 方法   | POST                                |

#### 具体参数内容

| 参数名          | 类型     | 备注             |
|--------------|--------|----------------|
| serviceToken | String | `serviceToken` |
| unionid      | String | `unionid`      |

#### 返回值

| 参数名      | 类型     | 备注          |
|----------|--------|-------------|
| nickName | String | 用户昵称        |
| headImg  | String | 头像地址        |
| phone    | String | 手机号         |
| level    | Number | 获取到的信息等级    |
| unionid  | String | 用户的 unionid |

```json
{
  "code": 1000,
  "message": "success",
  "data": {
    "nickName": "xxx",
    "headImg": "https://anyweb.oss-cn-hangzhou.aliyuncs.com/header.jpg",
    "phone": "xxxxxxxxxxx",
    "level": 0,
    "unionid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxx"
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
    'url': 'https://api.anyweb.cc/open/userInfo',
    formData: {
        'serviceToken': 'serviceToken',
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

response = requests.request("POST", "https://api.anyweb.cc/open/userInfo", data={
    'serviceToken': 'serviceToken',
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
                .addFormDataPart("serviceToken", "serviceToken")
                .addFormDataPart("unionid", "unionid")
                .build();
        Request request = new Request.Builder()
                .url("https://api.anyweb.cc/open/userInfo")
                .method("POST", body)
                .build();
        Response response = client.newCall(request).execute();
        System.out.println(response.body().string());
    }
}

```

</TabItem>
</Tabs>


