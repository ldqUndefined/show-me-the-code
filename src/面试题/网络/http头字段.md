# HTTP头字段

## Accept

内容协商字段，用来告知（服务器）客户端可以处理的内容类型，这种内容类型用MIME类型来表示。服务端从accept备选项中选择一个并用content-type返回

```
Accept: <MIME_type>/<MIME_subtype>
Accept: <MIME_type>/*
Accept: */*
```

## Accept-Charset

内容协商字段，用来告知（服务器）客户端可以处理的字符集类型。服务端从accept-charset备选项中选择一个并用content-type返回。一般都是utf-8。**accept和accept-charset的返回都在content-type中**。

```
Accept-Charset: <charset>
```

## Accept-Encoding

内容协商字段，将客户端能够理解的内容编码方式——通常是某种压缩算法——进行通知（给服务端）。通过内容协商的方式，服务端会选择一个客户端提议的方式，使用并在响应头 Content-Encoding 中通知客户端该选择。

值一般为：`gzip/compress/deflate/br/identity`

## Accept-Language

内容协商字段，客户端声明它可以理解的自然语言，以及优先选择的区域方言。服务器可以从诸多备选项中选择一项进行应用， 并使用 Content-Language 应答头通知客户端它的选择。

## Accept-Ranges

服务器使用 HTTP 响应头 Accept-Ranges 标识自身支持范围请求(partial requests)。字段的具体值用于定义范围请求的单位。

当浏览器发现` Accept-Ranges `头时，可以尝试*继续*中断了的下载，而不是重新开始。

accept-ranges只有两个值

```
Accept-Ranges: bytes
Accept-Ranges: none
```

## Access-Control-Allow-Credentials 

<u>响应首部</u>Access-Control-Allow-Credentials 表示是否可以将对请求的响应暴露给页面。返回true则可以，其他值均不可以。

Credentials可以是 cookies, authorization headers 或 TLS client certificates。

当作为对预检请求的响应的一部分时，这能表示是否真正的请求可以使用credentials。注意简单的GET 请求没有预检，所以若一个对资源的请求带了credentials，如果这个响应头没有随资源返回，响应就会被浏览器忽视，不会返回到web内容。

Access-Control-Allow-Credentials 头 工作中与XMLHttpRequest.withCredentials 或Fetch API中的Request() 构造器中的credentials 选项结合使用。Credentials必须在前后端都被配置（即the Access-Control-Allow-Credentials header 和 XHR 或Fetch request中都要配置）才能使带credentials的CORS请求成功。

```
Access-Control-Allow-Credentials: true
```

## Access-Control-Allow-Headers

<u>响应首部</u> Access-Control-Allow-Headers用于预检请求中，列出了将会在正式请求的请求头中出现的首部信息。

## Access-Control-Allow-Methods

<u>响应首部</u> Access-Control-Allow-Methods 在对 （预检请求）的应答中明确了客户端所要访问的资源允许使用的方法或方法列表。

## Access-Control-Allow-Origin

<u>响应首部</u>Access-Control-Allow-Origin指定了该响应的资源是否被允许与给定的origin共享。

```
Access-Control-Allow-Origin: *
Access-Control-Allow-Origin: <origin>
```



## Access-Control-Expose-Headers

<u>响应首部</u> Access-Control-Expose-Headers 列出了哪些首部可以作为响应的一部分暴露给外部。

默认情况下，只有七种 simple response headers （简单响应首部）可以暴露给外部：

- Cache-Control
- Content-Language
- Content-Length
- Content-Type
- Expires
- Last-Modified
- Pragma

## Access-Control-Max-Age

<u>响应首部</u>Access-Control-Max-Age 这个响应头表示 preflight request  （预检请求）的返回结果（即 Access-Control-Allow-Methods 和Access-Control-Allow-Headers 提供的信息） 可以被缓存多久。

##  Access-Control-Request-Headers

<u>请求头</u> Access-Control-Request-Headers 出现于 preflight request （预检请求）中，用于通知服务器在真正的请求中会采用哪些请求头。

## Access-Control-Request-Method

<u>请求头</u>  Access-Control-Request-Method 出现于 preflight request （预检请求）中，用于通知服务器在真正的请求中会采用哪种  HTTP 方法。**因为预检请求所使用的方法总是 OPTIONS ，与实际请求所使用的方法不一样，所以这个请求头是必要的。**

```html
Access-Control-Request-Method: POST
```

## Age

**Age** 消息头里包含对象在缓存代理中存贮的时长，以秒为单位。

Age的值通常接近于0。表示此对象刚刚从原始服务器获取不久；其他的值则是表示代理服务器当前的系统时间与此应答中的通用头 Date 的值之差。

## Allow

**Allow** 首部字段用于枚举资源所支持的 HTTP 方法的集合。

若服务器返回状态码 405 Method Not Allowed，则该首部字段亦需要同时返回给客户端。如果 Allow  首部字段的值为空，说明资源不接受使用任何 HTTP 方法的请求。这是可能的，比如服务器需要临时禁止对资源的任何访问。

## Authorization

用于身份验证

## Cache-Control

用于在http请求和响应中，通过指定指令来实现缓存机制。缓存指令是单向的，这意味着在请求中设置的指令，不一定被包含在响应中。

强缓存头部，在http缓存部分有详细介绍。

## Clear-Site-Data

<u>响应首部</u>**Clear-Site-Data** 表示清除当前请求网站有关的浏览器数据（cookie，存储，缓存）。它让Web开发人员对浏览器本地存储的数据有更多控制能力。

`Clear-Site-Data`  可以接受一个或多个参数，如果想要清除所有类型的数据，可以使用通配符(`"*"`) 

```html
// 单个参数
Clear-Site-Data: "cache"

// 多个参数 (用逗号分隔)
Clear-Site-Data: "cache", "cookies"

// 通配
Clear-Site-Data: "*"
```

- “cache”

  表示服务端希望删除本URL原始响应的本地缓存数据（即 ：浏览器缓存）。根据浏览器的不同，可能还会清除预渲染页面，脚本缓存，WebGL着色器缓存或地址栏建议等内容。

- "cookies"

  表示服务端希望删除URL响应的所有cookie。 HTTP身份验证凭据也会被清除。会影响整个主域，包括子域。

- "storage"

  表示服务端希望删除URL原响应的所有DOM存储。这包括存储机制，如

  - localStorage (执行 `localStorage.clear`)
  - sessionStorage (执行 `sessionStorage.clear`)
  - IndexedDB (对每个库执行  IDBFactory.deleteDatabase)
  - 服务注册线程 (对每个服务之注册线程执行 ServiceWorkerRegistration.unregister)
  - AppCache
  - WebSQL 数据库
  - FileSystem API data
  - Plugin data (Flash via NPP_ClearSiteData)

- "executionContexts"

  表示服务端希望浏览器重新加载本请求(Location.reload)

- "*" (通配符)

  表示服务端希望清除原请求响应的所有类型的数据。如果在此头的未来版本中添加了更多数据类型，它们也将被涉及。

## Connection

决定当前的事务完成后，是否会关闭网络连接。如果该值是“keep-alive”，网络连接就是持久的，不会关闭，使得对同一个服务器的请求可以继续在该连接上完成。

除去逐跳首部，任何逐跳首部都要列出，这样才能让第一个代理知道必须处理他们且不转发这些头。

## Content-Disposition

content-disposition响应头指示恢复的内容该以什么形式展示，是以内联的形式（即网页或者页面的一部分），还是以附件的形式下载并保存到本地。

第一个参数或者是 `inline`（默认值，表示回复中的消息体会以页面的一部分或者整个页面的形式展示），或者是 `attachment`（意味着消息体应该被下载到本地；大多数浏览器会呈现一个“保存为”的对话框，将 `filename` 的值预填为下载后的文件名，假如它存在的话）。

用在multipart/form-data的请求体中的时候，用来表示每个表单部分的信息：

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
--boundary--
```

## Content-Encoding

**Content-Encoding** 是一个实体消息首部，用于对特定媒体类型的数据进行压缩。当这个首部出现的时候，它的值表示消息主体进行了何种方式的内容编码转换。这个消息首部用来告知客户端应该怎样解码才能获取在 `Content-Type` 中标示的媒体类型内容。

一般建议对数据尽可能地进行压缩，因此才有了这个消息首部的出现。不过对于特定类型的文件来说，比如jpeg图片文件，已经是进行过压缩的了。有时候再次进行额外的压缩无助于负载体积的减小，反而有可能会使其增大。

值有：gzip、compress、deflate、identity、br

## Content-Langage

说明返回内容的语言

## Content-Length

消息实体首部，知名发送给接收方的消息主题的大小，用十进制数字表示，说明这次消息是定长消息。

## Content-Location

Content-Location 首部指定的是要返回的数据的地址选项。最主要的用途是用来指定要访问的资源经过内容协商后的结果的URL。

Location指定的是一个重定向的请求目标，Content-Location可以理解为该请求响应相关的地址。



## Content-Range

响应首部 **Content-Range** 显示的是一个数据片段在整个文件中的位置。

```html
Content-Range: bytes 200-1000/67589 
```

## Content-Security-Policy

响应头部，允许站点管理者控制用户代理能够为指定的页面加载哪些资源。除了少数例外情况，设置的政策主要涉及指定服务器的源和脚本结束点。这将帮助防止跨站脚本攻击（Cross-Site Script）（XSS）

## Content-Type

实体头部用于指示资源的MIME类型

```
Content-Type: text/html; charset=utf-8
Content-Type: multipart/form-data; boundary=something
```

```
POST /foo HTTP/1.1
Content-Length: 68137
Content-Type: multipart/form-data; boundary=---------------------------974767299852498929531610575

---------------------------974767299852498929531610575
Content-Disposition: form-data; name="description" 

some text
---------------------------974767299852498929531610575
Content-Disposition: form-data; name="myFile"; filename="foo.txt" 
Content-Type: text/plain 

(content of the uploaded file foo.txt)
---------------------------974767299852498929531610575
```

## Cookie

请求首部，里面呆着由服务器通过Set-Cookie首部返回并存储到客户端的cookie

```
Cookie: name=value; name2=value2; name3=value3
```

## Date

**Date** 是一个通用首部，其中包含了报文创建的日期和时间。

## Etag

是资源的特定版本的标识符。这可以让缓存更高效，并节省带宽，因为如果内容没有改变，Web服务器不需要发送完整的响应。而如果内容发生了变化，使用ETag有助于防止资源的同时更新相互覆盖（“空中碰撞”）。

如果给定URL中的资源更改，则一定要生成新的Etag值。 因此Etags类似于指纹，也可能被某些服务器用于跟踪。 比较etags能快速确定此资源是否变化，但也可能被跟踪服务器永久存留。

加个W/开头是弱ETag

## Expect

**Expect** 是一个请求消息头，包含一个期望条件，表示服务器只有在满足此期望条件的情况下才能妥善地处理请求。

规范中只规定了一个期望条件，即 `Expect: 100-continue`, 对此服务器可以做出如下回应：

- 100 如果消息头中的期望条件可以得到满足，使得请求可以顺利进行的话，
- 417 (Expectation Failed) 如果服务器不能满足期望条件的话；也可以是其他任意表示客户端错误的状态码（4xx）。

## Expires

响应头包含日期/时间， 即在此时候之后，响应过期。

无效的日期，比如 0, 代表着过去的日期，即该资源已经过期。

如果在Cache-Control响应头设置了 "max-age" 或者 "s-max-age" 指令，那么 Expires 头会被忽略。

## Forwarded

**Forwarded** 首部中包含了代理服务器的客户端的信息，即由于代理服务器在请求路径中的介入而被修改或丢失的信息。

## From

包含一个电子邮箱地址，这个地址属于发送请求的用户代理的实际掌控者。

## Host

**Host** 请求头指明了请求将要发送到的服务器主机名和端口号。

所有HTTP/1.1 请求报文中必须包含一个`Host`头字段。

## If-modified-Since

条件请求，服务器只在所请求的资源在给定的日期时间之后对内容进行过修改的情况下才会将资源返回，状态码为 200  。如果请求的资源从那时起未经修改，那么返回一个不带有消息主体的  304  响应，而在 Last-Modified 首部中会带有上次修改时间，只可以用在GET或者HEAD中。和If-None-Match一起出现时，它会被忽略。

## If-None-Match

条件请求，对于 GETGET 和 HEAD 请求方法来说，当且仅当服务器上没有任何资源的 ETag 属性值与这个首部中列出的相匹配的时候，服务器端会才返回所请求的资源，响应码为  200  。对于其他方法来说，当且仅当最终确认没有已存在的资源的  ETag 属性值与这个首部中所列出的相匹配的时候，才会对请求进行相应的处理。

## If-Range

条件请求，If-Range HTTP 请求头字段用来使得 Range 头字段在一定条件下起作用：当字段值中的条件得到满足时，Range 头字段才会起作用，同时服务器回复206 部分内容状态码，以及Range 头字段请求的相应部分；如果字段值中的条件没有得到满足，服务器将会返回 200 OK 状态码，并返回完整的请求资源。

字段值中既可以用 Last-Modified 时间值用作验证，也可以用ETag标记作为验证，但不能将两者同时使用。

If-Range 头字段通常用于断点续传的下载过程中，用来自从上次中断后，确保下载的资源没有发生改变。

## Last-Modified

响应首部，其中包含源头服务器认定的资源做出修改的日期及时间。 它通常被用作一个验证器来判断接收到的或者存储的资源是否彼此一致。由于精确度比  ETag 要低，所以这是一个备用机制。包含有  If-Modified-Since 或 If-Unmodified-Since 首部的条件请求会使用这个字段。

## Location

**Location** 首部指定的是需要将页面重新定向至的地址。一般在响应码为3xx的响应中才会有意义。

## Origin

<u>请求首部</u>，指示了请求来自于哪个站点。该字段仅指示服务器名称，并不包含任何路径信息。该首部用于 CORS 请求或者 POST 请求。除了不包含路径信息，该字段与 Referer 首部字段相似。



## Pragma

**Pragma** 是一个在 HTTP/1.0 中规定的通用首部，这个首部的效果依赖于不同的实现，所以在“请求-响应”链中可能会有不同的效果。它用来向后兼容只支持 HTTP/1.0 协议的缓存服务器，那时候 HTTP/1.1 协议中的 Cache-Control 还没有出来。

```
Pragma: no-cache
```

与 Cache-Control: no-cache 效果一致。强制要求缓存服务器在返回缓存的版本之前将请求提交到源头服务器进行验证。

## Proxy-Authenticate

<u>响应首部</u>，指定了获取 proxy server （代理服务器）上的资源访问权限而采用的身份验证方式。代理服务器对请求进行验证，以便它进一步传递请求。

Proxy-Authenticate首部需要与 407 Proxy Authentication Required 响应一起发送。

## Proxy-Authorization

<u>请求首部</u>，其中包含了用户代理提供给代理服务器的用于身份验证的凭证。这个首部通常是在服务器返回了 407 Proxy Authentication Required 响应状态码及 Proxy-Authenticate 首部后发送的。

## Range

请求首部，告知服务器返回文件的哪一部分。在一个  Range 首部中，可以一次性请求多个部分，服务器会以 multipart 文件的形式将其返回。如果服务器返回的是范围响应，需要使用 206 Partial Content 状态码。假如所请求的范围不合法，那么服务器会返回  416 Range Not Satisfiable 状态码，表示客户端错误。服务器允许忽略  Range  首部，从而返回整个文件，状态码用 200 。

```html
Range: bytes=200-1000, 2000-6576, 19000- 
```

## Referer

包含了当前请求页面的来源页面的地址，即表示当前页面是通过此来源页面里的链接进入的。服务端一般使用 `Referer` 请求头识别访问来源，可能会以此进行统计分析、日志记录以及缓存优化等。

在以下两种情况下，`Referer` 不会被发送：

- 来源页面采用的协议为表示本地文件的 "file" 或者 "data" URI；
- 当前请求页面采用的是非安全协议，而来源页面采用的是安全协议（HTTPS）。(https跳http)

## Referrer-Policy

响应首部，用来监管哪些访问来源信息：会在Referer中发送，也就是应该被包含在生成的请求中。

```
//不会发送Referer
Referrer-Policy: no-referrer   
//默认值，在相等安全级别下发送(https->https)，降级不会发送(https->http)
Referrer-Policy: no-referrer-when-downgrade	
//仅发送文件的源作为引用地址
Referrer-Policy: origin			
//对于同源的请求，会发送完整的URL作为引用地址，但是对于非同源请求仅发送文件的源。
Referrer-Policy: origin-when-cross-origin		
//对于同源的请求会发送引用地址，但是对于非同源请求则不发送引用地址信息。
Referrer-Policy: same-origin		
//在同等安全级别的情况下，发送文件的源作为引用地址(HTTPS->HTTPS)，但是在降级的情况下不会发送 (HTTPS->HTTP)。
Referrer-Policy: strict-origin	
//对于同源的请求，会发送完整的URL作为引用地址；在同等安全级别的情况下，发送文件的源作为引用地址(HTTPS->HTTPS)；在降级的情况下不发送此首部 (HTTPS->HTTP)。
Referrer-Policy: strict-origin-when-cross-origin	
//无论是同源请求还是非同源请求，都发送完整的 URL（移除参数信息之后）作为引用地址。
Referrer-Policy: unsafe-url
```

## Retry-After

表示用户代理需要等待多长时间之后才能继续发送请求。这个首部主要应用于以下两种场景：

- 当与 503 (Service Unavailable，当前服务不存在) 响应一起发送的时候，表示服务下线的预期时长。
- 当与重定向响应一起发送的时候，比如 301 (Moved Permanently，永久迁移)，表示用户代理在发送重定向请求之前需要等待的最短时间。



## Server

包含了处理请求的源头服务器所用到的软件相关信息

## Set-Cookie

用来设置客户端需要缓存的cookie

## TE

用来指定用户代理希望使用的传输编码类型。(可以将其非正式称为 *Accept-Transfer-Encoding*， 这个名称显得更直观一些)。

支持 HTTP/1.1 协议的接收方一定可以处理 `chunked` 传输编码请求，所以没有必要一定在  `TE` 首部指定“chunked”关键字。然而，如果客户端将要接收编码在chunked包体里面的"trailer"信息的时候，主动指定该头部将会非常有用。

```
TE: compress
TE: deflate
TE: gzip
TE: trailers
```

## Trailer

<u>响应首部</u>，允许发送方在分块发送的消息后面添加额外的元信息，这些元信息可能是随着消息主体的发送动态生成的，比如消息的完整性校验，消息的数字签名，或者消息经过处理之后的最终状态等。

## Transfer-Encoding

指明了将 entity 安全传递给用户所采用的编码形式。是一个逐跳传输消息首部，即仅应用于两个节点之间的消息传递，而不是所请求的资源本身。一个多节点连接中的每一段都可以应用不同的Transfer-Encoding 值。如果你想要将压缩后的数据应用于整个连接，那么请使用端到端传输消息首部  Content-Encoding 。

**当这个消息首部出现在 HEAD 请求的响应中，而这样的响应没有消息体，那么它其实指的是应用在相应的  GET 请求的应答的值。**

transfer-encoding:chunked的时候，不发送content-length，在每一个分块的开头需要添加当前分块的长度，以十六进制的形式表示，后面紧跟这'\r\n'，之后是分块本身，后面也是'\r\n'，终止块是一个常规的分块，不同之处在于其长度为0，终止块后面是一个trailer，由一系列的实体消息首部构成。

分块编码的应用场景：要传输大量的数据，但是在请求在没有被处理完之前响应的长度是无法获得的。

```html
HTTP/1.1 200 OK 
Content-Type: text/plain 
Transfer-Encoding: chunked

7\r\n
Mozilla\r\n 
9\r\n
Developer\r\n
7\r\n
Network\r\n
0\r\n 
\r\n
```

## User-Agent

User-Agent 首部包含了一个特征字符串，用来让网络协议的对端来识别发起请求的用户代理软件的应用类型、操作系统、软件开发商以及版本号。

```
User-Agent: <product> / <product-version> <comment>
```



## Vary

响应首部，它决定了对于未来的一个请求头，应该用一个缓存的回复(response)还是向源服务器请求一个新的回复。它被服务器用来表明在 content negotiation algorithm（内容协商算法）中选择一个资源代表的时候应该使用哪些头部信息（headers）

在响应状态码为 304 Not Modified  的响应中，也要设置 Vary 首部，而且要与相应的 200 OK 响应设置得一模一样。

```
Vary: *  
//所有的请求都被视为唯一并且非缓存的，使用Cache-Control: no-store,来实现则更适用，这样用于说明不存储该对象更加清晰。
Vary: <header-name>, <header-name>, ... 
// 逗号分隔的一系列http头部名称，用于确定缓存是否可用
```

## Via

通用首部，是由代理服务器添加的，适用于正向和反向代理，在请求和响应首部中均可出现。这个消息首部可以用来追踪消息转发情况，防止循环请求，以及识别在请求或响应传递链中消息发送者对于协议的支持能力。

## X-Forwarded-For

在客户端访问服务器的过程中如果需要经过HTTP代理或者负载均衡服务器，可以被用来获取最初发起请求的客户端的IP地址，这个消息首部成为事实上的标准。在消息流从客户端流向服务器的过程中被拦截的情况下，服务器端的访问日志只能记录代理服务器或者负载均衡服务器的IP地址。如果想要获得最初发起请求的客户端的IP地址的话，那么 X-Forwarded-For 就派上了用场。

```
X-Forwarded-For: <client>, <proxy1>, <proxy2>
```

第一个就是客户端的IP

## X-Forwarded-Host

是一个事实上的标准首部，用来确定客户端发起的请求中使用  Host  指定的初始域名。

反向代理（如负载均衡服务器、CDN等）的域名或端口号可能会与处理请求的源头服务器有所不同，在这种情况下，X-Forwarded-Host 可以用来确定哪一个域名是最初被用来访问的。

## X-Real-IP

只记录客户端IP地址，没有中间的代理信息，相当于X-Forwarded-For的简化版。

## X-Frame-Options

响应首部，用来给浏览器指示允许一个页面可否在`<frame>/<iframe>/<embed>/<object>`中展现的标记。站定可以通过确保网站没有被嵌入到别人的站点里面，从而避免 **点击劫持** 攻击。

```
X-Frame-Options: deny                    //不允许在frame中展示，同源也不行
X-Frame-Options: sameorigin				 //可以在同源的frame中展示
X-Frame-Options: allow-from https://example.com/     //可以在给定的源中展示
```

## X-XSS-Protection

<u>响应首部</u>，是 Internet Explorer，Chrome 和 Safari 的一个特性，当检测到跨站脚本攻击 (XSS)时，浏览器将停止加载页面。若网站设置了良好的 Content-Security-Policy 来禁用内联 JavaScript ('unsafe-inline')，现代浏览器不太需要这些保护， 但其仍然可以为尚不支持 CSP 的旧版浏览器的用户提供保护。

```
//禁止xss过滤
X-XSS-Protection: 0 
//启用XSS过滤（通常浏览器是默认的）。 如果检测到跨站脚本攻击，浏览器将清除页面（删除不安全的部分）。
X-XSS-Protection: 1
//启用XSS过滤。 如果检测到攻击，浏览器将不会清除页面，而是阻止页面加载
X-XSS-Protection: 1; mode=block
//启用XSS过滤。 如果检测到跨站脚本攻击，浏览器将清除页面并使用CSP report-uri指令的功能发送违规报告。
X-XSS-Protection: 1; report=<reporting-uri>
```

