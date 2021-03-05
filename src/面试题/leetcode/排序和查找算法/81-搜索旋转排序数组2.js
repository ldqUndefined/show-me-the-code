//https://leetcode-cn.com/problems/search-in-rotated-sorted-array-ii/
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {boolean}
 */
var search = function(nums, target) {
  let lo = 0,
    hi = nums.length - 1;
  while (lo <= hi) {
    let mid = Math.floor((lo + hi) / 2);
    if (target === nums[mid]) {
      return true;
    }
    if (nums[mid] === nums[lo]) {
      lo++;
      continue;
    }
    if (nums[mid] > nums[0]) {
      if (target < nums[mid] && target >= nums[lo]) {
        hi = mid - 1;
      } else {
        lo = mid + 1;
      }
    } else {
      if (target > nums[mid] && target <= nums[hi]) {
        lo = mid + 1;
      } else {
        hi = mid - 1;
      }
    }
  }
  return false;
};
