//https://leetcode-cn.com/problems/shun-shi-zhen-da-yin-ju-zhen-lcof/
/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function(matrix) {
  if (matrix.length === 0) {
    return [];
  }
  let result = [];
  let top = 0,
    bottom = matrix.length - 1,
    left = 0,
    right = matrix[0].length - 1;
  while (left <= right && top <= bottom) {
    for (let j = top; j <= right; j++) {
      result.push(matrix[top][j]);
    }
    top++;
    for (let i = top; i <= bottom; i++) {
      result.push(matrix[i][right]);
    }
    right--;
    if (top <= bottom && left <= right) {
      for (let j = right; j >= left; j--) {
        result.push(matrix[bottom][j]);
      }
      bottom--;
      for (let i = bottom; i >= top; i--) {
        result.push(matrix[i][left]);
      }
      left++;
    }
  }
  return result;
};
