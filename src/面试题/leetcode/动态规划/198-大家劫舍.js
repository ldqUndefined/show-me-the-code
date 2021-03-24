//https://leetcode-cn.com/problems/house-robber/
/**
 * @param {number[]} nums
 * @return {number}
 */
//O(n)空间版
var rob = function(nums) {
  if (nums.length === 1) {
    return nums[0];
  } else if (nums.length === 2) {
    return Math.max(nums[0], nums[1]);
  }
  let result = [];
  result[0] = nums[0];
  result[1] = Math.max(nums[0], nums[1]);
  for (let i = 2; i < nums.length; i++) {
    result[i] = Math.max(result[i - 2] + nums[i], result[i - 1]);
  }
  return result[result.length - 1];
};
//常数空间优化版
var rob = function(nums) {
  if (nums.length === 1) {
    return nums[0];
  } else if (nums.length === 2) {
    return Math.max(nums[0], nums[1]);
  }
  let first = nums[0];
  let second = Math.max(nums[0], nums[1]);
  for (let i = 2; i < nums.length; i++) {
    let temp = Math.max(first + nums[i], second);
    first = second;
    second = temp;
  }
  return second;
};
