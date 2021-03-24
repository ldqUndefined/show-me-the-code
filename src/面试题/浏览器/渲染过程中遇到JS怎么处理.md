# 渲染过程中遇到JS怎么处理

js的加载、解析与执行会阻塞DOM的构建，因为javascript和渲染线程共用一个线程，所以当遇到js，会暂停构建DOM，将控制权移交给JS引擎，等JS执行完毕，浏览器再从终端的地方恢复DOM构建。所以想要页面渲染越快，就不应该让JS阻塞DOM的渲染，所以建议把script标签放在body标签的底部，或者给script加上defer或者async属性。

JS不止会阻塞DOM的构建，也会阻塞CSSOM的构建。

原本DOM和CSSOM的构建是互不影响的，但是执行JS时，CSSOM也会阻塞DOM的构建，只有等CSSOM构建完之后，再执行完JS后，才能继续进行DOM的构建。

因为js不止可以修改DOM，也可以修改CSSOM。不完整的CSSOM是无法使用的，所以当JS想访问CSSOM并更改它时，就必须拿到完整的CSSOM，这就导致了一个现象：如果浏览器尚未完成CSSOM的下载和构建，我们又执行了JS时，那么浏览器将延迟JS的执行和DOM的构建，直到CSSOM的下载和构建完成之后，再去执行JS,等JS执行完之后，才恢复DOM的构建。



