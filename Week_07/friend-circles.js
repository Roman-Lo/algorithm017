/*
 *
 * [547] 朋友圈
 *
 * https://leetcode-cn.com/problems/friend-circles/description/
 *
 * @param {number[][]} M
 * @return {number}
 */
var findCircleNum = function (M) {

};

/**
 * @param {number[][]} M
 * @return {number}
 */
var findCircleNum_DFS = function (M) {
  if (!M || M.length === 0) return 0;
  const num = M.length;
  const visited = new Set();
  const dfs = function (i) {
    for (let j = 0; j < num; j++) {
      if (M[i][j] === 1 && !visited.has(j)) {
        visited.add(j);
        dfs(j);
      }
    }
  }
  let cnt = 0;
  for (let i = 0; i < num; i++) {
    if (!visited.has(i)) {
      dfs(i);
      cnt++;
    }
  }
  return cnt;
}


/**
 * @param {number[][]} M
 * @return {number}
 */
var findCircleNum_DisjointSet = function (M) {
  if (!M || M.length === 0) return 0;

  // 并查集的实现
  const DisjointSet = function (n) {
    this.parents = [];
    this.count = n;
    while (n--) this.parents[n] = n;

    this.find = function (p) {
      while (p !== this.parents[p]) {
        this.parents[p] = this.parents[this.parents[p]];
        p = this.parents[p];
      }
      return p;
    }
    this.union = function (p, q) {
      const rP = this.find(p), rQ = this.find(q);
      if (rP !== rQ) {
        this.parents[rQ] = rP;
        this.count--;
      }
    }
  };

  const size = M.length;
  const dSet = new DisjointSet(size);
  // 由于关系矩阵M为对称矩阵，且当i===j时，有M[i][j] === 1，
  // 因此我们只需要遍历除对角线外的左下三角即可
  // （其实遍历右上也一样可以，但是因为CPU的缓存设计，在按顺序遍历会执行得相对快一些，因此选择左下三角更好）
  for (let i = 1; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (M[i][j] === 1) {
        // 当i和j互为朋友时，聚合
        dSet.union(i, j);
      }
    }
  }
  return dSet.count;
}
