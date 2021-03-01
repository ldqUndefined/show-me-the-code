//https://leetcode-cn.com/problems/3sum/
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
  if (nums.length <= 2) {
    return [];
  }
  nums.sort((a, b) => a - b);
  let result = [];
  for (let i = 0; i < nums.length - 2; i++) {
    if (nums[i] > 0 || (i > 0 && nums[i] === nums[i - 1])) {
      continue;
    }
    let lo = i + 1,
      hi = nums.length - 1;
    while (lo < hi) {
      if (nums[i] + nums[lo] + nums[hi] === 0) {
        result.push([nums[i], nums[lo], nums[hi]]);
        while (hi > 0 && nums[hi] === nums[hi - 1]) {
          hi--;
        }
        hi--;
      } else if (nums[i] + nums[lo] + nums[hi] < 0) {
        lo++;
      } else {
        hi--;
      }
    }
  }
  return result;
};
