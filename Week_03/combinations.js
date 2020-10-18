/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function (n, k) {
  return combine_Recursive(n, k);
};

/**
 * 思路：计算组合C(n,k), 可以看成：
 * 对于取值范围内，选取首个元素，并且对接下来剩下的每个元素进行组合，直到长度满足最大长度`k`;
 *
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine_Recursive = function (n, k) {
  const results = [];
  /**
   *
   * @param {number} lvl 当前层
   * @param {number[]} c 集合内容
   * @param {number} i 取值范围起始位置
   * @returns
   */
  const enumerate = function (lvl, c, i) {
    if (lvl === k) { // 当层数达到最大值时，将组合放入结果。
      results.push([...c]);
      return;
    };
    for (; i < n; i++) { // 不断选取剩余的值
      c.push(i + 1);
      enumerate(lvl + 1, c, i + 1); // 尝试继续选值，这里的i+1是为了在下一层排除之前选过的值。
      c.pop(); // reverse state back to original `c`;
    }
  }

  enumerate(0, [], 0);

  return results;
};
