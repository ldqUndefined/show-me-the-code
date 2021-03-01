//https://leetcode-cn.com/problems/two-sum/
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
  let visit = new Map();
  for (let i = 0; i < nums.length; i++) {
    if (visit.has(nums[i])) {
      return [i, visit.get(nums[i])];
    }
    visit.set(target - nums[i], i);
  }
};
