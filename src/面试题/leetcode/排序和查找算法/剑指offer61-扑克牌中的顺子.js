//https://leetcode-cn.com/problems/bu-ke-pai-zhong-de-shun-zi-lcof/
/**
 * @param {number[]} nums
 * @return {boolean}
 */
//最大值和最小值的差值不超过数组长度即可
var isStraight = function(nums) {
  let set = new Set(),
    max = 0,
    min = 14;
  for (let v of nums) {
    if (v !== 0) {
      if (set.has(v)) {
        return false;
      } else {
        min = Math.min(min, v);
        max = Math.max(max, v);
        set.add(v);
      }
    }
  }
  return max - min < nums.length;
};
