//https://leetcode-cn.com/problems/longest-valid-parentheses/
/**
 * @param {string} s
 * @return {number}
 */
var longestValidParentheses = function(s) {
  if (s.length <= 1) {
    return 0;
  }
  let stack = [-1],
    result = 0;
  for (let i = 0; i < s.length; i++) {
    let c = s.charAt(i);
    if (c === '(') {
      stack.push(i);
    } else {
      stack.pop();
      if (stack.length > 0) {
        result = Math.max(result, i - stack[stack.length - 1]);
      } else {
        stack.push(i);
      }
    }
  }
  return result;
};
