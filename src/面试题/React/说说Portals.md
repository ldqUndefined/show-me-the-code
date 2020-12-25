# 说说Portals

Portal 提供了一种将子节点渲染到存在于父组件以外的 DOM 节点的优秀的方案。

## 使用方法

```
ReactDOM.createPortal(child, container)
```

第一个参数（child）是任何可渲染的 React 子元素，例如一个元素，字符串或 fragment。第二个参数（container）是一个 DOM 元素。

## 使用场景

通常来说当从组件的render方法返回一个元素时，它会挂载到DOM结点中离它最近的父节点。

但是有时候，我们需要将子元素插入到DOM结点中的不同位置：portal的典型用例是当父组件有`overflow: hidden` 或 `z-index` 样式的时候，需要子组件能够在视觉上"跳出"其容器。例如对话框、悬浮卡以及提示框

## Portal的事件冒泡

尽管 portal 可以被放置在 DOM 树中的任何地方，但在任何其他方面，其行为和普通的 React 子节点行为一致。由于 portal 仍存在于 *React 树*， 且与 *DOM 树* 中的位置无关，那么无论其子节点是否是 portal，像 context 这样的功能特性都是不变的。

这包含事件冒泡。一个从 portal 内部触发的事件会一直冒泡至包含 *React 树*的祖先，即便这些元素并不是 *DOM 树* 中的祖先。所以portal里的事件冒泡是从react组件树冒泡而不是从真实dom冒泡的