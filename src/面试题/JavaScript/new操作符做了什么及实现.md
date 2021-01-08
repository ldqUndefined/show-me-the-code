# new操作符做了什么及实现

## new操作符做了什么

以下面代码为例：

```
function People(age){	
	this.age = age
}
```

1. 创建一个空的js对象
2. 把该对象的`__proto__`链接到函数的原型`prototype`上
3. 将上面创建的对象作为this上下文
4. 如果函数没有返回对象类型，则返回this，否则返回函数返回的对象。



## 实现一个new

```js
//es5实现
function _new_es5() {
  var obj = {};
  var Constructor = Array.prototype.shift.call(arguments);
  Object.setPrototypeOf(obj, Constructor.prototype);
  var result = Constructor.apply(obj, arguments);
  return typeof result === 'object' && result ? result : obj;
}
//es6实现
function _new_es6(constructor, ...rest) {
  const obj = {};
  Object.setPrototypeOf(obj, constructor.prototype);
  const result = constructor.apply(obj, rest);
  return typeof result === 'object' && result ? result : obj;
}

function People(a) {
  this.a = a;
}
const tt = _new_es5(People, '221');
```

