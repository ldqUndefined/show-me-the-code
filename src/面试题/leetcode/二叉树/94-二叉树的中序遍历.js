//https://leetcode-cn.com/problems/binary-tree-inorder-traversal/
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
 * @return {number[]}
 */
//递归
var inorderTraversal = function(root) {
  let result = [];
  const dfs = node => {
    if (!node) {
      return;
    }
    dfs(node.left);
    result.push(node.val);
    dfs(node.right);
  };
  dfs(root);
  return result;
};

//迭代
var inorderTraversal = function(root) {
  let result = [],
    stack = [];
  while (root || stack.length > 0) {
    while (root) {
      stack.push(root);
      root = root.left;
    }
    let temp = stack.pop();
    result.push(temp.val);
    root = temp.right;
  }
  return result;
};
