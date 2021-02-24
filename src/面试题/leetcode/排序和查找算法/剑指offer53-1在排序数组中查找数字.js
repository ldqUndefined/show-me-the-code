//https://leetcode-cn.com/problems/zai-pai-xu-shu-zu-zhong-cha-zhao-shu-zi-lcof/
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
  let lo = 0,
    hi = nums.length - 1;
  while (lo <= hi) {
    let mid = Math.floor((lo + hi) / 2);
    if (nums[mid] < target) {
      lo = mid + 1;
    } else if (nums[mid] > target) {
      hi = mid - 1;
    } else {
      while (mid > 0 && nums[mid - 1] === target) {
        mid--;
      }
      let count = 0;
      for (let i = mid; i < nums.length; i++) {
        if (nums[i] === target) {
          count++;
        } else {
          break;
        }
      }
      return count;
    }
  }
  return 0;
};
