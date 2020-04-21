//ES6 memoize最基础实现
//有bug，参数数字类型和字符串类型的key有可能相同，对象的key也相同
const momoize = func => {
  const cache = {};
  return function(...args) {
    let key = args.length + args.toString();
    console.log(key);
    if (!cache[key]) {
      cache[key] = func.apply(this, args);
    }
    return cache[key];
  };
};

let test = (a, b, c) => {
  console.log('call');
  return a + b + c;
};
let me = momoize(test);
me(1, 2, 3);
me(1, 2, 3);
me('1', 2, 3); //bug

let testObj = obj => {
  console.log('call');
  return obj.name;
};
let me2 = momoize(testObj);
me2({ name: 'haha' });
me2({ name: 'fdsa' }); //bug {}.toString = [object Object]

//ES6 带hash函数的memoize

function stringifyHash(...args) {
  return JSON.stringify(args);
}

const memoize = (func, hash = stringifyHash) => {
  const memo = function(...args) {
    const cache = memo.cache;
    const key = '' + hash.apply(this, args); //转为字符串
    console.log(key);
    if (!cache[key]) {
      cache[key] = func.apply(this, args);
    }
    return cache[key];
  };
  memo.cache = {};
  return memo;
};

let add = (a, b, c) => {
  console.log('call');
  return a + b + c;
};
let me3 = memoize(add);
me3(1, 2, 3);
me3(1, 2, 4);
me3('1', 2, 3);

let testObj2 = obj => {
  console.log('call');
  return obj.name;
};
let me4 = memoize(testObj2);
me4({ name: 'fdsa' });
me4({ name: 'fdsa' });
me4({ name: 423 });
