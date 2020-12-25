//求一个对象的层级数

//递归版
const getLevel = obj => {
  let max = 0;
  const recure = (obj, level) => {
    if (typeof obj !== 'object' || obj === null) {
      return;
    }
    level++;
    max = Math.max(max, level);
    for (let key of Object.keys(obj)) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        recure(obj[key], level);
      }
    }
  };
  recure(obj, 0);
  return max;
};

let a = {
  a: {
    a: { a: 1 }
  }
};
let b = {
  b: 1,
  a: 2,
  c: {
    a: 2
  },
  d: {
    a: 11,
    b: 22,
    d: 33,
    e: {
      a: 'fdsa'
    }
  }
};
getLevel(a);
getLevel(b);

//循环版
const getLevel2 = obj => {
  if (typeof obj !== 'object' || obj === null) {
    return 0;
  }
  const queue = [obj];
  let level = 0;
  while (queue.length > 0) {
    let count = queue.length;
    while (count-- > 0) {
      const value = queue.shift();
      for (let key of Object.keys(value)) {
        if (Object.prototype.hasOwnProperty.call(value, key)) {
          if (typeof value[key] === 'object' && value[key] !== null) {
            queue.push(value[key]);
          }
        }
      }
    }
    level++;
  }
  return level;
};
