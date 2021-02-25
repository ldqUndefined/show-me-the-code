//https://leetcode-cn.com/problems/hua-dong-chuang-kou-de-zui-da-zhi-lcof/
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
//js没有单调栈，用数组模拟的
var maxSlidingWindow = function(nums, k) {
  if (nums.length === 0 || k === 0) {
    return [];
  }
  let result = [],
    queue = [];
  for (let i = 0; i < k - 1; i++) {
    while (queue.length !== 0 && nums[i] > nums[queue[0]]) {
      queue.shift();
    }
    queue.unshift(i);
  }
  for (let i = k - 1; i < nums.length; i++) {
    if (queue[queue.length - 1] === i - k) {
      queue.pop();
    }
    while (queue.length !== 0 && nums[i] > nums[queue[0]]) {
      queue.shift();
    }
    queue.unshift(i);
    result.push(nums[queue[queue.length - 1]]);
  }
  return result;
};
