# script标签中defer和async的区别

![async和defer](./图片/async和defer.PNG)

async和defer的下载不会阻塞html的解析。

当带async的标签下载完后的执行会阻塞html的解析。async的执行顺序和标签顺序不一定相等，谁先请求完谁先执行。可能在DOMContentLoaded之前或之后执行，一定在load事件之前执行。

当带defer的标签下载完后会等待html解析完成之后执行。DOMContentLoaded之前触发。

给没有src的script加defer和async不会起作用。动态添加的script隐含async属性。



