//https://leetcode-cn.com/problems/shortest-unsorted-continuous-subarray/
/**
 * @param {number[]} nums
 * @return {number}
 */
var findUnsortedSubarray = function(nums) {
  let min = Number.MAX_SAFE_INTEGER,
    max = Number.MIN_SAFE_INTEGER;
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] < nums[i - 1]) {
      min = Math.min(min, nums[i]);
    }
  }
  for (let i = nums.length - 2; i >= 0; i--) {
    if (nums[i] > nums[i + 1]) {
      max = Math.max(max, nums[i]);
    }
  }
  let l = 0,
    r = -1;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > min) {
      l = i;
      break;
    }
  }
  for (let i = nums.length - 1; i >= 0; i--) {
    if (nums[i] < max) {
      r = i;
      break;
    }
  }
  return r - l + 1;
};
