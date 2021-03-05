//https://leetcode-cn.com/problems/rotate-image/
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function(matrix) {
  let n = matrix.length;
  let left = 0,
    top = 0,
    right = matrix[0].length - 1,
    bottom = matrix.length - 1;
  while (left < right && top < bottom) {
    let i = 0,
      level = right - left;
    while (i < level) {
      let temp = matrix[top][left + i];
      matrix[top][left + i] = matrix[bottom - i][left];
      matrix[bottom - i][left] = matrix[bottom][right - i];
      matrix[bottom][right - i] = matrix[top + i][right];
      matrix[top + i][right] = temp;
      i++;
    }
    left++;
    right--;
    top++;
    bottom--;
  }
};
