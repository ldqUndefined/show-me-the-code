//返回长度为N的菲波那切数组
const fib = n => {
  if (n === 0) {
    return [];
  } else if (n === 1) {
    return [0];
  } else if (n === 2) {
    return [0, 1];
  }
  let result = [0, 1];
  for (let i = 2; i < n; i++) {
    result[i] = result[i - 1] + result[i - 2];
  }
  return result;
};
console.log(fib(6));
