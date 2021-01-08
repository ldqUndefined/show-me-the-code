# useEffect(fn, []) 和 componentDidMount 有什么差异

首先，当我们使用hook的时候，我们就应该转变思维模式，不应该再拘泥于之前的**生命周期**的类组件的思考模式，而是应该应该基于**数据、状态**驱动展示的思维模式。一直尝试采用旧的思维模式并想要找出和其对应的钩子，会阻碍我们正确的理解和使用hooks的方式。

实际上 **useEffect(fn, []) 和 componentDidMount**在原理上是不同的，如果把他们看做相等的，有可能不会得到期望的结果。

## 执行时机不同

componentDidMount在组件挂载之后运行。如果立即（同步）设置 state，那么React就会触发一次额外的render，并将第二个render的响应用作初始UI，这样用户就不会看到闪烁。假设需要使用componentDidMount读取一个DOM元素的宽度，并希望更新state来反映宽度。事件的执行顺序应该是下面这样的：

1. 首次执行render
2. 此次 render 的返回值 将用于更新到真正的 Dom 中
3. componentDidMount 执行而且执行setState
4. state 变更导致 再次执行 render，而且返回了新的 返回值
5. 浏览器只显示了第二次 render 的返回值，这样可以避免闪屏

可以理解为上面的过程都是同步执行的，会阻塞到浏览器将真实DOM最终绘制到浏览器上，当我们需要它的时候，这样的工作模式是合理的。但大多数情况下，我们可以在UI Paint 完毕之后，再执行一些异步拉取数据之后setState之类的副作用。

useEffect 也是在挂载后运行，但是它更往后，它不会阻塞真事Dom的渲染，因为 useEffect 在 Paint (绘制)之后延迟异步运行。这意味着如果需要从DOM读取数据，然后同步设置state以生成新的UI，有可能会有闪烁的问题发生。React 也提供了 同步执行模式的 useLayoutEffect，它更加接近 componentDidMount( )的表现。

如果想通过同步设置状态来避免闪烁，那么可以使用useLayoutEffect。但是大部分时间都需要使用useEffect比较好。

## props和state的捕获

在函数组件中，每一次函数的渲染后，都会捕获其在执行渲染时的props和state，在useEffect中，他不管外部数据如何变化，在其传递的回调函数中捕获的props和state不会变，这可能和componentDidMount中获取this.state上的数据表现不同，因为this.state是类实例，他总能拿到再当前渲染时的最新值，如果需要在useeffect中拿到执行回调时的最新值，可以通过useRef的ref实例来实现。





参考：

[useEffect(fn, []) 和 componentDidMount 有什么差异](https://cooperhu.com/2020/09/03/useEffect-componentDidMount/)

