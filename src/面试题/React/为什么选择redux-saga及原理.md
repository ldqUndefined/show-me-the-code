# 为什么选择redux-saga及原理

redux-saga是一个redux的中间件，用于管理应用程序中的副作用side effect。



## 优缺点

**优点：**

- 相比于redux-thunk，redux-thunk还是会遇到回调地域的问题(当一个流程有多个异步任务时，需要多次dispatch一个函数，造成多层回调)。而redux-saga是基于generator的，它能让我们以编写同步代码的形式编写异步流程。
- 集中管理异步操作方法，可维护，不像redux-thunk同步和异步写在一起。
- action依然是普通对象，和redux要求的action保持一致。
- 提供了很多辅助函数更细粒度地处理触发的action

**缺点：**

语法比较难上手，并且由于是基于generator的，和TS一起使用时yield返回值永远是any，需要显示声明异步返回值的类型。

