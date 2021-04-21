# shopee基础架构二面(30min)

讲一下项目中遇到最难的事情及如何解决。

为啥用redux-saga？和redux-thunk之类的比起来对流程控制颗粒度较细，且编写起来以同步方式编写。redux-saga的缺点？generator返回值是any，和ts结合不好

redux有啥替换方案？我说useReducer用得好也差不多。

如果让你重构的话，你还会用redux吗？我说暂不考虑替换redux，首先是同事们都习惯了，其次是redux开发工具调试友好。

平时怎么定位性能问题，通过react-devtool看组件渲染频率，及浏览器performance面板看渲染过程的性能消耗及memory面板看内存是情况。

如何定位首屏白屏久的问题？首屏白屏久要么是请求阻塞，要么是同步代码阻塞，也可能是首屏js文件过大，可以通过webpack-bundle-analyze看一下分包情况，平时对于分包是以页面路由懒加载颗粒度分包的，对于一些大的库可以单独拆包，或者对于用的少的库可以动态import。

有没有了解过postCss，简历上cssmodule和sass是不是重叠了？postcss在wepack里配了，cssmodule是一个防止样式冲突的方案，sass是css预处理器，为了使用一些高级语法，虽然现在写类也不嵌套写，因为嵌套的编译性能低。

了解cssnext吗？没了解过

平时怎么学习的？

为啥想看新机会？



