//https://leetcode-cn.com/problems/ba-shu-zi-fan-yi-cheng-zi-fu-chuan-lcof/
/**
 * @param {number} num
 * @return {number}
 */
var translateNum = function(num) {
  if (num < 10) {
    return 1;
  } else if (num >= 10 && num <= 25) {
    return 2;
  } else if (num > 25 && num < 100) {
    return 1;
  }
  let result = [],
    last = num % 10,
    preLast = Math.floor(num / 10) % 10;
  num = Math.floor(num / 100);
  result.push(1);
  if (preLast * 10 + last >= 10 && preLast * 10 + last <= 25) {
    result.push(2);
  } else {
    result.push(1);
  }
  last = preLast;
  let i = 2;
  while (num > 0) {
    let cur = num % 10;
    if (cur * 10 + last >= 10 && cur * 10 + last <= 25) {
      result[i] = result[i - 1] + result[i - 2];
    } else {
      result[i] = result[i - 1];
    }
    last = cur;
    i++;
    num = Math.floor(num / 10);
  }
  return result[i - 1];
};
