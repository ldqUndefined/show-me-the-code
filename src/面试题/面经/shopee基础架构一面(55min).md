# shopee基础架构一面(55min)

看题输出：

```
const handler1 = () => {
  console.log('11')
  Promise.resolve().then(()=>{
    console.log('22')
  })
  setTimeout(() => {
    console.log('33')
  }, 0);
}
const handler2 = () => {
  console.log('44')
  Promise.resolve().then(()=>{
    console.log('55')
  })
  setTimeout(() => {
    console.log('66')
  }, 0);
}
let div = document.getElementsByTagName('div')[0]
div.addEventListener('click',handler1)
div.addEventListener('click',handler2)
div.click()
```

还有一个和变量声明相关的看题说输出题。

手写一个数组扁平化函数。我写了个递归的，又叫我写个非递归的。

如何改变this指向？call、apply、bind。那你手写一个bind吧。

为什么hook不能放在条件判断里？因为是链表实现的，调用hook的时候移动链表到下一个结点取值。

讲一下React-Fiber。

讲一下受控组件和非受控组件。

讲一下useCallback和useMemo，用useMemo可以实现useCallback吗。

讲一下useEffect，useEffect知道自己是初次挂载吗？不知道，我一般用useRef存个值来判断。

手写prosemise并发一次只能三个请求，返回一个promise，包含返回结果。



