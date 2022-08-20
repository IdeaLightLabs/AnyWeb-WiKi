# 获取 ServiceToken

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem';

## 基本介绍

ServiceToken 是开放平台相关接口的调用凭证。

## 具体过程

:::caution 注意

请使用 json 格式提交请求。

:::

### 获取 ServiceToken

在[开放平台](https://open.anyweb.cc)注册并登录账号后，创建完成应用后，可以获取到 `appid` 和 `secret` 两个字段。

#### 请求信息

| 标题  | 内容                                         |
|-----|--------------------------------------------|
| 地址  | https://api.anyweb.cc/service/serviceToken |
| 方法  | POST                                       |

#### 具体参数内容

| 参数名    | 类型     | 备注                            |
|--------|--------|-------------------------------|
| appid  | String | 从 open.anyweb.cc 拿到的 `appid`  |
| secret | String | 从 open.anyweb.cc 拿到的 `secret` |

#### 返回值

| 参数名          | 类型     | 备注                  |
|--------------|--------|---------------------|
| serviceToken | String | 换取到的 `serviceToken` |
| expiresIn    | Number | `serviceToken` 有效时间 |

```json
{
  "code": 1000,
  "message": "success",
  "data": {
    "serviceToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXQtYWI0OS03M2QxZDg5OTA5OTkiLCJkZXZlbG9wZXJJZCI6MzIsImlhdCI6MTY0XXXXXXXXXXXXXXXXXXXXXXXXXXX.4--P506OLFFZ-8YN9i1FnjdtmdHMHEsHn_E_XXXXXX",
    "expiresIn": 7200
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
    'url': 'https://api.anyweb.cc/service/serviceToken',
    formData: {
        'appid': '从open.anyweb.cc拿到的appid',
        'secret': '从open.anyweb.cc拿到的secret'
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

response = requests.request("POST", "https://api.anyweb.cc/service/serviceToken", data={
    'appid': '从open.anyweb.cc拿到的appid',
    'secret': '从open.anyweb.cc拿到的secret'
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
                .build();
        Request request = new Request.Builder()
                .url("https://api.anyweb.cc/service/serviceToken")
                .method("POST", body)
                .build();
        Response response = client.newCall(request).execute();
        System.out.println(response.body().string());
    }
}

```

</TabItem>
</Tabs>
