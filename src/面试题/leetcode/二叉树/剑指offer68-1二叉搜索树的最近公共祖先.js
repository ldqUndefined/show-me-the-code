//https:leetcode-cn.com/problems/er-cha-sou-suo-shu-de-zui-jin-gong-gong-zu-xian-lcof/
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
//递归
var lowestCommonAncestor = function(root, p, q) {
  if (!root) {
    return null;
  }
  if (root.val < p.val && root.val < q.val) {
    return lowestCommonAncestor(root.right, p, q);
  } else if (root.val > p.val && root.val > q.val) {
    return lowestCommonAncestor(root.left, p, q);
  } else {
    return root;
  }
};
//迭代
var lowestCommonAncestor = function(root, p, q) {
  while (root !== null) {
    if (root.val < p.val && root.val < q.val) {
      root = root.right;
    } else if (root.val > p.val && root.val > q.val) {
      root = root.left;
    } else {
      return root;
    }
  }
  return null;
};
