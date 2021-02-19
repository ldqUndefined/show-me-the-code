//https://leetcode-cn.com/problems/shu-zu-zhong-zhong-fu-de-shu-zi-lcof/
/**
 * @param {number[]} nums
 * @return {number}
 */
var findRepeatNumber = function(nums) {
  let i = 0,
    len = nums.length;
  while (i < len) {
    while (nums[i] !== i) {
      let temp = nums[i];
      if (temp === nums[temp]) {
        return temp;
      } else {
        nums[i] = nums[temp];
        nums[temp] = temp;
      }
    }
    i++;
  }
};
