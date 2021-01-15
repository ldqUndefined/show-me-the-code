# hook解决了什么问题，优缺点是什么

hook解决了状态逻辑复用的问题，是继render-props和HOC之后的第三种状态共享方案，不会产生嵌套地域问题，是React原生提供的共享状态逻辑的方案。



优点：

- 无需修改组件结构的情况下复用状态逻辑，不会产生嵌套地狱问题。
- UI和逻辑更好地分离(自定义hook)
- 给函数组件提供了state和sideEffect
- Hooks可以引用其他hooks
- 业务逻辑根据功能划分而不是根据生命周期划分，(不会出现不相关的代码出现在同一个方法中的问题)。
- 不用考虑this指向问题

缺点：

- 由于闭包出现的capture value和之前使用类组件的this.state表现不能可能引起困惑
- useEffect的依赖项没有正确设置可能会引起问题
- 无法实现`getSnapShotBeforeUpdate`和`componentDidCatch`这两个类组件声明周期函数的功能



