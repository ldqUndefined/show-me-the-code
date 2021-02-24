//https://leetcode-cn.com/problems/er-cha-sou-suo-shu-yu-shuang-xiang-lian-biao-lcof/
/**
 * // Definition for a Node.
 * function Node(val,left,right) {
 *    this.val = val;
 *    this.left = left;
 *    this.right = right;
 * };
 */
/**
 * @param {Node} root
 * @return {Node}
 */
var treeToDoublyList = function(root) {
  if (!root) {
    return null;
  }
  let result = [];
  const dfs = node => {
    if (!node) {
      return;
    }
    dfs(node.left);
    result.push(node);
    dfs(node.right);
  };
  dfs(root);
  for (let i = 0; i < result.length - 1; i++) {
    result[i].right = result[i + 1];
    result[i + 1].left = result[i];
  }
  result[0].left = result[result.length - 1];
  result[result.length - 1].right = result[0];
  return result[0];
};

//迭代过程拼接版
/**
 * // Definition for a Node.
 * function Node(val,left,right) {
 *    this.val = val;
 *    this.left = left;
 *    this.right = right;
 * };
 */
/**
 * @param {Node} root
 * @return {Node}
 */
var treeToDoublyList = function(root) {
  if (!root) {
    return null;
  }
  let head = null,
    prev = null;
  const dfs = node => {
    if (!node) {
      return;
    }
    let right = node.right;
    dfs(node.left);
    if (!head) {
      head = node;
    }
    node.left = prev;
    if (prev) {
      prev.right = node;
    }
    prev = node;
    dfs(right);
  };
  dfs(root);
  head.left = prev;
  prev.right = head;
  return head;
};
