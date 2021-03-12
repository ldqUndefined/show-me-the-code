//https://leetcode-cn.com/problems/next-permutation/
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
const swap = (arr, i, j) => {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
};
const reverse = (arr, lo, hi) => {
  while (lo < hi) {
    swap(arr, lo, hi);
    lo++;
    hi--;
  }
};
var nextPermutation = function(nums) {
  let cur = nums.length - 2;
  while (cur >= 0 && nums[cur] >= nums[cur + 1]) {
    cur--;
  }
  if (cur >= 0) {
    for (let i = nums.length - 1; i > cur; i--) {
      if (nums[i] > nums[cur]) {
        swap(nums, i, cur);
        break;
      }
    }
  }
  reverse(nums, cur + 1, nums.length - 1);
};
