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
var preorderTraversal = function (root) {
    // return preorderTraversal_Recursive(root);
    // return preorderTraversal_Loop(root);
    return preorderTraversal_Loop_RightChildrenOnly(root);
};

/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var preorderTraversal_Recursive = function (root) {
    if (!root) return [];
    const path = [];
    path.push(root.val);
    path.push(...preorderTraversal_Recursive(root.left));
    path.push(...preorderTraversal_Recursive(root.right));
    return path;
};

/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var preorderTraversal_Loop = function (root) {
    if (!root) return [];
    if (!root.left && !root.right) return [root.val];
    const path = [];
    const stack = [root];
    while (stack.length > 0) {
        let top = stack.pop();
        path.push(top.val);
        if (top.right) {
            stack.push(top.right);
        }
        if (top.left) {
            stack.push(top.left);
        }
    }
    return path;
};

/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var preorderTraversal_Loop_RightChildrenOnly = function(root) {
    const path = [];
    const stack = [];
    let node = root;
    while(node || stack.length > 0) {
        if (node) {
            path.push(node.val);
            stack.push(node.right);
            node = node.left;
        } else {
            node = stack.pop();
        }
    }
    return path;
}




function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val);
    this.left = (left === undefined ? null : left);
    this.right = (right === undefined ? null : right);
}