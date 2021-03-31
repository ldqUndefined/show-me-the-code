//https://leetcode-cn.com/problems/house-robber-iii/
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

var rob = function(root) {
  let select = new Map(),
    unSelect = new Map();
  select.set(null, 0), unSelect.set(null, 0);
  const dfs = (node, select, unselect) => {
    if (!node) {
      return;
    }
    dfs(node.left, select, unselect);
    dfs(node.right, select, unselect);
    let tempSelect =
      unselect.get(node.left) + unselect.get(node.right) + node.val;
    select.set(node, tempSelect);
    let tempUnselect =
      Math.max(select.get(node.left), unselect.get(node.left)) +
      Math.max(select.get(node.right), unselect.get(node.right));
    unselect.set(node, tempUnselect);
  };
  dfs(root, select, unSelect);
  return Math.max(select.get(root), unSelect.get(root));
};
