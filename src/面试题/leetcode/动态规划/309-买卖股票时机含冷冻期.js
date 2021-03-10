//https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
  let result = Array.from({ length: prices.length }, () => []);
  result[0][0] = -prices[0];
  result[0][1] = 0;
  result[0][2] = 0;
  for (let i = 1; i < prices.length; i++) {
    result[i][0] = Math.max(result[i - 1][0], result[i - 1][1] - prices[i]);
    result[i][1] = Math.max(result[i - 1][1], result[i - 1][2]);
    result[i][2] = result[i - 1][0] + prices[i];
  }
  return Math.max(result[result.length - 1][1], result[result.length - 1][2]);
};

//空间优化之后
var maxProfit = function(prices) {
  let a = -prices[0];
  let b = 0;
  let c = 0;
  for (let i = 1; i < prices.length; i++) {
    let at = Math.max(a, b - prices[i]);
    let bt = Math.max(b, c);
    let ct = a + prices[i];
    a = at;
    b = bt;
    c = ct;
  }
  return Math.max(b, c);
};
