//https://leetcode-cn.com/problems/validate-binary-search-tree/
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
//搞个数组
var isValidBST = function(root) {
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
  for (let i = 0; i < result.length - 1; i++) {
    if (result[i] >= result[i + 1]) {
      return false;
    }
  }
  return true;
};
//递归
var isValidBST = function(root) {
  let prev = null,
    finish = false;
  const dfs = node => {
    if (!node || finish) {
      return;
    }
    dfs(node.left);
    if (prev === null) {
      prev = node.val;
    } else {
      if (node.val <= prev) {
        finish = true;
        return;
      } else {
        prev = node.val;
      }
    }
    dfs(node.right);
  };
  dfs(root);
  return finish === false;
};
//中序遍历的栈
var isValidBST = function(root) {
  let stack = [],
    prev = Number.MIN_SAFE_INTEGER;
  while (root || stack.length > 0) {
    while (root) {
      stack.push(root);
      root = root.left;
    }
    let top = stack.pop();
    if (top.val <= prev) {
      return false;
    }
    prev = top.val;
    root = top.right;
  }
  return true;
};
