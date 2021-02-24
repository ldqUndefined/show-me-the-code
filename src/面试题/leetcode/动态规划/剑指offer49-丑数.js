//https://leetcode-cn.com/problems/chou-shu-lcof/
/**
 * @param {number} n
 * @return {number}
 */
var nthUglyNumber = function(n) {
  let result = [1],
    i = 0,
    j = 0,
    k = 0;
  for (let index = 1; index < n; index++) {
    let min = Math.min(result[i] * 2, result[j] * 3, result[k] * 5);
    result[index] = min;
    if (min === result[i] * 2) {
      i++;
    }
    if (min === result[j] * 3) {
      j++;
    }
    if (min === result[k] * 5) {
      k++;
    }
  }
  return result[result.length - 1];
};
