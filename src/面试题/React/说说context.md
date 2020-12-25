# 说说context

context提供了一种无需为每层组件手动添加props，就能在组件树间进行数据传递的方法。

典型的React应用中，数据是通过props自上而下进行传递的，但是对于层数多的时候这样传递属性时很麻烦的，所以context提供了一种在组件间共享值的方法。

## createContext

创建一个context对象，参数为默认值，当React渲染了一个订阅该context对象的组件，组件会从组件树中离自身最近的那个匹配的Provider中读取到当前的context值。

只有当组件所处的树中没有匹配到provider时，其defaultValue参数才会生效。将undefiend传递给provider的value时，消费组件的defaultValue不会生效。

## context.Provicer

接收一个value值，传递给消费组件，一个 Provider 可以和多个消费组件有对应关系。多个 Provider 也可以嵌套使用，里层的会覆盖外层的数据。

**当 Provider 的 value 值发生变化时，它内部的所有消费组件都会重新渲染。Provider 及其内部 consumer 组件都不受制于 shouldComponentUpdate 函数，因此当 consumer 组件在其祖先组件退出更新的情况下也能更新。**

**通过新旧值检测来确定变化，使用了与 Object.is 相同的算法。**

给value传对象时，尽量保持在组件刷新时引用不变，不然消费组件全都会重新渲染。

## context.Consumer

接收一个函数作为子元素，获取到当前的context值。

