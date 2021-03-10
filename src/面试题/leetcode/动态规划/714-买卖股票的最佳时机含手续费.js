//https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/
/**
 * @param {number[]} prices
 * @param {number} fee
 * @return {number}
 */
var maxProfit = function(prices, fee) {
  let result = Array.from({ length: prices.length }, () => []);
  result[0][0] = 0;
  result[0][1] = -prices[0];
  for (let i = 1; i < prices.length; i++) {
    result[i][0] = Math.max(
      result[i - 1][0],
      result[i - 1][1] + prices[i] - fee
    );
    result[i][1] = Math.max(result[i - 1][1], result[i - 1][0] - prices[i]);
  }
  return result[result.length - 1][0];
};
