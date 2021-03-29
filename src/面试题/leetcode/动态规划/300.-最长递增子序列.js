//https://leetcode-cn.com/problems/longest-increasing-subsequence/
/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function(nums) {
  let max = 1;
  if (nums.length <= 1) {
    return nums.length;
  }
  const result = Array.from({ length: nums.length }, () => 1);
  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        result[i] = Math.max(result[i], result[j] + 1);
      }
    }
    max = Math.max(max, result[i]);
  }
  return max;
};
