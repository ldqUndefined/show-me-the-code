//https://leetcode-cn.com/problems/gu-piao-de-zui-da-li-run-lcof/
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
  let min = prices[0],
    max = 0;
  for (let i = 1; i < prices.length; i++) {
    max = Math.max(max, prices[i] - min);
    min = Math.min(min, prices[i]);
  }
  return max;
};
