# csrf攻击和xss攻击的解决方案

## xss攻击解决方案

### 服务端

- 设置cookie:HttpOnly

  本质上不是预防XSS，而是防止cookie被读取

- 对要存入数据库的数据进行转义，防止`javascript:`和`script`等标签

- 使用CSP，本质上就是建立白名单，开发者告诉浏览器哪些外部资源可以执行和加载。

### 客户端

- 发送请求给后端前进行转义
- 在向后端请求到数据后需要输出到HTML上时进行转义。
- 避免直接从url等地方获取数据操作dom

## csrf攻击解决方案

- 同源检测。禁止外域对网站发起请求，使用使用`Origin Header`和`Referer Header`来标记来源域名，和当前不相同则不接收请求。通过设置`Referrer Policy`为same-origin，让同源连接和引用发送Referer，跨域则不懈怠Referer。
- sameSite cookie。通过cookie中的sameSite属性设置严格与否。
- CSRF Token。输出页面时带上csrf token，发请求时带上，后端校验是否合法。
- 双重cookie

