# React组件通信方式

- 通过props。父组件传递值或者回调函数给子组件，以及祖先后代组件层层传递props

- 通过ref。

  - 如果是Dom结点的话，直接通过ref获取到DOM的真实结点并操作。
  - 如果是类组件的话，父组件通过ref可以获取子组件的实例，并调用响应的实例方法。
  - 如果是函数组件的话，因为函数组件没有实例，可以通过forwardRef转发到子组件某个Dom结点上，或者使用useImperativeHandle这个hook来自定义返回一个暴露给父组件的实例值。

- 通过context。可以跨域层级进行值和回调函数的传递。通过Context.Consumer订阅离自己最近的Context.Provider的值，并且在订阅的Context的value发生变化时触发渲染

- 通过在全局定义发布订阅模式的实例，监听特定的事件发生(不推荐，问题定位困难)
