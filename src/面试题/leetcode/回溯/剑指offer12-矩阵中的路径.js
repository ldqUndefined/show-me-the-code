//https://leetcode-cn.com/problems/ju-zhen-zhong-de-lu-jing-lcof/
/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function(board, word) {
  const deepRecur = (board, word, i, j, visitIndex, visitSet) => {
    if (word.length === visitIndex) {
      return true;
    }
    if (
      i < 0 ||
      j < 0 ||
      i >= board.length ||
      j >= board[0].length ||
      visitSet.has(i * board[0].length + j) ||
      word.charAt(visitIndex) !== board[i][j]
    ) {
      return false;
    }
    visitSet.add(i * board[0].length + j);
    let has =
      deepRecur(board, word, i - 1, j, visitIndex + 1, visitSet) ||
      deepRecur(board, word, i + 1, j, visitIndex + 1, visitSet) ||
      deepRecur(board, word, i, j - 1, visitIndex + 1, visitSet) ||
      deepRecur(board, word, i, j + 1, visitIndex + 1, visitSet);
    visitSet.delete(i * board[0].length + j);
    return has;
  };
  let visitSet = new Set();
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      if (deepRecur(board, word, i, j, 0, visitSet)) {
        return true;
      }
    }
  }
  return false;
};
