//https:leetcode-cn.com/problems/er-cha-shu-zhong-he-wei-mou-yi-zhi-de-lu-jing-lcof/
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} sum
 * @return {number[][]}
 */
var pathSum = function(root, sum) {
  let result = [];
  let path = [];
  const dfs = (node, currentSum) => {
    if (!node) {
      return;
    }
    if (node.val + currentSum === sum && !node.left && !node.right) {
      result.push([...path, node.val]);
      return;
    }
    path.push(node.val);
    dfs(node.left, currentSum + node.val);
    dfs(node.right, currentSum + node.val);
    path.pop();
  };
  dfs(root, 0);
  return result;
};
