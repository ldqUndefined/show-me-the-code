//https://leetcode-cn.com/problems/bu-ke-pai-zhong-de-shun-zi-lcof/
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var isStraight = function(nums) {
  let max = 0,
    min = 14;
  const set = new Set();
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      if (set.has(nums[i])) {
        return false;
      } else {
        set.add(nums[i]);
        max = Math.max(max, nums[i]);
        min = Math.min(min, nums[i]);
      }
    }
  }
  return max - min < 5;
};
