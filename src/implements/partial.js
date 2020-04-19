//偏函数ES6实现

const partial = (fn, ...firstArg) => {
  return function(...restArg) {
    return fn.apply(this, [...firstArg, ...restArg]);
  };
};
