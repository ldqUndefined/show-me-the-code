//https://leetcode-cn.com/problems/fei-bo-na-qi-shu-lie-lcof/
/**
 * @param {number} n
 * @return {number}
 */
var fib = function(n) {
  if (n < 2) {
    return n;
  }
  let prev = 0,
    next = 1;
  for (let i = 2; i <= n; i++) {
    let temp = prev;
    prev = next;
    next = (temp + prev) % 1000000007;
  }
  return next;
};
