//https://leetcode-cn.com/problems/maximal-square/submissions/
/**
 * @param {character[][]} matrix
 * @return {number}
 */
var maximalSquare = function(matrix) {
  let row = matrix.length,
    col = matrix[0].length;
  let result = Array.from({ length: row }, () =>
    Array.from({ length: col }, () => 0)
  );
  let max = 0;
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (matrix[i][j] === '1') {
        if (i == 0 || j == 0) {
          result[i][j] = 1;
        } else {
          result[i][j] =
            Math.min(result[i - 1][j], result[i][j - 1], result[i - 1][j - 1]) +
            1;
        }
        max = Math.max(result[i][j], max);
      }
    }
  }
  return max * max;
};
