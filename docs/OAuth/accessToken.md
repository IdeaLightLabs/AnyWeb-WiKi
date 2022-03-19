# 获取 AccessToken

## 基本介绍

AccessToken 是用户授权后的凭证，用于调用其他 OAuth API。

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
| secret  | String | 从 open.anyweb.cc 拿到的 `secret`

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
        'code': '上一步获取的code',
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

response = requests.request("POST", "https://api.anyweb.cc/oauth/accessToken", data={
    'appid': '从open.anyweb.cc拿到的appid',
    'code': '上一步获取的code',
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
                .addFormDataPart("code", "上一步获取的code")
                .addFormDataPart("secret", "从open.anyweb.cc拿到的secret")
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

