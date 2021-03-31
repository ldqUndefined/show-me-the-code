//https://leetcode-cn.com/problems/partition-array-into-three-parts-with-equal-sum/
/**
 * @param {number[]} arr
 * @return {boolean}
 */
var canThreePartsEqualSum = function(arr) {
  let total = arr.reduce((acc, cur) => acc + cur, 0);
  if (total % 3 !== 0) {
    return false;
  }
  let target = total / 3;
  let cur = 0,
    tempSum = 0;
  while (cur < arr.length) {
    tempSum += arr[cur];
    if (tempSum === target) {
      break;
    }
    cur++;
  }
  if (cur === arr.length) {
    return false;
  }
  cur++;
  while (cur < arr.length - 1) {
    tempSum += arr[cur];
    if (tempSum === target * 2) {
      return true;
    }
    cur++;
  }
  return false;
};
