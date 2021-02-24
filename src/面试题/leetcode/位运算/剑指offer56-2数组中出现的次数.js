//https://leetcode-cn.com/problems/shu-zu-zhong-shu-zi-chu-xian-de-ci-shu-ii-lcof/
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
  let digit = Array.from({ length: 32 }, () => 0);
  for (let v of nums) {
    for (let i = 0; i < 32; i++) {
      if (v > 0) {
        digit[i] += v & 1;
        v >>= 1;
      } else {
        break;
      }
    }
  }
  let result = 0,
    time = 1;
  for (let i = 0; i < 32; i++) {
    result += (digit[i] % 3) * time;
    time <<= 1;
  }
  return result;
};
