# 说说refs转发

## refs

Refs 提供了一种方式，允许我们访问 DOM 节点或在 render 方法中创建的 React 元素

一般使用场景：

- 管理焦点，文本选择或媒体播放。
- 触发强制动画。
- 集成第三方 DOM 库。

当通过`Create.createRef`并且传递给render中的元素时，对该结点的应用可以在ref的current属性中访问。

ref 的值根据节点的类型而有所不同：

- 当 ref 属性用于 HTML 元素时，构造函数中使用 React.createRef() 创建的 ref 接收底层 DOM 元素作为其 current 属性。
- 当 `ref` 属性用于自定义 class 组件时，`ref` 对象接收组件的挂载实例作为其 `current` 属性。
- 你不能在函数组件上使用 ref 属性，因为他们没有实例。

## refs转发

ref转发是将ref自动地通过组件传递到其一子组件的技巧。

因为函数是没有实例的，所以当要对函数组件使用ref时，会发生错误。

通过使用React.forwardRef进行转发。

使用场景：

- 当想要对函数组件使用ref时。
- 高阶组件转发ref，否则使用高阶组件包裹的组件拿不到期望的ref



