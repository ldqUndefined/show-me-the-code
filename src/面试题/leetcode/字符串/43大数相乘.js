//https:leetcode-cn.com/problems/multiply-strings/submissions/
/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var multiply = function(num1, num2) {
  if (num1 === '0' || num2 === '0') {
    return '0';
  }
  let result = Array.from({ length: num1.length + num2.length }, () => 0),
    carry = 0;
  for (let i = num1.length - 1; i >= 0; i--) {
    let a = num1.charAt(i) - '0';
    for (let j = num2.length - 1; j >= 0; j--) {
      let b = num2.charAt(j) - '0';
      let mult = a * b + carry + result[i + j + 1];
      result[i + j + 1] = mult % 10;
      result[i + j] = result[i + j] + Math.floor(mult / 10);
    }
  }
  if (result[0] === 0) {
    result.shift();
  }
  return result.join('');
};
