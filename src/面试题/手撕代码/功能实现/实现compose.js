//函数从右到左组合
const compose = (...fns) => {
  if (fns.length === 0) {
    return v => v;
  }
  if (fns.length === 1) {
    return fns[0];
  }
  return fns.reduce((acc, cur) => (...args) => acc(cur(...args)));
};

const compose1 = (...fns) => {
  if (fns.length === 0) {
    return v => v;
  }
  if (fns.length === 1) {
    return fns[0];
  }
  return fns.reduceRight((acc, cur) => (...args) => cur(acc(...args)));
};
