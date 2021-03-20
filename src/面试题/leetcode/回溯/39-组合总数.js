//https://leetcode-cn.com/problems/combination-sum/
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
const dfs = (candidates, target, index, currentArr, result) => {
  if (index >= candidates.length) {
    return;
  }
  if (target === 0) {
    result.push([...currentArr]);
    return;
  }
  dfs(candidates, target, index + 1, currentArr, result);
  if (target - candidates[index] >= 0) {
    currentArr.push(candidates[index]);
    dfs(candidates, target - candidates[index], index, currentArr, result);
    currentArr.pop();
  }
};
var combinationSum = function(candidates, target) {
  const result = [];
  dfs(candidates, target, 0, [], result);
  return result;
};
