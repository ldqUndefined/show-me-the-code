//https://leetcode-cn.com/problems/search-a-2d-matrix-ii/
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function(matrix, target) {
  let row = matrix.length,
    col = matrix[0].length;
  let i = 0,
    j = col - 1;
  while (i < row && j >= 0) {
    if (matrix[i][j] < target) {
      i++;
    } else if (matrix[i][j] > target) {
      j--;
    } else {
      return true;
    }
  }
  return false;
};
