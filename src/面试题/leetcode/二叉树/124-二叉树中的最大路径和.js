//https://leetcode-cn.com/problems/binary-tree-maximum-path-sum/
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
var maxPathSum = function(root) {
  let max = root.val;
  const dfs = node => {
    if (!node) {
      return 0;
    }
    let left = dfs(node.left);
    let right = dfs(node.right);
    let tempMax = Math.max(
      left + node.val,
      right + node.val,
      node.val,
      left + right + node.val
    );
    let returnMax = Math.max(left + node.val, right + node.val, node.val);
    max = Math.max(max, tempMax);
    return returnMax > 0 ? returnMax : 0;
  };
  dfs(root);
  return max;
};
