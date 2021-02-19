//https://leetcode-cn.com/problems/shu-de-zi-jie-gou-lcof/
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} A
 * @param {TreeNode} B
 * @return {boolean}
 */
var isSubStructure = function(A, B) {
  if (B === null || A === null) {
    return false;
  }
  return dfs(A, B) || isSubStructure(A.left, B) || isSubStructure(A.right, B);
};
const dfs = (a, b) => {
  if (b === null) {
    return true;
  }
  if (a === null) {
    return false;
  }
  return a.val === b.val && dfs(a.left, b.left) && dfs(a.right, b.right);
};
