//https://leetcode-cn.com/problems/li-wu-de-zui-da-jie-zhi-lcof/
/**
 * @param {number[][]} grid
 * @return {number}
 */

var maxValue = function(grid) {
  let row = grid.length,
    column = grid[0].length;
  for (let i = 1; i < row; i++) {
    grid[i][0] = grid[i][0] + grid[i - 1][0];
  }
  for (let i = 1; i < column; i++) {
    grid[0][i] = grid[0][i] + grid[0][i - 1];
  }
  for (let i = 1; i < row; i++) {
    for (let j = 1; j < column; j++) {
      grid[i][j] = Math.max(grid[i - 1][j], grid[i][j - 1]) + grid[i][j];
    }
  }
  return grid[row - 1][column - 1];
};
