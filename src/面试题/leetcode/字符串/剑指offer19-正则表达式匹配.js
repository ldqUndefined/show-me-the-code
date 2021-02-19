//https://leetcode-cn.com/problems/zheng-ze-biao-da-shi-pi-pei-lcof/
/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function(s, p) {
  const travelRecur = (s, p, k, l) => {
    if (p.length === l) {
      return s.length === k;
    }
    const currentMatch =
      s.length !== k && (s.charAt(k) === p.charAt(l) || p.charAt(l) === '.');
    if (l + 1 < p.length && p.charAt(l + 1) === '*') {
      return (
        travelRecur(s, p, k, l + 2) ||
        (currentMatch && travelRecur(s, p, k + 1, l))
      );
    } else {
      return currentMatch && travelRecur(s, p, k + 1, l + 1);
    }
  };
  return travelRecur(s, p, 0, 0);
};
