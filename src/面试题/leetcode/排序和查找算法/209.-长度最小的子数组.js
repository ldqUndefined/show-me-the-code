//https://leetcode-cn.com/problems/minimum-size-subarray-sum/
/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function(target, nums) {
  let lo = 0,
    hi = 0,
    sum = 0,
    result = nums.length + 1;
  while (hi < nums.length) {
    sum += nums[hi];
    while (sum >= target) {
      result = Math.min(result, hi - lo + 1);
      sum -= nums[lo];
      lo++;
    }
    hi++;
  }
  return result === nums.length + 1 ? 0 : result;
};
