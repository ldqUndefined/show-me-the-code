//https:leetcode-cn.com/problems/letter-combinations-of-a-phone-number/
/**
 * @param {string} digits
 * @return {string[]}
 */
const pair = new Map([
  ['2', ['a', 'b', 'c']],
  ['3', ['d', 'e', 'f']],
  ['4', ['g', 'h', 'i']],
  ['5', ['j', 'k', 'l']],
  ['6', ['m', 'n', 'o']],
  ['7', ['p', 'q', 'r', 's']],
  ['8', ['t', 'u', 'v']],
  ['9', ['w', 'x', 'y', 'z']]
]);
const dfs = (digits, index, current, pair, result) => {
  if (index === digits.length) {
    result.push(current);
    return;
  }
  let temp = pair.get(digits[index]);
  for (let c of temp) {
    dfs(digits, index + 1, current + c, pair, result);
  }
};
var letterCombinations = function(digits) {
  if (digits.length === 0) {
    return [];
  }
  let result = [];
  dfs(digits, 0, '', pair, result);
  return result;
};
