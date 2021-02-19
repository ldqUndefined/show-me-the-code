//https://leetcode-cn.com/problems/er-wei-shu-zu-zhong-de-cha-zhao-lcof/
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var findNumberIn2DArray = function(matrix, target) {
  if (matrix.length === 0) {
    return false;
  }
  let i = 0,
    j = matrix[0].length - 1,
    row = matrix.length,
    column = matrix[0].length;
  while (i >= 0 && i < row && j >= 0 && j < column) {
    if (target < matrix[i][j]) {
      j--;
    } else if (target > matrix[i][j]) {
      i++;
    } else {
      return true;
    }
  }
  return false;
};
