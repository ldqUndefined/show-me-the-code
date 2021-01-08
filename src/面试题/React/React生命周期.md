# React生命周期

![react生命周期](./图片/react生命周期.PNG)

## 挂载

### constructor(props)

**如果不初始化 state 或不进行方法绑定，则不需要为 React 组件实现构造函数。**

在为 React.Component 子类实现构造函数时，应在其他语句之前前调用 `super(props)`。否则，`this.props` 在构造函数中可能会出现未定义的 bug。

通常，在 React 中，构造函数仅用于以下两种情况：

- 通过给 this.state 赋值对象来初始化内部 state。
- 为事件处理函数绑定实例

### static getDerivedStateFromProps(nextProps,nextState)

`getDerivedStateFromProps` 会在调用 render 方法之前调用，并且在初始挂载及后续更新时都会被调用。它应返回一个对象来更新 state，如果返回 `null` 则不更新任何内容。

### render()

render是类组件唯一必须实现的方法。

render被调用时，会返回一下类型之一：

- **React 元素**。通常通过 JSX 创建。例如，`<div /> `会被 React 渲染为 DOM 节点，`<MyComponent /> `会被 React 渲染为自定义组件，无论是 `<div /> `还是 `<MyComponent />` 均为 React 元素。
- **数组或 fragments**。 使得 render 方法可以返回多个元素。欲了解更多详细信息，请参阅 [fragments](https://zh-hans.reactjs.org/docs/fragments.html) 文档。
- **Portals**。可以渲染子节点到不同的 DOM 子树中。欲了解更多详细信息，请参阅有关 [portals](https://zh-hans.reactjs.org/docs/portals.html) 的文档
- **字符串或数值类型**。它们在 DOM 中会被渲染为文本节点
- **布尔类型或 null**。什么都不渲染。（主要用于支持返回 `test && <Child /> `的模式，其中 test 为布尔类型。)

如果 `shouldComponentUpdate()` 返回 false，则不会调用 `render()`。

### componentDidMount()

`componentDidMount()` 会在组件挂载后（插入 DOM 树中）立即调用。依赖于 DOM 节点的初始化应该放在这里。如需通过网络请求获取数据，此处是实例化请求的好地方。

你可以在 `componentDidMount()` 里**直接调用 setState()**。它将触发额外渲染，但此渲染会发生在浏览器更新屏幕之前。如此保证了即使在 `render()` 两次调用的情况下，用户也不会看到中间状态。

## 更新

### static getDerivedStateFromProps(nextProps,nextState)

### shouldComponentUpdate(nextProps,nextState)

根据 `shouldComponentUpdate()` 的返回值，判断 React 组件的输出是否受当前 state 或 props 更改的影响。

当 props 或 state 发生变化时，`shouldComponentUpdate()` 会在渲染执行之前被调用。返回值默认为 true。首次渲染或使用 `forceUpdate()` 时不会调用该方法。

如果你一定要手动编写此函数，可以将 `this.props` 与 `nextProps` 以及 `this.state` 与`nextState` 进行比较，并返回 `false` 以告知 React 可以跳过更新。请注意，返回 `false` 并不会阻止子组件在 state 更改时重新渲染。

我们不建议在 `shouldComponentUpdate()` 中进行深层比较或使用 `JSON.stringify()`。这样非常影响效率，且会损害性能。

建议通过继承内置的`PureComponent`来实现浅层比较跳过不必要的渲染。

### render()

### getSnapShotBeforeUpdate(prevProps,prevState)

`getSnapshotBeforeUpdate()` 在最近一次渲染输出（提交到 DOM 节点）之前调用。它使得组件能在发生更改之前从 DOM 中捕获一些信息（例如，滚动位置）。此生命周期的任何返回值将作为参数传递给 `componentDidUpdate()`。

在“pre-commit阶段”，可以读取上一次render的dom信息。

### componentDidUpdate(prevProps,prevState,snapshot)

`componentDidUpdate()` 会在更新后会被立即调用。首次渲染不会执行此方法。

当组件更新后，可以在此处对 DOM 进行操作。如果你对更新前后的 props 进行了比较，也可以选择在此处进行网络请求。（例如，当 props 未发生变化时，则不会执行网络请求）。

你也可以在 `componentDidUpdate()` 中**直接调用 setState()**，但请注意**它必须被包裹在一个条件语句里**，否则会导致死循环。它还会导致额外的重新渲染，虽然用户不可见，但会影响组件性能。

如果组件实现了 `getSnapshotBeforeUpdate()` 生命周期（不常用），则它的返回值将作为 `componentDidUpdate()` 的第三个参数 “snapshot” 参数传递。否则此参数将为 undefined。

如果 shouldComponentUpdate() 返回值为 false，则不会调用 componentDidUpdate()。

## 卸载

### componentWillUnmonent()

`componentWillUnmount()` 会在组件卸载及销毁之前直接调用。在此方法中执行必要的清理操作，例如，清除 timer，取消网络请求或清除在 `componentDidMount()` 中创建的订阅等。

`componentWillUnmount()` 中**不应调用 setState()**，因为该组件将永远不会重新渲染。组件实例卸载后，将永远不会再挂载它。

## 错误处理

### static getDerivedStateFromError(error)

此生命周期会在后代组件抛出错误后被调用。 它将抛出的错误作为参数，并返回一个值以更新 state。

`getDerivedStateFromError()` 会在`渲染`阶段调用，因此不允许出现副作用。 如遇此类情况，请改用 `componentDidCatch()`。

### componentDidCatch(error,info)

此生命周期在后代组件抛出错误后被调用。 它接收两个参数：

1. `error` —— 抛出的错误。
2. info —— 带有 componentStack key 的对象，其中包含有关组件引发错误的栈信息。

`componentDidCatch()` 会在“提交”阶段被调用，因此允许执行副作用。 它应该用于记录错误之类的情况





