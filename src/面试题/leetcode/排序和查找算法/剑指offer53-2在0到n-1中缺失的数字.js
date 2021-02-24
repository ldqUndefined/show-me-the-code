//https://leetcode-cn.com/problems/que-shi-de-shu-zi-lcof/
/**
 * @param {number[]} nums
 * @return {number}
 */
//不该写的答案，因为时间是O(n)
var missingNumber = function(nums) {
  let n = nums.length;
  let total = (n * (n + 1)) / 2;
  let sum = nums.reduce((acc, cur) => acc + cur, 0);
  return total - sum;
};

//二分法找答案,O(logN)
var missingNumber = function(nums) {
  let lo = 0,
    hi = nums.length - 1;
  while (lo <= hi) {
    let mid = Math.floor((lo + hi) / 2);
    if (mid === nums[mid]) {
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }
  return lo;
};
