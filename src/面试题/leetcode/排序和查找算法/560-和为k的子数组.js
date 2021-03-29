//https://leetcode-cn.com/problems/subarray-sum-equals-k/
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function(nums, k) {
  let result = 0,
    map = new Map(),
    pre = 0;
  map.set(0, 1);
  for (let i = 0; i < nums.length; i++) {
    pre += nums[i];
    result += map.get(pre - k) || 0;
    map.set(pre, (map.get(pre) || 0) + 1);
  }
  return result;
};
