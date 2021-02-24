//https://leetcode-cn.com/problems/zi-fu-chuan-de-pai-lie-lcof/
/**
 * @param {string} s
 * @return {string[]}
 */
var permutation = function(s) {
  let arr = s.split('');
  let temp = '';
  let result = [];
  const swap = (array, i, j) => {
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  };
  const dfs = index => {
    if (index === arr.length - 1) {
      result.push(temp + arr[index]);
    }
    let set = new Set();
    for (let i = index; i < arr.length; i++) {
      if (set.has(arr[i])) {
        continue;
      }
      set.add(arr[i]);
      swap(arr, i, index);
      temp += arr[index];
      dfs(index + 1);
      temp = temp.slice(0, temp.length - 1);
      swap(arr, i, index);
    }
  };
  dfs(0);
  return result;
};
