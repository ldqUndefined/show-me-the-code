const swap = (arr, i, j) => {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
};
const partition = (arr, lo, hi) => {
  //pivot是用来分隔的数，cur是比对过程中比arr[pivot]小的数的下一位
  let pivot = lo,
    cur = lo + 1;
  for (let i = cur; i <= hi; i++) {
    if (arr[i] < arr[pivot]) {
      swap(arr, i, cur);
      cur++;
    }
  }
  swap(arr, pivot, cur - 1);
  return cur - 1;
};
const quickSortRecur = (arr, lo, hi) => {
  if (lo >= hi) {
    return;
  }
  let par = partition(arr, lo, hi);
  quickSortRecur(arr, lo, par - 1);
  quickSortRecur(arr, par + 1, hi);
};

const quickSort = arr => {
  quickSortRecur(arr, 0, arr.length - 1);
  return arr;
};

console.log(
  quickSort([
    2,
    1,
    4,
    2,
    5,
    7,
    9,
    6,
    3,
    5,
    77,
    3,
    5,
    2,
    22,
    5,
    2,
    5,
    7,
    22,
    5,
    2,
    5
  ])
);
