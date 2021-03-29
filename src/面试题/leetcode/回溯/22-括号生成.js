//https://leetcode-cn.com/problems/generate-parentheses/
/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function(n) {
  let result = [];
  const dfs = (left, right, temp) => {
    if (left === 0 && right === 0) {
      result.push(temp);
      return;
    }
    if (left > 0) {
      dfs(left - 1, right, temp + '(');
    }
    if (right > left) {
      dfs(left, right - 1, temp + ')');
    }
  };
  dfs(n, n, '');
  return result;
};
