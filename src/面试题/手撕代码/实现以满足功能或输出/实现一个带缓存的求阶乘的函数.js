//实现一个带缓存的求阶乘的函数
const factorial = num => {
  if (factorial[num]) {
    console.log('直接命中');
    return factorial[num];
  }
  let result = num;
  for (let i = num - 1; i >= 1; i--) {
    if (factorial[i]) {
      console.log('过程命中 命中了' + i);
      result *= factorial[i];
      factorial[num] = result;
      return result;
    } else {
      result *= i;
    }
  }
  console.log('没有缓存' + num);
  factorial[num] = result;
  return result;
};
console.log(factorial(3));
console.log(factorial(5));
console.log(factorial(4));
console.log(factorial(7));
console.log(factorial(6));
console.log(factorial(6));
