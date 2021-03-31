//https://leetcode-cn.com/problems/move-zeroes/
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function(nums) {
  let replaceIndex = (zeroNum = 0);
  let len = nums.length;
  for (let i = 0; i < len; i++) {
    if (nums[i] === 0) {
      zeroNum++;
    } else {
      nums[replaceIndex++] = nums[i];
    }
  }
  while (zeroNum-- > 0) {
    nums[--len] = 0;
  }
};
