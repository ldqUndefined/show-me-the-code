//https://leetcode-cn.com/problems/group-anagrams/
/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
  let map = new Map(),
    result = [];
  for (let s of strs) {
    let sortS = s
      .split('')
      .sort()
      .join('');
    let tempArr = map.get(sortS);
    if (!tempArr) {
      tempArr = [];
      map.set(sortS, tempArr);
    }
    tempArr.push(s);
  }
  for (let v of map.values()) {
    result.push(v);
  }
  return result;
};
