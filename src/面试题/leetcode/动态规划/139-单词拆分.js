//https://leetcode-cn.com/problems/word-break/
/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function(s, wordDict) {
  let set = new Set(wordDict);
  let result = Array.from({ length: s.length + 1 }, () => false);
  result[0] = true;
  for (let i = 1; i <= s.length; i++) {
    for (let j = 0; j < i; j++) {
      if (result[j] && set.has(s.slice(j, i))) {
        result[i] = true;
        break;
      }
    }
  }
  return result[s.length];
};
