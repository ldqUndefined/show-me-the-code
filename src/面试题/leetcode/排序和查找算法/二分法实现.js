const binarySearch = (arr, target) => {
  let lo = 0,
    hi = arr.length;
  while (lo <= hi) {
    let mid = Math.floor((lo + hi) / 2);
    if (arr[mid] > target) {
      hi = mid - 1;
    } else if (arr[mid] < target) {
      lo = mid + 1;
    } else {
      return mid;
    }
  }
  return -1;
};
