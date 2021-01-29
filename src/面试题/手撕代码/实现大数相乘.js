const bigNumMulti = (num1, num2) => {
  if ((num1 === '0') | (num2 === '0')) {
    return '0';
  }
  let carry = 0;
  let result = Array.from({ length: num1.length + num2.length - 1 }, () => 0);
  for (let i = num1.length - 1; i >= 0; i--) {
    for (let j = num2.length - 1; j >= 0; j--) {
      let digit = Number(num1.charAt(i)) * Number(num2.charAt(j));
      let current = result[i + j] + digit + carry;
      result[i + j] = current % 10;
      carry = Math.floor(current / 10);
    }
    if (i - 1 >= 0) {
      //这轮结束进位直接放给下级并把进位清除
      result[i - 1] = result[i - 1] + carry;
      carry = 0;
    }
  }
  result = result.join('');
  return carry > 0 ? carry + result : result;
};
console.log(bigNumMulti('8968967986789', '5978567895897'));
console.log(8968967986789n * 5978567895897n);
