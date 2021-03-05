//https://leetcode-cn.com/problems/merge-intervals/
/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function(intervals) {
  let result = [];
  intervals.sort((a, b) => a[0] - b[0]);
  for (let i = 0; i < intervals.length; i++) {
    let left = intervals[i][0],
      right = intervals[i][1];
    if (result.length === 0 || result[result.length - 1][1] < left) {
      result.push([left, right]);
    } else {
      result[result.length - 1][1] = Math.max(
        right,
        result[result.length - 1][1]
      );
    }
  }
  return result;
};
