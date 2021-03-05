//https://leetcode-cn.com/problems/longest-palindromic-substring/
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
  let n = s.length;
  let arr = Array.from({ length: n }, () => []),
    result = '';
  for (let len = 0; len < n; len++) {
    for (let i = 0; i < n - len; i++) {
      let j = i + len;
      if (len === 0) {
        arr[i][j] = true;
      } else if (len === 1) {
        arr[i][j] = s.charAt(i) === s.charAt(j);
      } else {
        arr[i][j] = arr[i + 1][j - 1] && s.charAt(i) === s.charAt(j);
      }
      if (arr[i][j] && len + 1 > result.length) {
        result = s.slice(i, j + 1);
      }
    }
  }
  return result;
};
