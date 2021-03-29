//https://leetcode-cn.com/problems/palindromic-substrings/
/**
 * @param {string} s
 * @return {number}
 */
var countSubstrings = function(s) {
  let result = 0;
  let arr = Array.from({ length: s.length }, () => []);
  for (let len = 1; len <= s.length; len++) {
    for (let head = 0; head <= s.length - len; head++) {
      let end = head + len - 1;
      if (len === 1) {
        arr[head][end] = true;
      } else if (len === 2) {
        arr[head][end] = s.charAt(head) === s.charAt(end);
      } else {
        arr[head][end] =
          s.charAt(head) === s.charAt(end) && arr[head + 1][end - 1];
      }
      if (arr[head][end]) {
        result++;
      }
    }
  }
  return result;
};
