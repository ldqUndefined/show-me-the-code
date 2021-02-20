//https://leetcode-cn.com/problems/zhan-de-ya-ru-dan-chu-xu-lie-lcof/submissions/
/**
 * @param {number[]} pushed
 * @param {number[]} popped
 * @return {boolean}
 */
var validateStackSequences = function(pushed, popped) {
  let stack = [];
  let j = 0;
  for (let i = 0; i < pushed.length; i++) {
    stack.push(pushed[i]);
    while (stack.length !== 0 && stack[stack.length - 1] === popped[j]) {
      stack.pop();
      j++;
    }
  }
  return stack.length === 0;
};
