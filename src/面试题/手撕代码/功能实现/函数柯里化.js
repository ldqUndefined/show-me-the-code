//函数柯里化

const curry = (fn, ...args) => {
  return function(...rest) {
    const theArgs = [...args, ...rest];
    if (theArgs.length >= fn.length) {
      return fn.apply(this, theArgs);
    } else {
      return curry(fn, ...theArgs);
    }
  };
};

const a = (b, c, d, f) => {
  console.log(b, c, d, f);
};
const b = curry(a, 1);
b(2, 3)(4);
