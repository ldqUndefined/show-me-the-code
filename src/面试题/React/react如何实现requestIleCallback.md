# React如何实现requestIdleCallback

## 为什么要实现

由于stack reconciliation是使用递归进行的，如果过程中计算量大的话，会阻塞渲染，所以react通过改造virtual dom的结构为链表型的fiber，实现了异步可中断的reconciliation过程，而这个过程需要一个可让浏览器告诉我们何时有空闲时间进行操作的api，以尽量避免阻塞页面渲染，这个api就是requestIdleCallback。

但是requestIdleCallback并不能完全满足react的需求，主要有以下两点

1. 因为requestIdleCallback的兼容性差
2. requestIdleCallback的执行频率不高，fps为20，达不到人眼观测流畅度fps为60的要求

所以需要自己实现一个。

## 如何实现

实现requestIdleCallback的核心在于：**如何在浏览器空闲时且是渲染之后才调用回调方法**。

浏览器一般渲染的fps为60，而能够满足我们这个需求的浏览器提供了一个`requestAnimationFrame` 的api，这个api是浏览器提供给开发者进行动画开发的，它会在每次渲染前调用，调用频率和浏览器渲染频率基本相同，所以我们可以借助这个api来告诉浏览器在渲染后执行我们的回调，并且我们在调用`requestAnimationFrame` 的时候可以计算当前时间，由此我们就可以计算出下一次页面渲染的时间了(+16.6ms)。

但是`requestAnimationFrame` 有一个缺点，他处于性能考虑，在页面处于后台(即未展示状态)时该回调不会执行，所以我们需要对这种情况做补救措施，我们可以通过`setTimeout`定一个极限容忍时间去执行我们的回调，然后取消掉`requestAnimationFrame` 的回调：

```js
rAFID = requestAnimationFrame(function(timestamp) {
	// 当执行到时，说明回调正常执行，取消掉我们通过setTimeout设置的极限回调
	localClearTimeout(rAFTimeoutID);
	callback(timestamp);
});
rAFTimeoutID = setTimeout(function() {
	// 定时 100 毫秒是算是一个最佳实践
    // 当执行到时，说明浏览器可能在后台执行之类的，然后我们取消掉requestAnimationFrame
    // 的回调并且强制执行回调。
	localCancelAnimationFrame(rAFID);
	callback(getCurrentTime());
}, 100);
//当requestAnimationFrame不执行时，使用setTimeout去补救
//使用两个定时器内部互相取消对方
```

为了在浏览器渲染后执行，我们不能选择微任务，因为如果我们在`requestAnimationFrame` 执行微任务的话，会一直执行到当前微任务队列为空才进行下一个任务，这样会阻塞浏览器的渲染。

因此我们需要选择一个宏任务来实现我们的需求，当我们在`requestAnimationFrame` 中触发一个宏任务之后，`requestAnimationFrame` 结束-----浏览器渲染---执行宏任务，这样我们就能够实现在浏览器渲染后执行我们的回调了。

那么宏任务选择哪个好呢。React选择了`messageChannel`，因为`messageChannel`的优先级在宏任务中是最高的，只要当前宏任务中有`messageChannel`触发的宏任务，那么会一直执行到队列为空后，才会去执行其他宏任务的队列如`setTimeout`和`setInterval`的定时器任务队列。(setImmediate的兼容性太差不考虑)



- 所以在调度的过程中，首先会**判断任务是否过期**，如果过期的话无需调度，直接`port.postMessage(undefined)`让任务在渲染后马上执行。
- 如果没有过期，我们就通过`requestAnimationFrame` 启动定时器，在浏览器重绘之前调用回调方法
- 在回调方法中计算出当前这一帧执行的时间，以及下一帧的执行时间(一般是+16.6ms)，然后执行`port.postMessage(undefined)`让任务在渲染后判断是否有空余时间进行。
- `channel.port1.onmessage`在渲染后被调用，在此时通过判断当前时间和下一帧渲染时间对比，如果小于下一帧渲染时间，则由空余时间进行，如果大于的话就代表没有空闲时间了。此时还要判断任务是否过期，如果过期的话直接执行这个任务，否则的话将任务丢到下一帧看能不能执行(通过调用`requestAnimationFrame` )，如此往复







