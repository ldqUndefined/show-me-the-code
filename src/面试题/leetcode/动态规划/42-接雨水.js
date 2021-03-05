//https://leetcode-cn.com/problems/trapping-rain-water/
/**
 * @param {number[]} height
 * @return {number}
 */
//双指针，最快方法
var trap = function(height) {
  let left = 0,
    right = height.length - 1,
    leftMax = 0,
    rightMax = 0,
    result = 0;
  while (left < right) {
    if (height[left] < height[right]) {
      if (height[left] < leftMax) {
        result += leftMax - height[left];
      } else {
        leftMax = height[left];
      }
      left++;
    } else {
      if (height[right] < rightMax) {
        result += rightMax - height[right];
      } else {
        rightMax = height[right];
      }
      right--;
    }
  }
  return result;
};
//两个数组分别存相应索引的左右最大值，空间O(n)
var trap = function(height) {
  let leftMax = [],
    rightMax = [],
    result = 0;
  leftMax.push(height[0]);
  for (let i = 1; i < height.length; i++) {
    leftMax[i] = Math.max(leftMax[i - 1], height[i]);
  }
  rightMax[height.length - 1] = height[height.length - 1];
  for (let i = height.length - 2; i >= 0; i--) {
    rightMax[i] = Math.max(rightMax[i + 1], height[i]);
  }
  for (let i = 0; i < height.length; i++) {
    result += Math.min(leftMax[i], rightMax[i]) - height[i];
  }
  return result;
};
//栈，空间O(n)
var trap = function(height) {
  let stack = [],
    result = 0,
    cur = 0;
  while (cur < height.length) {
    while (stack.length > 0 && height[cur] > height[stack[stack.length - 1]]) {
      let top = stack.pop();
      if (stack.length === 0) {
        break;
      }
      let distance = cur - stack[stack.length - 1] - 1;
      result +=
        distance *
        (Math.min(height[cur], height[stack[stack.length - 1]]) - height[top]);
    }
    stack.push(cur++);
  }
  return result;
};
