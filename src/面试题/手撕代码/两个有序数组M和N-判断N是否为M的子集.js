const judgeChild = (m, n) => {
  let i = -1,
    j = 0;
  while (++i < m.length) {
    if (m[i] === n[j]) {
      j++;
    }
  }
  return j === n.length;
};
