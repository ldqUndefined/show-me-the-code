//https://leetcode-cn.com/problems/add-strings/
/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var addStrings = function(num1, num2) {
  let i = num1.length - 1,
    j = num2.length - 1,
    carry = 0,
    result = '';
  while (i >= 0 || j >= 0 || carry > 0) {
    let a = i >= 0 ? num1.charAt(i) - '0' : 0;
    let b = j >= 0 ? num2.charAt(j) - '0' : 0;
    let sum = a + b + carry;
    let temp = sum % 10;
    carry = sum >= 10 ? 1 : 0;
    result = temp + result;
    i--;
    j--;
  }
  return result;
};
