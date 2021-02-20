//https://leetcode-cn.com/problems/cong-shang-dao-xia-da-yin-er-cha-shu-iii-lcof/
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function(root) {
  if (!root) {
    return [];
  }
  let queue = [root],
    result = [],
    reverse = false;
  while (queue.length > 0) {
    let len = queue.length;
    let temp = [];
    while (len-- > 0) {
      let node = queue.shift();
      temp.push(node.val);
      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }
    if (reverse) {
      temp = temp.reverse();
    }
    reverse = !reverse;
    result.push(temp);
  }
  return result;
};
