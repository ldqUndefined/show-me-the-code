# 说一下requestAnimationFrame和requestIdleCallback

## requestAnimationFrame

`requestAnimationFrame`告诉浏览器希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。这个方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行。如果想在浏览器一次重绘之前继续更新下一帧动画，那么回调函数自身必须再次调用`requestAnimationFrame`。

回调函数通常执行次数为每秒60次，在大多数遵循W3C规范的浏览器中，回调的执行次数和浏览器屏幕刷新次数想匹配。为了提高性能和电池寿命，在大多数浏览器里，`requestAnimationFrame`运行在后台标签页或者隐藏的`iframe`里时`requestAnimationFrame`会被暂停以提升性能和电池寿命。

回调函数会被传入`DOMHighResTimeStamp`参数，该值和`performance.now()`返回值相同。

`requestAnimationFrame`会返回一个整数id，可以用`cancelAnimationFrame()`取消



## requestIdleCallback

`window.requestIdleCallback()`方法将在浏览器的空闲时段内调用的函数排队。这使开发者能够在主事件循环上执行后台和低优先级工作，而不会影响延迟关键事件，如动画和输入响应。函数一般会按先进先调用的顺序执行，然而，如果回调函数指定了执行超时时间timeout，则有可能为了在超时前执行函数而打乱执行顺序。

可以在空闲回调函数中调用`requestIdleCallback()`，以便在下一次通过事件循环之前调度另一个回调。

强烈建议使用`timeout`选项进行必要的工作，否则可能会在触发回调之前经过几秒钟。

```
var handle = window.requestIdleCallback(callback[, options])
//返回值是一个id，可以通过cancelIdleCallback方法来结束回调
//options选填，可以传入timeout，指定一个正值，如果超过timeout时间还没调用回调，则会在下一次
//空闲时期强制执行，尽管这样可能会对性能造成负面影响

//callback被调用时会接收到一个IdleDeadline参数，用于判断还剩多少闲置时间用于判断是否执行任务。

//IdleDeadline 有一个参数didTimeout，当它为true时说明回调是因为之前空闲时间没空执行并且超时
//所以这次空闲时间强制执行。

//IdleDeadline 有一个函数timeRemaining，执行之后可以获取当前限制周期预估剩余的毫秒数，可以通过
//返回的值判断当前线程的限制时间是否可以在结束前执行更多任务。
```

