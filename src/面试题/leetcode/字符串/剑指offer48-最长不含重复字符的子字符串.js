//https://leetcode-cn.com/problems/zui-chang-bu-han-zhong-fu-zi-fu-de-zi-zi-fu-chuan-lcof/
/**
 * @param {string} s
 * @return {number}
 */
//O(n2)版，第一次做的，空间O(n)
var lengthOfLongestSubstring = function(s) {
  let max = 0;
  for (let i = 0; i < s.length; i++) {
    let visit = new Set();
    for (let j = i; j < s.length; j++) {
      if (!visit.has(s.charAt(j))) {
        visit.add(s.charAt(j));
        max = Math.max(j - i + 1, max);
      } else {
        break;
      }
    }
  }
  return max;
};
//双指针+Map，时间O(n)
var lengthOfLongestSubstring = function(s) {
  let max = 0,
    map = new Map(),
    first = -1;
  for (let i = 0; i < s.length; i++) {
    let char = s.charAt(i);
    if (map.has(char)) {
      first = Math.max(first, map.get(char));
    }
    map.set(char, i);
    max = Math.max(max, map.get(char) - first);
  }
  return max;
};
