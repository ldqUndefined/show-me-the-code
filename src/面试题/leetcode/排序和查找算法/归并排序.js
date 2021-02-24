const merge = (arr, lo, mid, hi, temp) => {
  let i = lo,
    j = mid + 1,
    cur = lo;
  while (i <= mid && j <= hi) {
    if (arr[i] < arr[j]) {
      temp[cur++] = arr[i++];
    } else {
      temp[cur++] = arr[j++];
    }
  }
  while (i <= mid) {
    temp[cur++] = arr[i++];
  }
  while (j <= hi) {
    temp[cur++] = arr[j++];
  }
  cur = lo;
  while (cur <= hi) {
    arr[cur] = temp[cur];
    cur++;
  }
};
const mergeSortRecur = (arr, lo, hi, temp) => {
  if (lo < hi) {
    let mid = Math.floor((lo + hi) / 2);
    mergeSortRecur(arr, lo, mid, temp);
    mergeSortRecur(arr, mid + 1, hi, temp);
    merge(arr, lo, mid, hi, temp);
  }
};
const mergeSort = arr => {
  mergeSortRecur(arr, 0, arr.length - 1, []);
  return arr;
};

console.log(
  mergeSort([
    412,
    6,
    3,
    6,
    2,
    72,
    1,
    6,
    3,
    6,
    1,
    61,
    64,
    3643,
    643,
    1,
    6,
    7,
    613,
    72,
    658
  ])
);
