//https://leetcode-cn.com/problems/shu-zu-zhong-de-ni-xu-dui-lcof/
/**
 * @param {number[]} nums
 * @return {number}
 */
const merge = (nums, lo, mid, hi, temp) => {
  let i = lo,
    j = mid + 1,
    cur = lo,
    count = 0;
  while (i <= mid && j <= hi) {
    if (nums[i] <= nums[j]) {
      temp[cur++] = nums[i++];
    } else {
      temp[cur++] = nums[j++];
      count += mid - i + 1;
    }
  }
  while (i <= mid) {
    temp[cur++] = nums[i++];
  }
  while (j <= hi) {
    temp[cur++] = nums[j++];
  }
  cur = lo;
  while (cur <= hi) {
    nums[cur] = temp[cur];
    cur++;
  }
  return count;
};

const mergeSort = (nums, lo, hi, temp) => {
  if (lo < hi) {
    let mid = Math.floor((lo + hi) / 2);
    let left = mergeSort(nums, lo, mid, temp);
    let right = mergeSort(nums, mid + 1, hi, temp);
    let current = merge(nums, lo, mid, hi, temp);
    return left + right + current;
  } else {
    return 0;
  }
};

var reversePairs = function(nums) {
  return mergeSort(nums, 0, nums.length - 1, []);
};
