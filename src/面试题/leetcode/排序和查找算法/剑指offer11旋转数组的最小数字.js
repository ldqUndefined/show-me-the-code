//https://leetcode-cn.com/problems/xuan-zhuan-shu-zu-de-zui-xiao-shu-zi-lcof/
/**
 * @param {number[]} numbers
 * @return {number}
 */
var minArray = function(numbers) {
  let lo = 0,
    hi = numbers.length - 1;
  while (lo < hi) {
    let mid = Math.floor((lo + hi) / 2);
    if (numbers[mid] > numbers[hi]) {
      lo = mid + 1;
    } else if (numbers[mid] < numbers[hi]) {
      hi = mid;
    } else {
      hi--;
    }
  }
  return numbers[lo];
};
