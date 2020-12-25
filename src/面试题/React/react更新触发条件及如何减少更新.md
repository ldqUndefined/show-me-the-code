# react更新触发条件及如何减少更新

## 更新触发条件

类组件：

- 父组件更新
- 调用setState
- 订阅的context的provider的value发生变化时

对于函数组件：

- 父组件更新
- 函数中的state发生变化
- 订阅的context的provider的value发生变化时



## 减少更新

类组件：

- 重写shouldComponentUpdate声明周期函数，增加判断是否更新的条件，默认返回true进行更新，返回为false时不更新。或继承pureComonent，默认帮助组件在shouComponentUpdate上进行了一次浅比较。

函数组件：

- 使用memo包裹函数组件，在第二个参数传入判断是否相等的`isEqual`函数，默认进行浅比较，返回true。当手动构造`isEqual`函数时，返回为false时触发更新。

通用：

- 给子组件传函数props时，尽量不要传递匿名箭头函数等每次引用都会发生变化的值，可以传递类的实例方法(引用不变),或者使用`usecallback`等api记忆函数以减少引用变化。
- 给子组件传值props时，如果是引用类型，尽量保证引用不发生变化，对于计算的值，可以存在state中或者通过使用`useMemo`等api进行记忆以减少引用变化。
- 减少context等容易导致子组件刷新的用法

