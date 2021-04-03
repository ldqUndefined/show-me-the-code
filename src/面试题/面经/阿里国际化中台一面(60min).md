# 阿里国际化中台一面

讲思路：不使用JS，只使用HTML和CSS实现一个tooltips组件，鼠标滑过“?”时，展示气泡内容

气泡展示过程淡入淡出，气泡宽高100px，在“？”上方10px处，气泡内容文案居中展示

```
<div id="test">?</div>
//思路，div相对定位，搞个after伪元素绝对定位，写死宽高100px，
//bottom：10px;transform:translate(-50%,-100%);opacity:0;transition:opacity 1s
//然后hover的时候opacity:1
//居中用flex垂直水平居中就好
```

看代码，判断输出是什么，具体内容是this指针指向的，很简单，但我答错了哈哈。然后让我讲一下箭头函数和普通函数有什么不同？我说没有this和没有arguments，且不能通过new调用，然后他问为啥不能new调用，答因为箭头函数没有原型

new一个对象过程会发生什么

看代码，判断输出是什么，具体内容是宏任务和微任务的，很简单。

讲一讲原型链

讲一讲Redux以及为什么选Redux。

为什么另一个项目不用Redux？因为偏中后台，项目数据交互比较简单，没必要引入增加复杂度。

为啥选择Redux-Saga？比redux-thunk提供了更精细化的流程控制。

讲一讲immer，讲一下immutable对象的好处？结构化对象保持没有修改的对象引用不变而减少React组件的渲染。为什么不同immutable.js？immutable.js操作复杂，需要调用函数进行js原生对象和immutable类型的转换，使用immer可以像写原生js对象一样，且immutable.js的类型难写，和ts共存困难。 immer原理？Proxy代理。immer是否对每一层对象都用Proxy代理？最后这个问题我坦白不会，我确实只知道用Proxy代理而已哈哈。

setState是同步还是异步？什么情况下是同步的？

讲一下React的虚拟dom及它的好处

讲一下React的diff的策略及diff的细节

算法题：[leetcode原题，比较版本号](https://leetcode-cn.com/problems/compare-version-numbers/)

算法题：找出二叉树中两个节点的最短路径。

二叉树的数据结构是：

```
type Node = {
	left?:Node;
	right?:Node;
	parent?:Node;
	depth:number
}
```

一开始我答的不是最优解，我是找出根节点然后从根节点开始出发递归找出他们的最近公共祖先，然后通过depth算出最小路劲，是O(n)的复杂度。然后面试官提示用depth优化，然后说出通过depth先让depth大的向上通过parent往上走，如果没有遇到另一个节点的话，最终depth会一样大，然后两个节点同时向上走，判断他们的parent即使相等，在这个过程中顺便记录走的距离就是答案。时间复杂度为常数，和depth相关。

会不会node？以前写过，但现在只有写脚本和配webpack时候才用到。

