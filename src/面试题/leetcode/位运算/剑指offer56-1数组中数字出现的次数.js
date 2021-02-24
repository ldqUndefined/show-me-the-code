//https://leetcode-cn.com/problems/shu-zu-zhong-shu-zi-chu-xian-de-ci-shu-lcof/
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var singleNumbers = function(nums) {
  let result = 0;
  for (let i = 0; i < nums.length; i++) {
    result ^= nums[i];
  }
  let divide = 1;
  while ((divide & result) === 0) {
    divide <<= 1;
  }
  let a = 0,
    b = 0;
  for (let i = 0; i < nums.length; i++) {
    if ((divide & nums[i]) === 0) {
      a ^= nums[i];
    } else {
      b ^= nums[i];
    }
  }
  return [a, b];
};
