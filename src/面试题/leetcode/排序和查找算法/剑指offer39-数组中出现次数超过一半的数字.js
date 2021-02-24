//https://leetcode-cn.com/problems/shu-zu-zhong-chu-xian-ci-shu-chao-guo-yi-ban-de-shu-zi-lcof/
/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function(nums) {
  let result,
    time = 0;
  for (let i = 0; i < nums.length; i++) {
    if (time === 0) {
      result = nums[i];
      time++;
    } else if (result === nums[i]) {
      time++;
    } else {
      time--;
    }
  }
  return result;
};
