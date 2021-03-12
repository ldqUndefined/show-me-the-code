//https://leetcode-cn.com/problems/find-first-and-last-position-of-element-in-sorted-array/
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
const binary = (arr, target, ifEqual) => {
  let lo = 0,
    hi = arr.length - 1,
    ans = arr.length;
  while (lo <= hi) {
    let mid = Math.floor((lo + hi) / 2);
    if (arr[mid] > target || (ifEqual && arr[mid] >= target)) {
      hi = mid - 1;
      ans = mid;
    } else {
      lo = mid + 1;
    }
  }
  return ans;
};
var searchRange = function(nums, target) {
  let leftIndex = binary(nums, target, true);
  let rightIndex = binary(nums, target, false) - 1;
  if (
    leftIndex <= rightIndex &&
    rightIndex < nums.length &&
    nums[leftIndex] === target &&
    nums[rightIndex] === target
  ) {
    return [leftIndex, rightIndex];
  }
  return [-1, -1];
};
