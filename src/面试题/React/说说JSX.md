# 说说JSX

JSX即JavaScript XML，可以让我们编写类XML语法。

JSX可以看做是JavaScript的扩展。

## 为什么使用JSX

编写简介明了，结构清晰，易于开发和维护，不用写React.createElement这种不好编写不好理解且层次不好分辨的API。

JSX执行更快，因为编译为JavaScript代码后进行了优化。

类型安全，在编译过程中就能发现错误。

用熟悉的类HTML语法来定义元素的树形结构。

## 输出

会被babel转化为React.createElement，返回一个嵌套的对象结构。

