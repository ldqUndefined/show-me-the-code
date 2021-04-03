# host、origin、refer的区别

## Host

Host指明了请求将要发送到的**域名和端口号**，如果没有包含端口号，会自动使用被请求服务的默认端口(80或443)

HTTP1.1请求报文中必须包含一个Host头

## Origin

origin用于指示请求来自于哪个站点，origin仅指示**服务器名称**，不包含任何路径信息。

该请求用于**CORS请求或者POST请求**

## Referer

Referer包含了当前请求的来源页面的地址。服务端一般用referer请求头识别访问来源。

一下两种情况不会发送Referer头：

- 当页面采用协议为本地"file"或"data"URI
- 当前请求页面采用非安全协议，而来源页面采用安全协议，即HTTPS向HTTP发请求时不带Referer头