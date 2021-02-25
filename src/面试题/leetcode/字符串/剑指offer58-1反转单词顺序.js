//https://leetcode-cn.com/problems/fan-zhuan-dan-ci-shun-xu-lcof/
/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function(s) {
  let lo = 0,
    hi = 0,
    result = [];
  while (hi < s.length && s.charAt(hi) === ' ') {
    hi++;
  }
  lo = hi;
  while (lo < s.length) {
    while (hi < s.length && s.charAt(hi) !== ' ') {
      hi++;
    }
    result.push(s.slice(lo, hi));
    while (hi < s.length && s.charAt(hi) === ' ') {
      hi++;
    }
    lo = hi;
  }
  return result.reverse().join(' ');
};
