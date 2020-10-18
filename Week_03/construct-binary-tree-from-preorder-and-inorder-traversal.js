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
var buildTree = function (preorder, inorder) {
  return buildTree_RecursiveV2(preorder, inorder);
};

/**
 * 思路：
 * 分析前序遍历和中序遍历特点：
 * 前序: [(根)，左，右]
 * 中序: [左，(根)，右]
 * 其中`左`，`右`为子树全集，可以得出中序遍历找到根节点后，可以得出出当前节点的左右子树遍历结果。
 * 又因为前序遍历中，根节点为首个节点，题目的前提说树里面不存在重复的元素值，因此可以通过前序遍历根节点找出其在中序遍历中的索引，
 * 根据拆分结果，又可以在前序遍历中拆分出左右子树的前序遍历集合。该重复子问题概括如下：
 * 令，`po`为当前节点的前序遍历，`io`为当前节点的中序遍历
 * 1. 获取 `po[0]` 为根节点值；
 * 2. 在 `io` 中找出 `po[0]` 的位置 `i`；
 * 3. 计算出左右子树长度: `lenOfLeft`, `lenOfRight`；
 * 4. 分别构造左右子树前序遍历和中序遍历并重复执行该方法。
 * (#terminator) 结束条件为：当前遍历结果为0时，意味着该节点为空，返回null。
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree_Recursive = function (preorder, inorder) {
  if (preorder.length === 0) return null;
  /**
   * @param {number[]} po
   * @param {number[]} io
   * @returns
   */
  const build = function (po, io) {
    if (po.length === 0) return null; // #terminator
    const root = new TreeNode(po[0]); // 1.
    let idxOfRoot = io.indexOf(po[0]); // 2.
    // 3 & 4
    const leftTreeIO = io.slice(0, idxOfRoot);
    const rightTreeIO = io.slice(idxOfRoot + 1);
    const leftTreePO = po.slice(1, leftTreeIO.length + 1);
    const rightTreePO = po.slice(leftTreeIO.length + 1);
    root.left = build(leftTreePO, leftTreeIO);
    root.right = build(rightTreePO, rightTreeIO);
    return root;
  }
  return build(preorder, inorder);
}
/**
 * 这里是buildTree_Recursive的优化版，因为上面的方法一直对数据进行拆分和新建，
 * 但其实可以通过范围指针对`preorder`和`inorder`进行操作，达到节省空间的目的。
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree_RecursiveV2 = function (preorder, inorder) {
  if (preorder.length === 0) return null;

  /**
   * @param {number} poFrom
   * @param {number} poTo
   * @param {number} ioFrom
   * @param {number} ioTo
   * @returns
   */
  const build = function (poFrom, poTo, ioFrom, ioTo) {
    if (poFrom > poTo) return null;
    const root = new TreeNode(preorder[poFrom]);
    const idxOfRootInIO = inorder.indexOf(root.val, ioFrom); // 这里直接从ioFrom开始查找
    const leftTreeSize = idxOfRootInIO - ioFrom;
    root.left = build(poFrom + 1, poFrom + leftTreeSize, ioFrom, idxOfRootInIO - 1);
    root.right = build(poFrom + 1 + leftTreeSize, poTo, idxOfRootInIO + 1, ioTo);
    return root;
  }
  return build(0, preorder.length - 1, 0, inorder.length - 1);
}

function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}
