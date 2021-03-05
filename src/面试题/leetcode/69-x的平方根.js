//https://leetcode-cn.com/problems/sqrtx/
/**
 * @param {number} x
 * @return {number}
 */
var mySqrt = function(x) {
  let i = 0;
  while (i <= x) {
    if (i * i <= x && (i + 1) * (i + 1) > x) {
      return i;
    }
    i++;
  }
  return i;
};
