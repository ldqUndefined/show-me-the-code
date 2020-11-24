# http方法

## CONNECT

CONNECT方法可以开启一个客户端与所请求资源之间的双向沟通的通道。它可以用来创建隧道（tunnel）。

例如，CONNECT 可以用来访问采用了 SSL (HTTPS)  协议的站点。客户端要求代理服务器将 TCP 连接作为通往目的主机隧道。之后该服务器会代替客户端与目的主机建立连接。连接建立好之后，代理服务器会面向客户端发送或接收 TCP 消息流。

CONNECT 是一个应用范围为点到点的方法。

## DELETE

用于删除指定的资源

## GET

用于获取数据

## HEAD

请求资源的头部信息, 并且这些头部与 HTTP GET 方法请求时返回的一致. 该请求方法的一个使用场景是在下载一个大文件前先获取其大小再决定是否要下载, 以此可以节约带宽资源.

`HEAD` 方法的响应不应包含响应正文. 即使包含了正文也必须忽略掉。

 虽然描述正文信息的 entity headers, 例如 Content-Length 可能会包含在响应中, 但它们并不是用来描述 HEAD 响应本身的, 而是用来描述同样情况下的 GET 请求应该返回的响应。

如果 HEAD 请求的结果显示在上一次 GET 请求后缓存的资源已经过期了, 即使没有发出GET请求，缓存也会失效

## OPTIONS

用于获取目的资源所支持的通信选项。客户端可以对特定的 URL 使用 OPTIONS 方法，也可以对整站（通过将 URL 设置为“*”）使用该方法。

响应报文包含一个 Allow 首部字段，该字段的值表明了服务器支持的所有 HTTP 方法。

在CORS中可以中OPTIONS方法发起一个预检请求，以检测实际请求是否可以被服务器所接受。

预检请求报文中的 Access-Control-Request-Method 首部字段告知服务器实际请求所使用的 HTTP 方法；Access-Control-Request-Headers 首部字段告知服务器实际请求所携带的自定义首部字段。服务器基于从预检请求获得的信息来判断，是否接受接下来的实际请求。

服务器所返回的 Access-Control-Allow-Methods 首部字段将所有允许的请求方法告知客户端。该首部字段与 Allow 类似，但只能用于涉及到 CORS 的场景中。

## PATCH

用于对资源进行部分修改。

在HTTP协议中， PUT 方法已经被用来表示对资源进行整体覆盖， 而 POST 方法则没有对标准的补丁格式的提供支持。不同于  PUT方法，而与 POST方法类似，PATCH  方法是非幂等的，这就意味着连续多个的相同请求会产生不同的效果

要判断一台服务器是否支持  PATCH方法，那么就看它是否将其添加到了响应首部 Allow 或者 Access-Control-Allow-Methods （在跨域访问的场合，CORS）的方法列表中 。

另外一个支持 PATCH 方法的隐含迹象是 Accept-Patch 首部的出现，这个首部明确了服务器端可以接受的补丁文件的格式。

## POST

请求主体的类型由 Content-Type 首部指定。

PUT 和POST方法的区别是,PUT方法是幂等的：连续调用一次或者多次的效果相同（无副作用）。连续调用同一个POST可能会带来额外的影响，比如多次提交订单。

- application/x-www-form-urlencoded: 数据被编码成以 '&' 分隔的键-值对, 同时以 '=' 分隔键和值. 非字母或数字的字符会被 percent-encoding: 这也就是为什么这种类型不支持二进制数据(应使用 multipart/form-data 代替).
- multipart/form-data
- text/plain

`application/x-www-form-urlencoded`

```html
POST / HTTP/1.1
Host: foo.com
Content-Type: application/x-www-form-urlencoded
Content-Length: 13

say=Hi&to=Mom
```

 `multipart/form-data`

```html
POST /test.html HTTP/1.1 
Host: example.org 
Content-Type: multipart/form-data;boundary="boundary" 

--boundary 
Content-Disposition: form-data; name="field1" 

value1 
--boundary 
Content-Disposition: form-data; name="field2"; filename="example.txt" 

value2
```

## PUT

使用请求中的负载创建或者替换目标资源。

PUT语义上是幂等的，调用一次和调用多次等价。

## TRACE

实现沿通向目标资源的路径的消息环回（loop-back）测试 ，提供了一种实用的 debug 机制。

请求的最终接收者应当原样反射（reflect）它接收到的消息，除了以下字段部分，作为一个Content-Type 为 message/http  的200（OK）响应的消息的主体（body）返回给客户端 。

最终接收者是指初始（origin）服务器，或者第一个接收到 Max-Forwards 值为 0的请求的服务器。



## GET与POST的区别

缓存方面：GET请求回被浏览器主动缓存下来，留下历史记录，POST不会

编码方面：GET只能进行URL编码，只能接受ASCII码，而POST的body没有限制

参数角度：GET参数一般放在URL中，因此不安全，POST放在请求体中，更适合传输敏感信息

幂等性角度：GET是幂等的，POST不是

GET会一次性发出报文，POST**有可能**两个报文，先发header，如果服务器响应100，然后继续发body。

GET在回退时是无害的，而POST会再次提交请求

GET的URL地址可以收藏为书签，POST不可以

GET请求在URL中传送的参数长度是有限的，而POST在body中的长度没有限制

**补充：**

GET也可以带body，post也可以在url上携带数据，get和post只是在http层面的语义。

POST有可能分为两个报文是因为使用HTTP时的约定，即所有的“控制类”信息都应该放在请求头中，于是服务器在处理请求头的时候总是会先完全解析全部的请求头，再根据控制类信息决定进一步怎么处理，是拒绝，还是根据content-type的类型调用对应的解析器处理数据。假设我们有一个上传文件的服务，请求url中包含了文件名，请求体中是二进制文件，服务器接收到请求后，就可以先拿到请求头中的信息，查看用户是否有权限上传，文件名是否符合规范，如果不符合，就不再处理请求体的数据了，直接丢弃，而不是等到整个请求都处理完了再拒绝。所以为了进一步优化类似的情况，客户端可以通过HTTP的Continued的协议来做，客户端总是先发送所有的请求头给服务端，让服务端校验，如果通过就返回100 continue，然后客户端再把剩下的数据发送给服务端，如果请求被拒绝了，就返回400之类的错误，交互就终止了，这样就可以避免浪费带宽传请求体的过程。但是代价是多一个RTT，有时候，如果刚好请求体的数据不多，那么一次性全部发给服务端反而更好。所以客户端可以做一些优化，比如设定POST的请求体如果超过多大的大小(比如1KB)时，就只发请求头，否则就一次性全发。所以POST的这种“分两个请求”的情况是视请求体和浏览器的实现而定的。



## URL的长度

常听到的“GET数据有长度限制“其实是指”URL的长度限制“。

HTTP协议本身对URL长度并没有做任何规定。实际的限制是由客户端/浏览器以及服务器端决定的。

不同浏览器和不同服务器对此的限制都不同：

**Chorme限制URL长度最大是8KB**

**nginx限制URL长度最大是4KB**











