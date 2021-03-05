//https://leetcode-cn.com/problems/symmetric-tree/
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
 * @return {boolean}
 */
const check = (a, b) => {
  if (a === null && b === null) {
    return true;
  }
  if (a === null || b === null) {
    return false;
  }
  return a.val === b.val && check(a.left, b.right) && check(a.right, b.left);
};
var isSymmetric = function(root) {
  if (!root) {
    return true;
  }
  return check(root.left, root.right);
};
