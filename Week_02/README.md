# 学习笔记

## 周记

本周主要学习了树的基本概念，以及一些特殊功能树（二叉树、二叉搜索树、堆以及二叉堆）的具体用法和实现。其中：

### 二叉树

* DFS遍历：（该种遍历中，永远左节点优先于右节点）
  * 前序遍历（中左右）
  * 中序遍历（左中右）
  * 后序遍历（左右中）

#### 二叉搜索树

特点是：对于树种的每一个节点，满足节点的值大于该节点左子树所有节点的值，且节点的值小于其右子树所有节点的值；

### 堆

* 基本操作：
  * insert
  * peek (getMax/getMin)
  * delete

#### 二叉堆

基于完全二叉树建立起来的堆。其中：

* 内部操作：
  * heapifyUp：给定位置，自底向上重建树
  * heapifyDown：给定位置，自顶向下重建树

* 执行`insert`操作时，将新增元素加入到末尾，并执行`heapifyUp`
* 执行`delete`操作时，将末尾元素移除并替换到删除位置，然后在删除位置执行`heapifyDown`
* 执行`peek`操作时，直接返回`top（堆顶）`元素

## 作业部分

### 简单

[valid-anagram.js](./valid-anagram.js)

### 中等

[group-anagrams.js](./group-anagrams.js)

[binary-tree-inorder-traversal.js](./binary-tree-inorder-traversal.js)

[binary-tree-preorder-traversal.js](./binary-tree-preorder-traversal.js)

[n-ary-tree-level-order-traversal.js](./n-ary-tree-level-order-traversal.js)

[chou-shu-lcof.js](./chou-shu-lcof.js)