//https://leetcode-cn.com/problems/spiral-matrix-ii/
/**
 * @param {number} n
 * @return {number[][]}
 */
var generateMatrix = function(n) {
  const result = Array.from({ length: n }, () => []);
  let count = 1;
  let left = 0,
    top = 0,
    right = n - 1,
    bottom = n - 1;
  while (left <= right && top <= bottom) {
    for (let i = left; i <= right; i++) {
      result[top][i] = count++;
    }
    top++;
    for (let i = top; i <= bottom; i++) {
      result[i][right] = count++;
    }
    right--;
    if (left <= right && top <= bottom) {
      for (let i = right; i >= left; i--) {
        result[bottom][i] = count++;
      }
      bottom--;
      for (let i = bottom; i >= top; i--) {
        result[i][left] = count++;
      }
      left++;
    }
  }
  return result;
};
