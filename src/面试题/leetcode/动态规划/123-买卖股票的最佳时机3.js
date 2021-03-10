//https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-iii/
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
  let result = Array.from({ length: prices.length }, () => []);
  result[0][0] = 0;
  result[0][1] = -prices[0];
  result[0][2] = 0;
  result[0][3] = -prices[0];
  result[0][4] = 0;
  for (let i = 1; i < prices.length; i++) {
    result[i][0] = result[i - 1][0];
    result[i][1] = Math.max(result[i - 1][1], result[i - 1][0] - prices[i]);
    result[i][2] = Math.max(result[i - 1][2], result[i - 1][1] + prices[i]);
    result[i][3] = Math.max(result[i - 1][3], result[i - 1][2] - prices[i]);
    result[i][4] = Math.max(result[i - 1][4], result[i - 1][3] + prices[i]);
  }
  let n = prices.length - 1;
  return Math.max(result[n][0], result[n][2], result[n][4]);
};

//空间优化后
var maxProfit = function(prices) {
  let a = 0;
  let b = -prices[0];
  let c = 0;
  let d = -prices[0];
  let e = 0;
  for (let i = 1; i < prices.length; i++) {
    let at = a;
    let bt = Math.max(b, a - prices[i]);
    let ct = Math.max(c, b + prices[i]);
    let dt = Math.max(d, c - prices[i]);
    let et = Math.max(e, d + prices[i]);
    a = at;
    b = bt;
    c = ct;
    d = dt;
    e = et;
  }
  return Math.max(a, c, e);
};
