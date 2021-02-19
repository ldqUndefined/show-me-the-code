//leetcode-cn.com/problems/ji-qi-ren-de-yun-dong-fan-wei-lcof/
/**
 * @param {number} m
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var movingCount = function(m, n, k) {
  let visit = new Set();
  travel(0, 0, m, n, k, visit);
  return visit.size;
};

const travel = (i, j, m, n, k, visit) => {
  if (
    i < 0 ||
    j < 0 ||
    i >= m ||
    j >= n ||
    count(i, j) > k ||
    visit.has(i * n + j)
  ) {
    return;
  }
  visit.add(i * n + j);
  travel(i - 1, j, m, n, k, visit);
  travel(i + 1, j, m, n, k, visit);
  travel(i, j - 1, m, n, k, visit);
  travel(i, j + 1, m, n, k, visit);
};

const count = (a, b) => {
  let total = 0;
  while (a > 0) {
    total += a % 10;
    a = Math.floor(a / 10);
  }
  while (b > 0) {
    total += b % 10;
    b = Math.floor(b / 10);
  }
  return total;
};
