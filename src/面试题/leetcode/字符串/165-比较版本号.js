//https://leetcode-cn.com/problems/compare-version-numbers/
/**
 * @param {string} version1
 * @param {string} version2
 * @return {number}
 */
const realNum = s => {
  while (s.length > 1 && s.charAt(0) === '0') {
    s = s.slice(1);
  }
  return s;
};
var compareVersion = function(version1, version2) {
  let s1 = version1.split('.'),
    s2 = version2.split('.');
  let i = 0,
    j = 0;
  while (i < s1.length || j < s2.length) {
    let iChar = Number(i < s1.length ? realNum(s1[i]) : '0');
    let jChar = Number(j < s2.length ? realNum(s2[j]) : '0');
    if (iChar < jChar) {
      return -1;
    }
    if (iChar > jChar) {
      return 1;
    }
    i++;
    j++;
  }
  return 0;
};
