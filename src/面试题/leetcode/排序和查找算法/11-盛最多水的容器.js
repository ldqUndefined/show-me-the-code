//https:leetcode-cn.com/problems/container-with-most-water/
/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
  let lo = 0,
    hi = height.length - 1,
    result = 0;
  while (lo < hi) {
    result = Math.max(result, (hi - lo) * Math.min(height[lo], height[hi]));
    if (height[lo] < height[hi]) {
      lo++;
    } else {
      hi--;
    }
  }
  return result;
};
