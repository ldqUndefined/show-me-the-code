//ES6中compose的模拟实现

//最基础循环版
const compose_normal = (...funcArr) => {
  if (funcArr.length === 0) {
    throw new Error('不传函数你组合你妈呢');
  }
  return function(...args) {
    let len = funcArr.length - 1;
    let result = funcArr[len].call(this, ...args);
    while (len-- > 0) {
      result = funcArr[len].call(this, result);
    }
    return result;
  };
};
let name = 'kevin';
let toUpper = str => str.toUpperCase();
let addHello = str => 'hello ' + str;
let split = str => str.split(' ');
let func = compose(split, toUpper, addHello);
func(name);

//reduce炫技版
const compose_reduce = (...funcArr) => {
  if (funcArr.length === 0) {
    throw new Error('不传函数你组合你妈呢');
  }
  return function(...args) {
    let last = funcArr.pop();
    let result = last.call(this, ...args);
    return funcArr.reduceRight((acc, cur) => cur.call(this, acc), result);
  };
};
let name = 'kevin';
let toUpper = str => str.toUpperCase();
let addHello = str => 'hello ' + str;
let split = str => str.split(' ');
let func = compose_reduce(split, toUpper, addHello);
func(name);

//compose从左到右
const compose_normal_left_to_right = (...funcArr) => {
  if (funcArr.length === 0) {
    throw new Error('不传函数你组合你妈呢');
  }
  return function(...args) {
    let len = funcArr.length;
    let result = funcArr[0].call(this, ...args);
    for (let i = 1; i < len; i++) {
      result = funcArr[i].call(this, result);
    }
    return result;
  };
};
let name = 'kevin';
let toUpper = str => str.toUpperCase();
let addHello = str => 'hello ' + str;
let split = str => str.split(' ');
let func = compose_normal_left_to_right(addHello, toUpper, split);
func(name);

//compose从左到右reduce版
const compose_reduce_left_to_right = (...funcArr) => {
  if (funcArr.length === 0) {
    throw new Error('不传函数你组合你妈呢');
  }
  return function(...args) {
    let first = funcArr.shift();
    let result = first.call(this, ...args);
    return funcArr.reduce((acc, cur) => cur.call(this, acc), result);
  };
};
let name = 'kevin';
let toUpper = str => str.toUpperCase();
let addHello = str => 'hello ' + str;
let split = str => str.split(' ');
let func = compose_reduce_left_to_right(addHello, toUpper, split);
func(name);
