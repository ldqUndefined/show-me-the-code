//https://leetcode-cn.com/problems/jian-sheng-zi-lcof/
/**
 * @param {number} n
 * @return {number}
 */
var cuttingRope = function(n) {
  if (n === 2) {
    return 1;
  }
  if (n === 3) {
    return 2;
  }
  let result = new Array(n + 1).fill(0);
  result[1] = 1;
  result[2] = 2;
  result[3] = 3;
  for (let i = 4; i <= n; i++) {
    let max = 0;
    for (let j = 1; j <= Math.floor(i / 2); j++) {
      max = Math.max(max, result[j] * result[i - j]);
    }
    result[i] = max;
  }
  return result[n];
};
