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
var lowestCommonAncestor = function (root, p, q) {
  return lowestCommonAncestor_Recursive(root, p, q);
};

/**
 * 思路：通过DFS后序遍历规则，分别从左子树和右子树探索节点p,q，并返回第一个同时找到的结果
 * 当p, q找到时，当前的root即为最近祖先
 * 前提：题目内注明，p, q为树的有效节点
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor_Recursive = function (root, p, q) {
  if (root === null) return null;
  if (root === p || root === q) { return root; } // 根节点与p或q相等时，即为找到指定节点
  // 从左右子树找出p或q
  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);
  if (left === null) { // 左边结果为`null`，意味着只需要关注右边是否找到
    return right;
  } else if (right === null) { // 反之，只关注左边是否找到
    return left;
  } else { // 如果左右都找到，意味着当前`root`为最近的公共祖先
    return root
  }
}

function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}

