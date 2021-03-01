//https://leetcode-cn.com/problems/kth-largest-element-in-an-array/
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const swap = (arr, i, j) => {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
};
const partition = (arr, lo, hi) => {
  let pivot = lo,
    cur = lo + 1;
  for (let i = lo + 1; i <= hi; i++) {
    if (arr[i] > arr[pivot]) {
      swap(arr, i, cur);
      cur++;
    }
  }
  swap(arr, cur - 1, pivot);
  return cur - 1;
};
//测试用例好像偏有序，所以我们直接以最左为轴性能很低，随机之后性能好
const randomPartition = (arr, lo, hi) => {
  const i = Math.floor(Math.random() * (hi - lo + 1));
  swap(arr, lo, lo + i);
  return partition(arr, lo, hi);
};
const quickSort = (arr, lo, hi, k) => {
  if (lo >= hi) {
    return arr[lo];
  }
  let par = randomPartition(arr, lo, hi);
  let num = par - lo + 1;
  if (num === k) {
    return arr[par];
  } else if (num < k) {
    return quickSort(arr, par + 1, hi, k - num);
  } else {
    return quickSort(arr, lo, par - 1, k);
  }
};
var findKthLargest = function(nums, k) {
  return quickSort(nums, 0, nums.length - 1, k);
};
