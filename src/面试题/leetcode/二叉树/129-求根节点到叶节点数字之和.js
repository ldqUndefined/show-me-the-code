//https://leetcode-cn.com/problems/sum-root-to-leaf-numbers/
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var sumNumbers = function(root) {
  let result = 0;
  const dfs = (node, s) => {
    if (!node) {
      return;
    }
    if (!node.left && !node.right) {
      result += Number(s + node.val);
    }
    dfs(node.left, s + node.val);
    dfs(node.right, s + node.val);
  };
  dfs(root, '');
  return result;
};
