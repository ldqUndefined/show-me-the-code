//https://leetcode-cn.com/problems/binary-tree-right-side-view/
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
var rightSideView = function(root) {
  if (!root) {
    return [];
  }
  let result = [],
    queue = [root];
  while (queue.length > 0) {
    let level = queue.length;
    while (level-- > 0) {
      let temp = queue.shift();
      if (level === 0) {
        result.push(temp.val);
      }
      temp.left && queue.push(temp.left);
      temp.right && queue.push(temp.right);
    }
  }
  return result;
};
