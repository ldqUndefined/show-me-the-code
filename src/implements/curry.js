//curry简单实现
const curry = (fn, ...args) => {
  return (...rest) => {
    return fn(...args, ...rest);
  };
};

//curryES6 基本功能实现
const curry_ES6 = (fn, ...totalArgs) => {
  const judge = (...args) => {
    totalArgs.push(...args);
    if (totalArgs.length >= fn.length) {
      return fn(...totalArgs);
    } else {
      return (...rest) => judge(...rest);
    }
  };
  return judge;
};

const test = (a, b, c, d, e, f, g) => console.log(a, b, c, d, e, f, g, this.g);
const c = curry_ES6(test, 1);
c(2)()()(3)(4, 5, 6)(7, 8);

//curryES6 带this绑定的实现,这里的this绑定只绑定在最后执行的时候
const curry_ES6_this = (fn, ...totalArgs) => {
  const judge = function(...args) {
    totalArgs.push(...args);
    if (totalArgs.length >= fn.length) {
      return fn.apply(this, totalArgs);
    } else {
      return function(...rest) {
        return judge.apply(this, rest);
      };
    }
  };
  return judge;
};

var g = 8888;
const test = function(a, b, c, d, e, f, g) {
  console.log(a, b, c, d, e, f, g, this.g);
};
const obj = { g: 'niupi' };
const c = curry_ES6_this(test, 1);
obj.test = c(2)()()(3)(4, 5);
obj.test(6)(7);
