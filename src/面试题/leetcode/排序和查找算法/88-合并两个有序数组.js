//https://leetcode-cn.com/problems/merge-sorted-array/
/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function(nums1, m, nums2, n) {
  for (let i = m - 1; i >= 0; i--) {
    nums1[i + n] = nums1[i];
  }
  let i = n,
    j = 0,
    cur = 0;
  while (i < m + n && j < n) {
    if (nums1[i] < nums2[j]) {
      nums1[cur++] = nums1[i++];
    } else {
      nums1[cur++] = nums2[j++];
    }
  }
  while (j < n) {
    nums1[cur++] = nums2[j++];
  }
};
