# 用户地址检查

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem';

## 基本介绍

检查账户地址是否属于该用户。

## 具体过程

### 获取 ServiceToken

见[获取 ServiceToken](https://wiki.anyweb.cc/docs/Open/ServiceToken)

### 检查用户地址

后端拿到 `serviceToken` 后，再请求检查用户地址。

#### 请求信息

| 标题   | 内容                                      |
|------|-----------------------------------------|
| 地址   | https://api.anyweb.cc/open/checkAddress |
| 方法   | POST                                    |
| 频率限制 | 每天 **5000000** 次                        |

#### 具体参数内容

| 参数名          | 类型     | 备注                            |
|--------------|--------|-------------------------------|
| serviceToken | String | `serviceToken`                |
| unionid      | String | `unionid`                     |
| address      | String | 地址                            |

#### 返回值

| 参数名 | 类型   | 备注        |
|-----|------|-----------|
| res | Bool | 地址是否属于该账户 |

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
    'url': 'https://api.anyweb.cc/open/checkAddress',
    formData: {
        'serviceToken': 'serviceToken',
        'unionid': 'unionid',
        'address': 'cfx:xxxxxx',
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

response = requests.request("POST", "https://api.anyweb.cc/open/checkAddress", data={
    'serviceToken': 'serviceToken',
    'unionid': 'unionid',
    'address': 'cfx:xxxxxx'
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
                .addFormDataPart("address", "cfx:xxxxxx")
                .build();
        Request request = new Request.Builder()
                .url("https://api.anyweb.cc/open/checkAddress")
                .method("POST", body)
                .build();
        Response response = client.newCall(request).execute();
        System.out.println(response.body().string());
    }
}

```

</TabItem>
</Tabs>


