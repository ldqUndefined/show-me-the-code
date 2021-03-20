//https://leetcode-cn.com/problems/sort-colors/
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
const swap = (arr, i, j) => {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
};
var sortColors = function(nums) {
  let lo = 0,
    hi = nums.length - 1;
  for (let i = 0; i <= hi; i++) {
    while (i <= hi && nums[i] === 2) {
      swap(nums, i, hi);
      hi--;
    }
    if (nums[i] === 0) {
      swap(nums, i, lo);
      lo++;
    }
  }
};
