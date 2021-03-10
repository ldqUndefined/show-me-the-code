//https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-iv/
/**
 * @param {number} k
 * @param {number[]} prices
 * @return {number}
 */
//从两次买卖的题推出来
var maxProfit = function(k, prices) {
  if (prices.length <= 1) {
    return 0;
  }
  let result = Array.from({ length: prices.length }, () => []);
  result[0][0] = 0;
  for (let i = 1; i <= k; i++) {
    result[0][2 * i - 1] = -prices[0];
    result[0][2 * i] = 0;
  }
  for (let i = 1; i < prices.length; i++) {
    for (let j = 0; j <= k; j++) {
      if (j === 0) {
        result[i][0] = result[i - 1][0];
      } else {
        result[i][2 * j - 1] = Math.max(
          result[i - 1][2 * j - 1],
          result[i - 1][j * 2 - 2] - prices[i]
        );
        result[i][j * 2] = Math.max(
          result[i - 1][j * 2],
          result[i - 1][j * 2 - 1] + prices[i]
        );
      }
    }
  }
  let n = prices.length - 1,
    max = 0;
  for (let v of result[n]) {
    max = Math.max(max, v);
  }
  return max;
};
