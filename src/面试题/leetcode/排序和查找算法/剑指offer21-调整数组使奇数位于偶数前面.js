//https://leetcode-cn.com/problems/diao-zheng-shu-zu-shun-xu-shi-qi-shu-wei-yu-ou-shu-qian-mian-lcof/
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var exchange = function(nums) {
  let lo = 0,
    hi = nums.length - 1;
  while (lo < hi) {
    while (nums[lo] % 2 === 1) {
      lo++;
    }
    while (nums[hi] % 2 === 0) {
      hi--;
    }
    if (lo < hi) {
      let temp = nums[lo];
      nums[lo] = nums[hi];
      nums[hi] = temp;
    }
  }
  return nums;
};
