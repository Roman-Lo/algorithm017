/**
 * 思路：贪心算法，用剩余最小的饼干分配给剩余最小需求的人。
 * 因为题目没有说传入的序列是否有顺序，因此要先对其进行排序，排序复杂度为O(nlogn)
 * 从饼干序列轮训满足思路要求 复杂度为O(Min(g.length, s.length))
 * @param {number[]} g
 * @param {number[]} s
 * @return {number}
 */
var findContentChildren = function (g, s) {
  if (s.length === 0) return 0;
  const ascCp = (a, b) => a - b;
  // 排序（升序）
  g = g.sort(ascCp);
  s = s.sort(ascCp);
  let cnt = 0; // 符合需求的人
  for (let i = 0, j = 0; i < s.length && j < g.length; i++) {
      if (g[j] <= s[i]) { // 当前饼干（剩余最小）能满足当前（剩余最小需求）的人，记录并且把人移到下一个
          cnt++, j++;
      }
  }
  return cnt;
};
