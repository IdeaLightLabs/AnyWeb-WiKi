# 用户地址检查（新）

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem';

## 基本介绍

检查账户地址是否属于该用户。需要用户授予 [baseInfo](https://wiki.anyweb.cc/docs/usage#conflux) 权限。

## 具体过程

### 获取 ServiceToken

见[获取 ServiceToken](https://wiki.anyweb.cc/docs/service/ServiceToken)

### 检查用户地址

后端拿到 `serviceToken` 后，再请求检查用户地址。

#### 请求信息

| 标题   | 内容                                           |
|------|----------------------------------------------|
| 地址   | https://api.anyweb.cc/service/checkAddresses |
| 方法   | POST                                         |
| 频率限制 | 每天 **5000000** 次                             |

#### 具体参数内容

| 参数名          | 类型                         | 备注                                      |
|--------------|----------------------------|-----------------------------------------|
| serviceToken | String                     | `serviceToken`                          |
| group        | Record<unionid, address[]> | 键名为`unionid`,键值为这个`unionid`下需要检查账户的地址列表 |
```json
{
  "serviceToken": "{{serviceToken}}",
  "group": {
    "83c26fe9-7b48-4400-bfd0-224788e4e858": [
      "cfx:aarcpvtr86ub5f9dhxgvxhs12gupday18jgk5sdx77",
      "cfx:aarcpvtr86ub5f9dhxgvxhs12gupday18er7xbnh0v"
    ],
    "05658ea3-6727-4edd-b888-723bcf6168d3": [],
    "08f097cd-2955-494e-bb40-ccb3f45543ed": [
      "0x111cf7e96cc45505cfa35e01ecab3476e12afd38", // 请注意，0x地址实际是不合法的，只是为了演示错误的写法。地址请用cfx开头地址表示。
      "cfx:aarcpvtr86ub5f9dhxgvxhs12gupday18jgk5sdx77"
    ],
    "08f097cd-2955-494e-bb40-ccb3f455431": [
      "0x111cf7e96cc45505cfa35e01ecab3476e12afd38"
    ]
  }
}
```
#### 返回值

| 参数名  | 类型                       | 备注                        | 
|------|--------------------------|---------------------------| 
| data | Record<unionid, address[]>  | 返回键名为`unionid`，键值为无效的地址列表 |

```json
{
  "code": 1000,
  "message": "success",
  "data": {
    "83c26fe9-7b48-4400-bfd0-224788e4e858": [
      "cfx:aarcpvtr86ub5f9dhxgvxhs12gupday18jgk5sdx77"
    ],
    "08f097cd-2955-494e-bb40-ccb3f45543ed": [
      "0x111cf7e96cc45505cfa35e01ecab3476e12afd38",
      "cfx:aarcpvtr86ub5f9dhxgvxhs12gupday18jgk5sdx77"
    ],
    "08f097cd-2955-494e-bb40-ccb3f455431": [
      "0x111cf7e96cc45505cfa35e01ecab3476e12afd38"
    ]
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
  'url': 'https://api.anyweb.cc/service/checkAddresses',
  formData: {
    'serviceToken': 'serviceToken',
    'group': {},
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

response = requests.request("POST", "https://api.anyweb.cc/service/checkAddresses", data={
    'serviceToken': 'serviceToken',
    'group': {},
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
                .addFormDataPart("group", "{}")
                .build();
        Request request = new Request.Builder()
                .url("https://api.anyweb.cc/service/checkAddresses")
                .method("POST", body)
                .build();
        Response response = client.newCall(request).execute();
        System.out.println(response.body().string());
    }
}

```

</TabItem>
</Tabs>


