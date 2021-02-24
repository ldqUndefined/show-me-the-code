//https://leetcode-cn.com/problems/1nzheng-shu-zhong-1chu-xian-de-ci-shu-lcof/
/**
 * @param {number} n
 * @return {number}
 */
var countDigitOne = function(n) {
  let hi = Math.floor(n / 10),
    result = 0,
    lo = 0,
    digit = 1,
    cur = n % 10;
  while (hi !== 0 || cur !== 0) {
    if (cur === 0) {
      result += hi * digit;
    } else if (cur === 1) {
      result += hi * digit + lo + 1;
    } else {
      result += (hi + 1) * digit;
    }
    lo = lo + cur * digit;
    cur = hi % 10;
    hi = Math.floor(hi / 10);
    digit = digit * 10;
  }
  return result;
};
