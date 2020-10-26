# http首部

## 一、http首部字段结构

HTTP 首部字段是由首部字段名和字段值构成的，中间用冒号 “:” 分隔。

**首部字段名: 字段值**

字段值对应单个 HTTP 首部字段可以有多个值。

如：  Keep-Alive: timeout=15, max=100

### http首部字段类型

- 通用首部字段（General Header Fields） 

  请求报文和响应报文两方都会使用的首部。

- 请求首部字段（Request Header Fields） 

  从客户端向服务器端发送请求报文时使用的首部。补充了请求的附加内容、客户端信息、响应内容相关优先级等信息。 

- 响应首部字段（Response Header Fields） 

  从服务器端向客户端返回响应报文时使用的首部。补充了响应的附加 内容，也会要求客户端附加额外的内容信息。

- 实体首部字段（Entity Header Fields）

  针对请求报文和响应报文的实体部分使用的首部。补充了资源内容更新时间等与实体有关的信息。

### 通用首部字段表

| 通用首部字段名    | 说明                       |
| ----------------- | -------------------------- |
| Cache-Control     | 控制缓存的行为             |
| Connection        | 逐跳首部、连接的管理       |
| Date              | 创建报文的日期时间         |
| Pragma            | 报文指令                   |
| Trailer           | 报文末端的首部一览         |
| Transfer-Encoding | 指定报文主体的传输编码方式 |
| Upgrade           | 升级为其他协议             |
| Via               | 代理服务器的相关信息       |
| Warning           | 错误通知                   |

### 请求首部字段

| 请求首部字段名      | 说明                                          |
| ------------------- | --------------------------------------------- |
| Accept              | 用户代理可处理的媒体类型                      |
| Accept-Charset      | 优先的字符集                                  |
| Accept-Encoding     | 优先的内容编码                                |
| Accept-Language     | 优先的语言（自然语言）                        |
| Authorization       | Web认证信息                                   |
| Expect              | 期待服务器的特定行为                          |
| From                | 用户的电子邮箱地址                            |
| Host                | 请求资源所在服务器                            |
| If-Match            | 比较实体标记（ETag）                          |
| If-Modified-Since   | 比较资源的更新时间                            |
| If-None-Match       | 比较实体标记（与 If-Match 相反）              |
| If-Range            | 资源未更新时发送实体 Byte 的范围请求          |
| If-Unmodified-Since | 比较资源的更新时间（与If-Modified-Since相反） |
| Max-Forwards        | 最大传输逐跳数                                |
| Proxy-Authorization | 代理服务器要求客户端的认证信息                |
| Range               | 实体的字节范围请求                            |
| Referer             | 对请求中 URI 的原始获取方                     |
| TE                  | 传输编码的优先级                              |
| User-Agent          | HTTP 客户端程序的信息                         |

### 响应首部字段

| 响应首部字段       | 说明                         |
| ------------------ | ---------------------------- |
| Accept-Ranges      | 是否接受字节范围请求         |
| Age                | 推算资源创建经过时间         |
| ETag               | 资源的匹配信息               |
| Location           | 令客户端重定向至指定URI      |
| Proxy-Authenticate | 代理服务器对客户端的认证信息 |
| Retry-After        | 对再次发起请求的时机要求     |
| Server             | HTTP服务器的安装信息         |
| Vary               | 代理服务器缓存的管理信息     |
| WWW-Authenticate   | 服务器对客户端的认证信息     |

### 实体首部字段

| 实体首部字段     | 说明                         |
| ---------------- | ---------------------------- |
| Allow            | 资源可支持的HTTP方法         |
| Content-Encoding | 实体主体适用的编码方式       |
| Content-Language | 实体主体的自然语言           |
| Content-Length   | 实体主体的大小（单位：字节） |
| Content-Location | 替代对应资源的URI            |
| Content-MD5      | 实体主体的报文摘要           |
| Content-Range    | 实体主体的位置范围           |
| Content-Type     | 实体主体的媒体类型           |
| Expires          | 实体主体过期的日期时间       |
| Last-Modified    | 资源的最后修改日期时间       |

### End-to-end首部和Hop-by-hop首部

HTTP 首部字段将定义成缓存代理和非缓存代理的行为，分成 2 种类型。

- 端到端首部（End-to-end Header）

  分在此类别中的首部会转发给请求 / 响应对应的最终接收目标，且必须保存在由缓存生成的响应中，另外规定它必须被转发。

- 逐跳首部（Hop-by-hop Header）

  分在此类别中的首部只对单次转发有效，会因通过缓存或代理而不再 转发。HTTP/1.1 和之后版本中，如果要使用 hop-by-hop 首部，需提供 Connection 首部字段。

下面列举了 HTTP/1.1 中的逐跳首部字段。除这 8 个首部字段之外， 其他所有字段都属于端到端首部。 

- Connection
- Keep-Alive
- Proxy-Authenticate
- Proxy-Authorization 
- Trailer
- TE
- Transfer-Encoding
- Upgrade



## 二、通用首部字段

### 1.Cache-Control

通过指定首部字段 Cache-Control 的指令，就能操作缓存的工作机制。缓存指令是单向的，这意味着在请求中设置的指令，不一定被包含在响应中。多个指令以逗号分隔。

#### 缓存请求指令表

| 指令                | 参数   | 说明                                                         |
| ------------------- | ------ | :----------------------------------------------------------- |
| no-cache            | 无     | 强制向源服务器再次验证                                       |
| no-store            | 无     | 不缓存请求或响应的任何内容                                   |
| max-age = [ 秒]     | 必需   | 响应的最大Age值                                              |
| max-stale( = [ 秒]) | 可省略 | 接收已过期的响应。如果没有指定参数，那么无论过了多久，客户端都会接收响应；如果指定了具体数值，那么即使过期了但是再指定时间内，仍然会被客户端接收。 |
| min-fresh = [ 秒]   | 必需   | 期望在指定时间内的响应仍有效                                 |
| no-transform        | 无     | 代理不可更改媒体类型。这样做可防止缓存或代理压缩图片等类似操作。 |
| only-if-cached      | 无     | 从缓存获取资源。表明客户端只接受已缓存的响应，并且不要向原始服务器检查是否有更新的拷贝。 |
| cache-extension-    | -      | 新指令标记（token）                                          |

#### 缓存响应指令表

| 指令             | 参数   | 说明                                                         |
| ---------------- | ------ | ------------------------------------------------------------ |
| public           | 无     | 明确表明其他用户也可以利用缓存。响应可以被任何对象(包括：发送请求的客户端，代理服务器，等等)缓存。 |
| private          | 可省略 | 仅向特定用户返回响应。与public相反，缓存服务器只对该特定用户提供资源缓存的服务，其他用户发请求时代理服务器不会返回缓存。 |
| no-cache         | 可省略 | 使用缓存前必须先确认其有效性。(协商缓存，每次都要和源服务器验证) |
| no-store         | 无     | 不缓存请求或响应的任何内容。严格不使用缓存                   |
| no-transform     | 无     | 代理不可更改媒体类型                                         |
| must-revalidate  | 无     | 可缓存但必须再向源服务器进行确认。一旦资源过期（比如已经超过`max-age`），在成功向原始服务器验证之前，缓存不能用该资源响应后续请求。另外，使用 must-revalidate 指令会忽略请求的 max-stale 指令 |
| proxy-revalidate | 无     | 要求中间缓存服务器对缓存的响应有效性再进行确认               |
| max-age = [ 秒]  | 必需   | 响应的最大Age值，相对于请求的时间的缓存存储的最大时间周期，超过这个时间不使用缓存，在这个时间内则使用缓存。当指定max-age=0时，缓存服务器通常需要将请求转发给源服务器。在max-age时间内，缓存服务器将不对资源的有效性做确认 |
| s-maxage = [ 秒] | 必需   | 公共缓存服务器响应的最大Age值。覆盖`max-age`或者`Expires`头，但是仅适用于共享缓存(比如各个代理)，私有缓存会忽略它。 |
| cache-extension  | -      | 新指令标记（token）                                          |

### 2. Connection

Connection 首部字段具备如下两个作用。

- 控制不再转发给代理的首部字段

  使用方法：`Connection: 不再转发的首部字段名`

  在客户端发送请求和服务器返回响应内，使用 Connection 首部字段，可控制不再转发给代理的首部字段（即 Hop-by-hop 首部）。 

- 管理持久管理

  使用方法： `Connection: close`或`Connection: Keep-Alive`

  HTTP/1.1版本默认都是持久连接，所以客户端会在持久连接上持续发送请求。当服务端想断开时，则指定Connection首部字段的值为Close。HTTP/1.1之前默认都是非持久连接，若需要持久连接则需要指定Connection的值为Keep-Alive。

### 3. Date

首部字段 Date 表明创建 HTTP 报文的日期和时间。

### 4. Pragma

Pragma 是 HTTP/1.1 之前版本的历史遗留字段，仅作为与 HTTP/1.0 的向后兼容而定义。 

这个字段只有一个值，`Pragma: no-cache`

该首部字段属于通用首部字段，但只用在客户端发送的请求中。客户端会要求所有的中间服务器不返回缓存的资源。 

所有的中间服务器如果都能以 HTTP/1.1 为基准，那直接采用 Cache-Control: no-cache 指定缓存的处理方式是最为理想的。但要整体掌握全部中间服务器使用的 HTTP 协议版本却是不现实的。因此，发送的 请求会同时含有下面两个首部字段。 

`Cache-Control: no-cache`

` Pragma: no-cache`

### 5. Trailer

首部字段 Trailer 会事先说明在报文主体后记录了哪些首部字段。该首部字段可应用在 HTTP/1.1 版本分块传输编码时。 

### 6. Transfer-Encoding 

首部字段 Transfer-Encoding 规定了传输报文主体时采用的编码方式。HTTP/1.1 的传输编码方式仅对分块传输编码有效。 

### 7. Upgrade

首部字段 Upgrade 用于检测 HTTP 协议及其他协议是否可使用更高的版本进行通信，其参数值可以用来指定一个完全不同的通信协议。

### 8. Via

使用首部字段 Via 是为了追踪客户端与服务器之间的请求和响应报文的传输路径。 报文经过代理或网关时，会先在首部字段 Via 中附加该服务器的信息，然后再进行转发。首部字段 Via 不仅用于追踪报文的转发，还可避免请求回环的发生。 所以必须在经过代理时附加该首部字段内容。 

### 9. Warning

该首部通常会告知用户一些与缓存相关的问题的警告。

## 三、请求首部字段

### 1. Accept

Accept 首部字段可通知服务器，用户代理能够处理的媒体类型及媒体类型的相对优先级。可使用 type/subtype 这种形式，一次指定多种媒体类型。 可使用 type/subtype 这种形式，一次指定多种媒体类型。 权重用 ";" 分隔，权重q= 值在0-1，值越大权重越大，默认权重为q=1.0。

`Accept: text/html, application/xhtml+xml, application/xml;q=0.9, */*;q=0.8`

### 2. Accept-Charset 

Accept-Charset 首部字段可用来通知服务器用户代理支持的字符集及 字符集的相对优先顺序。另外，可一次性指定多种字符集。与首部字段 Accept 相同的是可用权重 q 值来表示相对优先级。该首部字段应用于内容协商机制的服务器驱动协商。

### 3. Accept-Encoding 

Accept-Encoding 首部字段用来告知服务器用户代理支持的内容编码及内容编码的优先级顺序。可一次性指定多种内容编码。

- gzip 
- compress 
- deflate 
- identity：不执行压缩或不会变化的默认编码格式

### 4. Accept-Language

首部字段 Accept-Language 用来告知服务器用户代理能够处理的自然语言集（指中文或英文等），以及自然语言集的相对优先级。可一次指定多种自然语言集。 

### 5. Authorization

首部字段 Authorization 是用来告知服务器，用户代理的认证信息

### 6. Expect 

客户端使用首部字段 Expect 来告知服务器，期望出现的某种特定行 为。因服务器无法理解客户端的期望作出回应而发生错误时，会返回状态码 417 Expectation Failed。 目前只有下面一个期望条件。

`Expect: 100-continue`

### 7. From

首部字段 From 用来告知服务器使用用户代理的用户的电子邮件地址。通常，其使用目的就是为了显示搜索引擎等用户代理的负责人的电子邮件联系方式。

### 8. Host

首部字段 Host 会告知服务器，请求的资源所处的互联网主机名和端口号。**Host 首部字段在 HTTP/1.1 规范内是唯一一个必须被包含在请求内的首部字段。** 首部字段 Host 和以单台服务器分配多个域名的虚拟主机的工作机制 有很密切的关联，这是首部字段 Host 必须存在的意义。请求被发送至服务器时，请求中的主机名会用 IP 地址直接替换解决。但如果这时，相同的 IP 地址下部署运行着多个域名，那么服务器就会无法理解究竟是哪个域名对应的请求。因此，就需要使用首部字段 Host 来明确指出请求的主机名。若服务器未设定主机名，那直接发送一个空值即可。

### 9. If-Match

形如 If-xxx 这种样式的请求首部字段，都可称为条件请求。服务器接收到附带条件的请求后，只有判断指定条件为真时，才会执行请求。

首部字段 If-Match，属附带条件之一，它会告知服务器匹配资源所用的实体标记（ETag）值。这时的服务器无法使用弱 ETag 值。服务器会比对 If-Match 的字段值和资源的 ETag 值，仅当两者一致时，才会执行请求。反之，则返回状态码 412 Precondition Failed 的响应。

还可以使用星号（*）指定 If-Match 的字段值。针对这种情况，服务器将会忽略 ETag 的值，只要资源存在就处理请求。

### 10. If-Modified-Since

如果在 If-Modified-Since 字段指定的日期时间后，资源发生了更新，服务器会接受请求。

`If-Modified-Since: Thu, 15 Apr 2004 00:00:00 GMT `

如果资源的更新时间早于If-Modified-Since，则不满足条件，返回false，即304(可以理解为重定向到客户端的缓存上)，然后客户端收到304后使用本地缓存。如果资源的更新时间晚于If-Modified-Since，则满足条件，返回true，即200，并附带新的资源内容。

### 11. If-None-Match

If-None-Match和首部字段If-Match作用相反，当If-None-Match字段的值Etag与请求资源的Etag不一致时，服务器会处理这个请求。所以，如果If-None-Match的Etag和资源不同时，返回200和新资源，如果相同，则条件失败，返回304。

### 12. If-Range

它告知服务器如果If-Range的Etag值和请求资源的Etag值相同时，则作为范围请求，返回Range字段指定的字节范围的资源。否则，返回全体资源。

`GET /index.html`

`If-Range:Etag-value`

`Range:bytes=5001-10000`

上面代码在Etag值和请求资源相同时，会返回206和特定字节范围的资源

`206 Partial Content`

`Content-Range: bytes 5001-10000/10000`

`Content-Length:5000`

如果Etag值和请求资源不同时，会返回200和新的etag值和所有资源

`200 OK`

`ETag: Other-Etag-value`

**如果不使用If-Range首部字段的话，在服务器端资源更新的情况下，客户端持有的资源会无效，所以范围请求也会无效，这时服务器端会返回412响应返回并要求客户端再次发送请求获取完整新资源，这样一来，和使用If-Range比起来，就需要多发一次请求。**

客户端：

`GET /`

`If-Match: Etag`

`Range:5001-10000`

服务器端：

`412 Precondition Failed`

客户端重新：

`GET /`

服务器端：

`200 OK`

`Etag：new-Etag`

### 13. If-Unmodified-Since

首部字段 If-Unmodified-Since 和首部字段 If-Modified-Since 的作用相反。

### 14. Max-Forwards

Max-Forwards的值在每次经过代理服务器转发时数值减一，当数值变0时返回相应。

一般用在TRACE或OPTIONS方法。

### 15. Proxy-Authorization

接收到从代理服务器发来的认证质询时，客户端会发送包含首部字段Proxy-Authorization 的请求，以告知服务器认证所需要的信息。

### 16. Range

对于只需获取部分资源的范围请求，包含首部字段 Range 即可告知服务器资源的指定范围。服务端成功处理时会返回状态码206 Partial Content，无法处理该范围请求时，则会返回状态码200 OK和全部资源。‘

### 17. Referer

Referer 请求头包含了当前请求页面的来源页面的地址，即表示当前页面是通过此来源页面里的链接进入的。服务端一般使用 Referer 请求头识别访问来源，可能会以此进行统计分析、日志记录以及缓存优化等。

### 18. TE

首部字段 TE 会告知服务器客户端能够处理响应的传输编码方式及相对优先级。它和首部字段 Accept-Encoding 的功能很相像，但是用于传输编码。

### 19. User-Agent

首部字段 User-Agent 会将创建请求的浏览器和用户代理名称等信息传达给服务器。此外，如果请求经过代理，那么中间也很可能被添加上代理服务器的名称。



## 四、响应首部字段

### 1. Accept-Range

首部字段 Accept-Ranges 是用来告知客户端服务器是否能处理范围请求，以指定获取服务器端某个部分的资源。

可指定的字段值有两种，可处理范围请求时指定其为 **bytes**，反之则指定其为 **none**。 

### 2. Age

`Age` 消息头里包含对象在缓存代理中存贮的时长，以秒为单位。Age的值通常接近于0。表示此对象刚刚从原始服务器获取不久；其他的值则是表示代理服务器当前的系统时间与此应答中的通用头 `Date`的值之差。。**代理创建响应时必须加上首部字段Age**。 

### 3. ETag

首部字段 ETag 能告知客户端实体标识。它是一种可将资源以字符串 形式做唯一性标识的方式。服务器会为每份资源分配对应的 ETag值。 

- 强Etag值

  不论实体发生多么细微的变化都会改变其值

- 弱Etag值

  弱 ETag 值只用于提示资源是否相同。只有资源发生了根本改变，产生差异时才会改变 ETag 值。这时，会在字段值最开始处附加 W/。`ETag: W/"usagi-1234"`

### 4. Location

使用首部字段 Location 可以将响应接收方引导至某个与请求 URI 位置不同的资源。 基本上，该字段会配合 3xx ：Redirection 的响应，提供重定向的URI。几乎所有的浏览器在接收到包含首部字段 Location 的响应后，都会强 制性地尝试对已提示的重定向资源的访问。

### 5. Proxy-Authenticate

首部字段 Proxy-Authenticate 会把由代理服务器所要求的认证信息发送给客户端。

### 6. Retry-After

首部字段 Retry-After 告知客户端应该在多久之后再次发送请求。主要 配合状态码 **503** Service Unavailable 响应，或 3xx Redirect 响应一起使用。

字段值可以指定为具体的日期时间（Wed, 04 Jul 2012 06：34：24 GMT 等格式），也可以是创建响应后的秒数。

### 7. Server

首部字段 Server 告知客户端当前服务器上安装的 HTTP 服务器应用程序的信息。不单单会标出服务器上的软件应用名称，还有可能包括版 本号和安装时启用的可选项。 

### 8. Vary

**Vary** 是一个HTTP响应头部信息，它决定了对于未来的一个请求头，应该用一个缓存的回复(response)还是向源服务器请求一个新的回复。如果Vary指定的首部字段不同的话，需要从源服务器重新获取资源。

### 9. WWW-Authenticate

首部字段 WWW-Authenticate 用于 HTTP 访问认证。

## 五、实体首部字段

### 1. Allow

首部字段 Allow 用于通知客户端能够支持 Request-URI 指定资源的所有 HTTP 方法。当服务器接收到不支持的 HTTP 方法时，会以状态码 405 Method Not Allowed 作为响应返回。与此同时，还会把所有能支持的 HTTP 方法写入首部字段 Allow 后返回。

### 2. Content-Encoding

首部字段 Content-Encoding 会告知客户端服务器对实体的主体部分选用的内容编码方式。内容编码是指在不丢失实体信息的前提下所进行的压缩。 

### 3. Content-Language

首部字段 Content-Language 会告知客户端，实体主体使用的自然语言（指中文或英文等语言）。

### 4. Content-Length

首部字段 Content-Length 表明了实体主体部分的大小（单位是字节）。

对实体主体进行内容编码传输时，不能再使用 Content-Length 首部字段。

### 5. Content-Location

首部字段 Content-Location 给出与报文主体部分相对应的 URI。和首部字段 Location 不同，Content-Location 表示的是报文主体返回资源对应的 URI。

### 6. Content-MD5

客户端会对接收的报文主体执行相同的 MD5 算法，然后与首部字段 Content-MD5 的字段值比较。

首部字段 Content-MD5 是一串由 MD5 算法生成的值，其目的在于检查报文主体在传输过程中是否保持完整，以及确认传输到达。

采用这种方法，对内容上的偶发性改变是无从查证的，也无法检测出恶意篡改。其中一个原因在于，内容如果能够被篡改，那么同时意味 着 Content-MD5 也可重新计算然后被篡改。所以处在接收阶段的客户端是无法意识到报文主体以及首部字段 Content-MD5 是已经被篡改过的。

### 7. Content-Range

针对范围请求，返回响应时使用的首部字段 Content-Range，能告知客户端作为响应返回的实体的哪个部分符合范围请求。字段值以字节为单位，表示当前发送部分及整个实体大小。 

`Content-Range: bytes 5001-10000/10000 `

### 8. Content-Type

首部字段 Content-Type 说明了实体主体内对象的媒体类型。和首部字段 Accept 一样，字段值用 type/subtype 形式赋值。

### 9.Expires

首部字段 Expires 会将资源失效的日期告知客户端。缓存服务器在接收到含有首部字段 Expires 的响应后，会以缓存来应答请求，在Expires 字段值指定的时间之前，响应的副本会一直被保存。当超过指定的时间后，缓存服务器在请求发送过来时，会转向源服务器请求资源。 

**源服务器不希望缓存服务器对资源缓存时，最好在 Expires 字段内写入与首部字段 Date 相同的时间值。**

**但是，当首部字段 Cache-Control 有指定 max-age 指令时，比起首部字段 Expires，会优先处理 max-age 指令。**

### 10. Last-Modified

首部字段 Last-Modified 指明资源最终修改的时间。一般来说，这个值就是 Request-URI 指定资源被修改的时间。

## 六、为Cookie服务的首部字段

| 首部字段名 | 说明                           | 首部类型     |
| ---------- | ------------------------------ | ------------ |
| Set-Cookie | 设置状态管理所使用的Cookie信息 | 响应首部字段 |
| Cookie     | 服务器接收到的Cookie信息       | 请求首部字段 |

### 1. Set-Cookie

| 属性         | 说明                                                         |
| ------------ | ------------------------------------------------------------ |
| NAME=VALUE   | 赋予 Cookie 的名称和其值（必需项）                           |
| expires=DATE | Cookie 的有效期（若不明确指定则默认为浏览器关闭前为止）。一旦 Cookie 从服务器端发送至客户端，服务器端就不存在可以显式删除 Cookie 的方法。但可通过覆盖已过期的 Cookie，实现对客户端 Cookie 的实质性删除操作。 |
| path=PATH    | 将服务器上的文件目录作为Cookie的适用对象（若不指定则默 认为文档所在的文件目录）。通过 Cookie 的 domain 属性指定的域名可做到与结尾匹配一致。比如，当指定 example.com 后，除 example.com 以外，www.example.com或 www2.example.com 等都可以发送 Cookie。 |
| domain=域名  | 作为 Cookie 适用对象的域名 （若不指定则默认为创建 Cookie 的服务器的域名） |
| Secure       | 仅在 HTTPS 安全通信时才会发送 Cookie。其主要目的为防止跨站脚本攻击（Cross-site scripting，XSS）对 Cookie 的信息窃取。 |
| HttpOnly     | 加以限制，使 Cookie 不能被 JavaScript 脚本访问               |

















