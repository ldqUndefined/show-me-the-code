//https://leetcode-cn.com/problems/zui-xiao-de-kge-shu-lcof/
/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number[]}
 */
const swap = (arr, i, j) => {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
};
const partition = (arr, lo, hi) => {
  let pivot = lo,
    minRight = lo + 1;
  for (let i = minRight; i <= hi; i++) {
    if (arr[i] < arr[pivot]) {
      swap(arr, i, minRight);
      minRight++;
    }
  }
  swap(arr, pivot, minRight - 1);
  return minRight - 1;
};
const quickSort = (arr, lo, hi, k) => {
  if (lo >= hi) {
    return;
  }
  let par = partition(arr, lo, hi);
  let num = par - lo + 1;
  if (num === k) {
    return;
  } else if (num > k) {
    quickSort(arr, lo, hi - 1, k);
  } else {
    quickSort(arr, par + 1, hi, k - num);
  }
};

var getLeastNumbers = function(arr, k) {
  quickSort(arr, 0, arr.length - 1, k);
  return arr.slice(0, k);
};
