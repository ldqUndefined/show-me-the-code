//https://leetcode-cn.com/problems/er-jin-zhi-zhong-1de-ge-shu-lcof/
/**
 * @param {number} n - a positive integer
 * @return {number}
 */
var hammingWeight = function(n) {
  let count = 0;
  while (n) {
    count++;
    n = (n - 1) & n;
  }
  return count;
};
