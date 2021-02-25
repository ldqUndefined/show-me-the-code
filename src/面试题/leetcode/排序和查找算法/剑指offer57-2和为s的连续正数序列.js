//leetcode-cn.com/problems/he-wei-sde-lian-xu-zheng-shu-xu-lie-lcof/
https: /**
 * @param {number} target
 * @return {number[][]}
 */
var findContinuousSequence = function(target) {
  let lo = 1,
    hi = 2,
    sum = lo + hi,
    result = [];
  while (lo < hi) {
    if (sum < target) {
      hi++;
      sum += hi;
    } else if (sum > target) {
      sum -= lo;
      lo++;
    } else {
      result.push(Array.from({ length: hi - lo + 1 }, (_, i) => lo + i));
      sum -= lo;
      lo++;
    }
  }
  return result;
};
