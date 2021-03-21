//https://leetcode-cn.com/problems/flatten-binary-tree-to-linked-list/
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
 * @return {void} Do not return anything, modify root in-place instead.
 */
//递归
 var flatten = function(root) {
    let last = null
    const dfs = (node) => {
        if(!node){
            return
        }
        dfs(node.right)
        dfs(node.left)
        node.right = last
        node.left = null
        last = node
    }
    dfs(root)
};
//迭代
 var flatten = function(root) {
    while(root){
        if(root.left){
            let leftMax = root.left
            while(leftMax.right){
                leftMax = leftMax.right
            }
            leftMax.right = root.right
            root.right = root.left
            root.left = null
        }
        root = root.right
    }
};