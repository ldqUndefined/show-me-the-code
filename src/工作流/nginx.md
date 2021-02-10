

# Nginx学习笔记

## Nginx介绍

开源、高性能、高可靠的web和反向代理服务器，支持热部署。占用内存少，并发能力强，配置简单。

Nginx重要使用场景：

- 静态资源服务，通过本地文件系统提供服务。
- 反向代理服务，包括负载均衡等

## 基础命令

`start nginx` 启动nginx服务。

`nginx -t -c "nginx.conf的地址"`检查配置文件是否正确。错误的话会有行数错误提示。

`nginx -s reaload` 热重载。一般是修改了nginx.conf配置后使用重启。

`nginx -s stop` 快速停止。

`nginx -s quit` 完整有序地停止，即处理完当前所有任务后。

`nginx -s reopen` 重启Nginx。



## Nginx配置结构

Nginx的主配置文件是`/etc/nginx/nginx.conf`。

nginx.conf的结构如下所示：

```nginx
main        # 全局配置，对全局生效
├── events  # 配置影响 Nginx 服务器或与用户的网络连接
├── http    # 配置代理，缓存，日志定义等绝大多数功能和第三方模块的配置
│   ├── upstream # 配置后端服务器具体地址，负载均衡配置不可或缺的部分
│   ├── server   # 配置虚拟主机的相关参数，一个 http 块中可以有多个 server 块
│   ├── server
│   │   ├── location  # server 块可以包含多个 location 块，location 指令用于匹配 uri
│   │   ├── location
│   │   └── ...
│   └── ...
└── ...

```

## Nginx语法规则

- 配置文件由指令和指令块构成。
- 每条指令以`;`分号结尾，指令和参数之间用空格符号分隔。
- 指令快以`{}`大括号将多条指令阻止在一起。
- 可以使用`include`语句组合多个配置文件以提升可维护性。
- 使用`#`添加注释，提高可读性。
- 使用`$`符号使用变量。
- 部分指令的参数支持正则表达式。



## location表达式

### location表达式类型

- `~` 表示执行一个正则表达式，**区分大小写**
- `~*` 表示执行一个正则表达式，**不区分大小写**
- `^~` 表示普通字符匹配。使用前缀匹配。如果匹配成功，则不再匹配其他location
- `=` 表示进行普通字符精确匹配。也就是完全匹配
- `@`定义一个命名的location，在内部定向时使用，比如错误页error_page等



### location优先级

**nginx中location和配置中location的位置没有太大关系。和location表达式的类型有关。相同类型的表达式，字符串长的会优先匹配。**

优先级顺序：

1. `=`优先级最高，一旦匹配成功，就不再查找别的匹配项。
2. `^~`普通字符前缀匹配，一旦匹配成功，就不再找别的匹配项。
3. `~和~*`正则表达式，如果有多个location的正则表达式能匹配的话，就用正则表达式最长的那个。
4. 常规字符串匹配，按前缀匹配，如果有多个匹配上的话，则匹配字符串最长的那个。

## 反向代理(常用)

通过配置反向代理可以很简单地解决跨域问题。

```nginx
location / {
    proxy_pass http://www.bilibili.com;
    #把匹配到的路由转发给proxy_pass后面的地址。
}
#或
location / {
    proxy_pass http://127.0.0.1:8001
    #把匹配到的路由转发给本地某个服务
}
```

反向代理还有`proxy_set_header`等可以在请求发送给服务器之前更改客户端请求头信息的能力。如：

```nginx
location / {
    proxy_pass http://127.0.0.1:8001
    proxy_set_header X-Real-IP $remote_addr
    proxy_set_header X-Forwarded-For $proxy_Add_x_forwarded_for
    proxy_set_header Host $http_host
}
```

## 跨域CORS配置

这个跨域CORS一般是后台同学配，后台同学可以在代码里对响应头进行编写，或者在nginx中配置。

前端的资源如果别的源通过ajax之类的方式加载的话，也会出现跨域的情况。

在nginx中配置的作用，就是在接收到请求的时候给响应头加上一些`Access-Control-Allow-XXX`的头部即可。

```nginx
server{
    listen 80;
    server_name localhost;
    add_header 'Access-Control-Allow-Origin' $http_origin;   
    # 全局变量获得当前请求origin，带cookie的请求不支持*
	add_header 'Access-Control-Allow-Credentials' 'true';    
	# 为 true 可带上 cookie
	add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS'; 
    # 允许请求方法
	add_header 'Access-Control-Allow-Headers' $http_access_control_request_headers; 
    # 允许请求的 header，可以为 *
	add_header 'Access-Control-Expose-Headers' 'Content-Length,Content-Range';
	if ($request_method = 'OPTIONS') {
		add_header 'Access-Control-Max-Age' 1728000;  
        # OPTIONS 请求的有效期，在有效期内不用发出另一条预检请求
		add_header 'Content-Type' 'text/plain; charset=utf-8';
		add_header 'Content-Length' 0;
		return 204;                  # 200 也可以
	}
	location / {
		root  /usr/share/nginx/html;
		index index.html;
	}
}
```



## gzip配置

gzip是一种常用的网页压缩技术，传输的网页通过gzip压缩之后可以大大地减少传输内容的体积。更小的体积可以节约带宽和提升传输速度。

gzip需要浏览器和Nginx的配合。浏览器发请求时需要在请求头中包含`Accept-Encoding:gzip`。一般在请求js、css等静态资源的时候会带上`Accept-Encoding:gzip`。Nginx在拿到这个请求的时候，如果有相应的配置的话，就会返回经过gzip压缩过的文件给浏览器，并且的响应头中加上`Content-Encoding:gzip`来告诉浏览器接收到文件后需要先通过gzip解压才能使用。

```nginx
#默认off，是否开启gzip
gzip on;

#需要gzip的文件类型，值为mime-type空格分隔。
#默认是text/html。（无论是否指定）"text/html"类型总是会被压缩的。
gzip_types text/css text/javascript application/javascript; 

#默认off。如果有对应的.gz文件就返回
gzip_static on; 

#设置系统获取几个单位的缓存用于存储gzip的压缩结果数据流。
gzip_buffers 4 8k; 

#gzip压缩比，1压缩最比最小，速度最快，9压缩比最大速度最慢
gzip_comp_level 6;

#资源允许压缩的最小字节数，从Content-Length中获取，默认0，无论多大都压缩。
#建议设置成大于1k的字节数，小于1K可能会越压越大。
gzip_min_length 1024;

#识别的http的协议版本，老版本浏览器可能不支持gzip导致用户看到乱码。
#可以选择1.0/1.1。默认1.1，保持默认就好。
gzip_http_version 1.1;

#Nginx作为反向代理的时候启用，开启或者关闭后端服务器返回的结果。
#匹配的前提是后端服务器必须要返回包含"Via"的 header头。
#默认off。
#any为无条件启用压缩。设置如no-cache意思是当header头中有Cache-Control:no-cache时启用压缩
gzip_proxied any;
```

对于前端开发人员而言，gzip一般配合Webpack中的`compression-webpack-plugin`插件使用。

通过配置使得打包的代码中生成对应的.gz文件，然后部署到静态服务器上。这样当我们开启`gzip_static` 时，就可以在请求资源的时候Nginx直接返回对应压缩过的文件，而不是让Nginx来执行压缩了(压缩会耗费服务器的计算资源)。

我们通过把压缩的动作在前端打包的时候就坐了，把打包之后的高等级的压缩文件放在服务器上，相当于把压缩文件的动作从Nginx提前到Webpack打包的时候完成，节约了服务器资源，所以一般在生产环境中应用webpack配置gzip压缩。

gzip压缩不对图片和视频类型压缩，收益不高，**对于字体只对ttf、otf和svg进行压缩**。其他字体压缩收益率不高。

## 静态文件缓存配置

前端的构建输出一般都带有hash值，每次构建如果相应的chunk变化的话，那么对应的chunk的hash值也会发生变化，所以我们可以给这些带hash的文件设置很长时间的长缓存。这些资源包括js、css、图片、字体、视频等。

而对于index.html我们使用协商缓存，每次都需要回源看index.html是否更新。

```nginx
location ~ .*\.(css|js|jpg|png|gif|swf|woff|woff2|eot|svg|ttf|otf|mp3|m4a|aac|txt)$ {
    expires 1y;
    #expires max;
    #add_header Cache-Control max-age=315360000;
}
location ~ .*\.html$ {
    expires -1;
    #add_header Cache-Control no-cache;
}
#expires是兼容旧版本http
#Cache-Control是1.1的强缓存
```

## 单页面项目前端路由配置

由于我们现在基本都是前后端分离的开发模式，所以当我们在浏览器中输入前端的域名或ip地址后面跟着各种路由路径时，我们不希望浏览器去请求对应服务器文件夹的资源，而是希望把浏览器中的路由交给前端的js处理。但是由于正常来说在浏览器中输入路由地址时，在传统开发模式中就是请求对应路由下的资源，所以我们需要设置请求该域名时，返回的总是那个index.html入口文件。

```nginx
server{
    listen 80;
    server_name frontend.route;
    location / {
        root /user/share/nginx/html/dist; #打包后的文件
        index index.html;
        try_files $uri $uri/ /index.html;
    }
}
#try_files 的语法就是按顺序检查文件是否存在，返回第一个找到的文件或者文件夹。
```



## 适配PC或移动设备

可以通过配置Nginx来让站点本剧用户的设备不同返回不一样的资源。

PC端和移动端一般都是分开编写的，但是PC端和移动端的资源都放在同一站点下，我们通过判断请求的`user-agent`来判断用户是PC端还是移动端从而返回相应的资源。

比如此时我们有两个文件夹，文件夹`/user/share/nginx/html/pc`下是pc端的资源，文件夹`/user/share/nginx/html/mobile`下是移动端的资源。

```nginx
server{
    listen 80;
    server_name localhost_adaptor;
    location / {
        root /user/share.nginx/html/pc;
        if($http_user_agent ~* '(Android|webOS|iPhone|iPod|BlackBerry)'){
            root /user/share/nginx/html/mobile;
        }
        index index.html
    }
}
```

## 配置HTTPS

申请证书之后下载证书的压缩文件，xxx.crt是证书文件，xxx.key是私钥。拷贝到服务器目录指定位置。

```nginx
server {
  listen 443 ssl http2 default_server;   # SSL 访问端口号为 443
  server_name https_test_host;         # 填写绑定证书的域名

  ssl_certificate /etc/nginx/https/xxx.crt;   # 证书文件地址
  ssl_certificate_key /etc/nginx/https/xxx.key;      # 私钥文件地址
  ssl_session_timeout 10m;

  ssl_protocols TLSv1 TLSv1.1 TLSv1.2;      #请按照以下协议配置
  ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE; 
  ssl_prefer_server_ciphers on;
  
  location / {
    root         /usr/share/nginx/html;
    index        index.html index.htm;
  }
}
```

一般还可以加上几个增强安全性的命令：

```nginx
add_header X-Frame-Options DENY;           # 减少点击劫持
add_header X-Content-Type-Options nosniff; # 禁止服务器自动解析资源类型
add_header X-Xss-Protection 1;             # 防XSS攻击
```

## HTTP请求转发到HTTPS

当配置完https后，可能还有用户是通过http访问服务器资源的，这个时候通过配置一个301跳转，把对应的HTTP请求重定向到HTTPS上去。

```nginx
server{
    listen 80;
    server_name httptohttps;
    
    #非https协议时重定向
    if ($scheme != 'https') {
        return 301 https://$server_name$request_uri;
    }
    
    #全部重定向
     return 301 https://$server_name$request_uri;
}
```

## 前端典型配置

```nginx
server{
    listen 8080;
    server_name localhost;
    
    location / {
        root /usr/share/nginx/html;
        index index.html;
        try_files $uri $uri/ index.html;
        
        if($request_filename ~ .*\.(html|htm)$){
            expires -1;
            #add_header Cache-Control no-cache;
        }
        
        if($request_filename ~ .*\.(css|js|jpg|png|gif|swf|woff|woff2|eot|svg|ttf|otf|mp3|m4a|aac|txt)$){
        	expires max;
            #expires 1y;
            #add_header Cache-Control max-age=31536000;
        }
        
        gzip on;
        gzip_types text/css text/javascript application/javascript;
        gzip_static on;
        gzip_buffers 4 8k;
        gzip_comp_level 6;
        gzip_min_length 1024;
        gzip_proxied any;
    }
    
    location ^~ /api/ {
        proxy_pass http://127.0.0.1:8066/api/;
    }
    
}
```

