//https://leetcode-cn.com/problems/find-all-numbers-disappeared-in-an-array/
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findDisappearedNumbers = function(nums) {
  let n = nums.length;
  let result = [];
  for (let i = 0; i < nums.length; i++) {
    let x = (nums[i] - 1) % n;
    nums[x] += n;
  }
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] < n + 1) {
      result.push(i + 1);
    }
  }
  return result;
};
