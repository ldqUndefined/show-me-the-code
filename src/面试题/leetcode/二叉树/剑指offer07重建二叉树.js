//https://leetcode-cn.com/problems/zhong-jian-er-cha-shu-lcof/
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function(preorder, inorder) {
  const buildRecur = (preorder, inorder, preRoot, lo, hi) => {
    if (lo > hi) {
      return null;
    }
    const root = new TreeNode(preorder[preRoot]);
    let index = lo;
    for (let i = lo; i <= hi; i++) {
      if (preorder[preRoot] === inorder[i]) {
        index = i;
        break;
      }
    }
    root.left = buildRecur(preorder, inorder, preRoot + 1, lo, index - 1);
    root.right = buildRecur(
      preorder,
      inorder,
      preRoot + 1 + index - lo,
      index + 1,
      hi
    );
    return root;
  };
  return buildRecur(preorder, inorder, 0, 0, inorder.length - 1);
};
