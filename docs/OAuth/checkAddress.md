# 用户地址检查

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem';

## 基本介绍

检查账户地址是否属于该用户。

## 具体过程

### 获取 Access Token

见[获取 Access Token](https://wiki.anyweb.cc/docs/OAuth/accessToken)

### 检查用户地址

后端拿到 `accessToken` 后，再请求检查用户地址。

#### 请求信息

|  标题   | 内容  |
|  ----  | ----  |
| 地址  | https://api.anyweb.cc/oauth/checkAddress |
| 方法  | POST |
| 频率限制  | 每天 **5000000** 次 |

#### 具体参数内容

|  参数名   | 类型  | 备注
|  ----  | ----  | ---- 
| appid  | String | 从 open.anyweb.cc 拿到的 `appid`
| accessToken  | String | 上一步获取的 `accessToken`
| unionid | String | 上一步获取的 `unionid`
| address | String | 地址
| secret  | String | 从 open.anyweb.cc 拿到的 `secret`

#### 返回值

|  参数名   | 类型  | 备注
|  ----  | ----  | ---- 
| res  | Bool | 地址是否属于改账户

```json
{
  "code": 1000,
  "message": "success",
  "data": {
    "res": true
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
    'url': 'https://api.anyweb.cc/oauth/checkAddress',
    formData: {
        'appid': '从open.anyweb.cc拿到的appid',
        'accessToken': '上一步获取的accessToken',
        'unionid': '上一步获取的unionid',
        'address': 'cfx:xxxxxx',
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

response = requests.request("POST", "https://api.anyweb.cc/oauth/checkAddress", data={
    'appid': '从open.anyweb.cc拿到的appid',
    'accessToken': '上一步获取的accessToken',
    'unionid': '上一步获取的unionid',
    'address': 'cfx:xxxxxx',
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
                .addFormDataPart("accessToken", "上一步获取的accessToken")
                .addFormDataPart("unionid", "上一步获取的unionid")
                .addFormDataPart("address", "cfx:xxxxxx")
                .addFormDataPart("secret", "从open.anyweb.cc拿到的secret")
                .build();
        Request request = new Request.Builder()
                .url("https://api.anyweb.cc/oauth/checkAddress")
                .method("POST", body)
                .build();
        Response response = client.newCall(request).execute();
        System.out.println(response.body().string());
    }
}

```

</TabItem>
</Tabs>


