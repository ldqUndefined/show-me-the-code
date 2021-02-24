//https://leetcode-cn.com/problems/er-cha-shu-de-shen-du-lcof/
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
var maxDepth = function(root) {
  let result = 0;
  const dfs = (node, level) => {
    if (!node) {
      return;
    }
    if (!node.left && !node.right) {
      result = Math.max(result, level);
    }
    dfs(node.left, level + 1);
    dfs(node.right, level + 1);
  };
  dfs(root, 1);
  return result;
};
