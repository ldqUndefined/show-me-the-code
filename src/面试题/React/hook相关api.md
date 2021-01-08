# hook相关api

hook是16.8的新特性，可以在不编写class的情况下使用state以及其他的react特性。

**为react共享状态逻辑提供了更好的原生途径**，而不是使用render props和HOC重新组织代码结构，导致代码难以理解。

让我们可以将相关的逻辑放在一起，不相关的逻辑分开，而不是像类组件一样在componentDidMount和componentDidUpdate包含很多相同逻辑，并且完全不相关的代码缺在一个方法中组合在一起。



Hook 就是 JavaScript 函数，但是使用它们会有两个额外的规则：

- 只能在**函数最外层**调用 Hook。不要在循环、条件判断或者子函数中调用。
- 只能在 **React 的函数组件**中调用 Hook。不要在其他 JavaScript 函数中调用。（还有一个地方可以调用 Hook —— 就是自定义的 Hook 中。）

## useState

```
const [state, setState] = useState(initialState);
```

返回一个 state，以及更新 state 的函数。

在初始渲染期间，返回的状态 (`state`) 与传入的第一个参数 (`initialState`) 值相同。

initialState可以传入函数来进行惰性计算，否则如果在initialState进行复杂函数计算，会影响性能。

React使用`Object.is`来比较state，如果state不同则触发渲染。

## useEffect

该 Hook 接收一个包含命令式、且可能有副作用代码的函数。

使用 `useEffect` 完成副作用操作。赋值给 `useEffect` 的函数会在组件渲染到屏幕之后执行。

默认情况下，effect 将在每轮渲染结束后执行，但你可以选择让它 **在只有某些值改变的时候** 才执行。

useEffect函数可以返回一个清除函数，用来在组件更新或者卸载时进行特定操作，如清理定时器等。

在下一个effect执行之前，上一个effect就已经被执行。

虽然 `useEffect` 会在浏览器绘制后延迟执行，但会保证在任何新的渲染前执行。React 将在组件更新前刷新上一轮渲染的 effect。

可以通过传递第二个参数来让effect进行条件执行，第二个参数是个依赖数组，当数组中的数据发生变化时，才会触发effect。

## useContext

```
const value = useContext(MyContext);
```

接收一个 context 对象（`React.createContext` 的返回值）并返回该 context 的当前值。当前的 context 值由上层组件中距离当前组件最近的 `<MyContext.Provider>` 的 `value` prop 决定。

当组件上层最近的 `<MyContext.Provider>` 更新时，该 Hook 会触发重渲染，并使用最新传递给 `MyContext` provider 的 context `value` 值。即使祖先使用`React.memo`或`shouldComponentUpdate`，也会在组件本身使用 `useContext` 时重新渲染。

调用了 `useContext` 的组件总会在 context 值变化时重新渲染。

## useReducer

```
const [state, dispatch] = useReducer(reducer, initialArg, init);
```

和redux使用相似，dispatch引用是稳定的。

第二个参数是初始state。

第三个参数是惰性初始化函数，他将接收第二个参数作为函数入参，并且返回计算过后的舒适化state。

跳过dispatch：

如果 Reducer Hook 的返回值与当前 state 相同，React 将跳过子组件的渲染及副作用的执行。（React 使用 Object.is 比较算法 来比较 state。）

## useCallback

```
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);
```

返回一个被**记忆**的回调函数。

把内联回调函数及依赖项数组作为参数传入 `useCallback`，它将返回该回调函数的 memoized 版本，该回调函数仅在某个依赖项改变时才会更新。当你把回调函数传递给经过优化的并使用引用相等性去避免非必要渲染（例如 `shouldComponentUpdate`）的子组件时，它将非常有用。

`useCallback(fn, deps)` 相当于 `useMemo(() => fn, deps)`。

## useMemo

```
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

返回一个被**记忆**的值

把“创建”函数和依赖项数组作为参数传入 `useMemo`，它仅会在某个依赖项改变时才重新计算 memoized 值。这种优化有助于避免在每次渲染时都进行高开销的计算。

传入 `useMemo` 的函数会在**渲染期间**执行。请不要在这个函数内部执行与渲染无关的操作，诸如副作用这类的操作属于 `useEffect` 的适用范畴，而不是 `useMemo`。

如果没有提供依赖项数组，`useMemo` 在每次渲染时都会计算新的值。

## useRef

```
const refContainer = useRef(initialValue);
```

`useRef` 返回一个可变的 ref 对象，其 `.current` 属性被初始化为传入的参数（`initialValue`）。返回的 ref 对象在组件的整个生命周期内保持不变。

本质上，`useRef` 就像是可以在其 `.current` 属性中保存一个可变值的“盒子”。

useRef可以很方便地保存任何可变值，类似于在类组件中使用实例字段。

这是因为它创建的是一个普通 Javascript 对象。而 `useRef()` 和自建一个 `{current: ...}` 对象的唯一区别是，`useRef` 会在每次渲染时返回同一个 ref 对象。

当 ref 对象内容发生变化时，`useRef` 并*不会*通知你。变更 `.current` 属性不会引发组件重新渲染。

## useImperativeHandle

```
useImperativeHandle(ref, createHandle, [deps])
```

`useImperativeHandle` 可以让你在使用 `ref` 时自定义暴露给父组件的实例值。在大多数情况下，应当避免使用 ref 这样的命令式代码。`useImperativeHandle` 应当与 `forwardRef`一起使用：

```
function FancyInput(props, ref) {
  const inputRef = useRef();
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    }
  }));
  return <input ref={inputRef} ... />;
}
FancyInput = forwardRef(FancyInput);
```

在本例中，渲染 `<FancyInput ref={inputRef} />` 的父组件可以调用 `inputRef.current.focus()`。

## useLayoutEffect

其函数签名与 `useEffect` 相同，但它会在所有的 DOM 变更之后同步调用 effect。

可以使用它来读取 DOM 布局并同步触发重渲染。在浏览器执行绘制之前，`useLayoutEffect` 内部的更新计划将被同步刷新。

尽可能使用标准的 `useEffect` 以避免阻塞视觉更新。

`useLayoutEffect`的执行时机和`componentDidMount`还有`componentDidUpdate`相同，都是在DOM 操作完成但浏览器还没执行渲染时。

