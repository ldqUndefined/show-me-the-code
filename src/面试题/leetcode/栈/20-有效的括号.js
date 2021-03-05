//https://leetcode-cn.com/problems/valid-parentheses/
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
  let stack = [];
  for (let i = 0; i < s.length; i++) {
    let char = s.charAt(i);
    if (char === '(' || char === '[' || char === '{') {
      stack.push(char);
    } else if (stack.length === 0) {
      return false;
    } else {
      let top = stack.pop();
      if (
        (char === ')' && top === '(') ||
        (char === ']' && top === '[') ||
        (char === '}' && top === '{')
      ) {
        continue;
      } else {
        return false;
      }
    }
  }
  return stack.length === 0;
};
