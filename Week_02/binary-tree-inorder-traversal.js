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
var inorderTraversal = function (root) {
    // return inorderTraversal_Recursive(root);
    return inorderTraversal_Loop(root);
};

/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal_Recursive = function (root) {
    if (!root) return [];
    const path = [];
    path.push(...inorderTraversal_Recursive(root.left));
    path.push(root.val);
    path.push(...inorderTraversal_Recursive(root.right));
    return path;
}


/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal_Loop = function (root) {
    if (!root) return [];
    if (!root.left && !root.right) return [root.val];
    const stack = [];
    const path = [];
    let node = root;
    while (node || stack.length > 0) {
        while (node) {
            stack.push(node);
            node = node.left;
        }
        node = stack.pop();
        path.push(node.val);
        node = node.right;
    }
    return path;
}


function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val);
    this.left = (left === undefined ? null : left);
    this.right = (right === undefined ? null : right);
}