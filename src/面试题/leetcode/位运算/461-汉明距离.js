//https://leetcode-cn.com/problems/hamming-distance/
/**
 * @param {number} x
 * @param {number} y
 * @return {number}
 */
var hammingDistance = function(x, y) {
  let num = x ^ y;
  let result = 0;
  while (num) {
    num = num & (num - 1);
    result++;
  }
  return result;
};
