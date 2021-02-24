//https://leetcode-cn.com/problems/er-cha-sou-suo-shu-de-di-kda-jie-dian-lcof/
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
var kthLargest = function(root, k) {
  let i = 0,
    finish = false,
    result = null;
  const dfs = node => {
    if (!node || finish) {
      return;
    }
    dfs(node.right);
    if (++i === k) {
      result = node.val;
    }
    dfs(node.left);
  };
  dfs(root);
  return result;
};
