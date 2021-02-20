//https://leetcode-cn.com/problems/er-cha-sou-suo-shu-de-hou-xu-bian-li-xu-lie-lcof/
/**
 * @param {number[]} postorder
 * @return {boolean}
 */
//递归版
//空间复杂度取决于函数调用栈层数，平均O(logN),极限O(N),二叉树退化成一条线时为极限状态
//时间复杂度，平均O(n2),最好最差都是O(n2)
var verifyPostorder = function(postorder) {
  const dfs = (postorder, lo, hi) => {
    if (lo >= hi) {
      return true;
    }
    let divide = lo;
    for (let i = lo; i < hi; i++) {
      if (postorder[i] > postorder[hi]) {
        break;
      }
      divide++;
    }
    let cur = divide;
    for (let i = divide; i < hi; i++) {
      if (postorder[i] < postorder[hi]) {
        break;
      }
      cur++;
    }
    return (
      cur === hi &&
      dfs(postorder, lo, divide - 1) &&
      dfs(postorder, divide, hi - 1)
    );
  };
  return dfs(postorder, 0, postorder.length - 1);
};

//迭代使用栈版
//空间复杂度，O(N),栈最多塞全部结点的值
//时间复杂度，O(N),遍历一遍
var verifyPostorder = function(postorder) {
  let stack = [],
    root = Number.MAX_SAFE_INTEGER;
  for (let i = postorder.length - 1; i >= 0; i--) {
    if (postorder[i] > root) {
      return false;
    }
    while (stack.length > 0 && stack[stack.length - 1] > postorder[i]) {
      root = stack.pop();
    }
    stack.push(postorder[i]);
  }
  return true;
};
