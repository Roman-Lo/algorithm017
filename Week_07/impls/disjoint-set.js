/**
 * 并查集
 *
 * @param {number} n
 */
const DisjointSet = function (n) {
  this.parents = [];
  this.count = n;
  while (n--) this.parents[n] = n;
}

/**
 * 寻找p元素的集合根
 *
 * @param {number} p
 * @returns
 */
DisjointSet.prototype.find = function (p) {
  while (p !== this.parents[p]) {
    // 因为：            this.parents[root]  === root
    // ==> this.parents[this.parents[root]] === this.parents[root];
    // 因此可以不断地对当前p，执行this.parents[p] = this.parents[this.parents[p]]进行路径压缩
    // 最后范围 this.parents[p] 即可
    this.parents[p] = this.parents[this.parents[p]];
    p = this.parents[p];
  }
  return p;
}

/**
 * 合并p,q两个元素对应的集合
 * @param {number} p
 * @param {number} q
 */
DisjointSet.prototype.union = function (p, q) {
  const rootP = this.find(p), rootQ = this.find(q);
  if (rootP !== rootQ) {
    // 将this.parents[rootQ]设置为rootQ，意味着将rootQ合并到rootP
    this.parents[rootQ] = rootP;
    // 把集合总数减一
    this.count--;
  }
}
