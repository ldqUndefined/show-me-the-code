//https://leetcode-cn.com/problems/diameter-of-binary-tree/
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var diameterOfBinaryTree = function(root) {
  let max = 0;
  const dfs = node => {
    if (!node) {
      return 0;
    }
    let left = dfs(node.left);
    let right = dfs(node.right);
    max = Math.max(max, left + right);
    return Math.max(left, right) + 1;
  };
  dfs(root);
  return max;
};
