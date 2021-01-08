# React Fiber 是什么

概括：**React Fiber 是一种基于浏览器的单线程调度算法。**

React Fiber 用类似 `requestIdleCallback` 的机制来做异步 diff。但是之前数据结构不支持这样的实现异步 diff，于是 React 实现了一个类似链表的数据结构，将原来的 递归diff 变成了现在的 遍历diff，这样就能做到异步可更新了。

React引入Fiber之后分为三个阶段：schedule、render、commit。

schedule调度diff的过程，以避免阻塞页面的渲染，所以render阶段是可中断的，commit阶段是不可中断的。

