//https://leetcode-cn.com/problems/ping-heng-er-cha-shu-lcof/
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isBalanced = function(root) {
  const dfs = node => {
    if (!node) {
      return 0;
    }
    let left = dfs(node.left);
    if (left === -1) {
      return -1;
    }
    let right = dfs(node.right);
    if (right === -1) {
      return -1;
    }
    return Math.abs(left - right) < 2 ? Math.max(left, right) + 1 : -1;
  };
  return dfs(root) !== -1;
};
