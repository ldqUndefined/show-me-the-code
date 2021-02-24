//https://leetcode-cn.com/problems/di-yi-ge-zhi-chu-xian-yi-ci-de-zi-fu-lcof/
/**
 * @param {string} s
 * @return {character}
 */
var firstUniqChar = function(s) {
  let map = new Map();
  for (let i = 0; i < s.length; i++) {
    let char = s.charAt(i);
    map.set(char, map.has(char) ? false : true);
  }
  for (let [c, v] of map.entries()) {
    if (v) {
      return c;
    }
  }
  return ' ';
};
