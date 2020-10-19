# Symbol

ES5对象属性名都是字符串，容易造成属性名的冲突。ES6引入原始数据Symbol，表示第一无二的值，解决属性名冲突的问题。

## 1.概述

Symbol是基础类型，可以使用typeof判断

```javascript
let s = Symbol()
typeof s
//"symbol"
```

不可以进行new构造调用

```javascript
let s = new Symbol()
//Uncaught TypeError: Symbol is not a constructor
```

Symbol函数接收一个字符串作为参数，表示对Symbol实例的描述，主要是为了在控制台显示或者转为字符串时比较容易区分

```javascript
let s1 = Symbol('foo');
let s2 = Symbol('bar');

s1 // Symbol(foo)
s2 // Symbol(bar)

s1.toString() // "Symbol(foo)"
s2.toString() // "Symbol(bar)"
```

如果Symbol的参数是一个对象，会调用该对象的toString方法，把它转为字符串，然后才生成一个Symbol值

```javascript
const obj = {
  toString() {
    return 'abc';
  }
};
const sym = Symbol(obj);
sym // Symbol(abc)
```

Symbol函数的参数只是对当前Symbol值得描述，所以相同参数的Symbol函数的返回值是不相等的

```javascript
// 没有参数的情况
let s1 = Symbol();
let s2 = Symbol();

s1 === s2 // false

// 有参数的情况
let s1 = Symbol('foo');
let s2 = Symbol('foo');

s1 === s2 // false
```

Symbol值不能与其他类型的值进行运算，会报错。

```javascript
let sym = Symbol('My symbol');

"your symbol is " + sym
// TypeError: can't convert symbol to string
`your symbol is ${sym}`
// TypeError: can't convert symbol to string
```

但是Symbol值可以显示转为字符串

## 参考资料

1. [ES6入门-Symbol](<https://es6.ruanyifeng.com/#docs/symbol>)
2. [ES6 系列之模拟实现 Symbol 类型](<https://github.com/mqyqingfeng/Blog/issues/87>)