//https://leetcode-cn.com/problems/he-wei-sde-liang-ge-shu-zi-lcof/
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
  let lo = 0,
    hi = nums.length - 1;
  while (lo <= hi) {
    if (nums[lo] + nums[hi] < target) {
      lo++;
    } else if (nums[lo] + nums[hi] > target) {
      hi--;
    } else {
      return [nums[lo], nums[hi]];
    }
  }
};
