/**
 * [56] 合并区间
 *
 * https://leetcode-cn.com/problems/merge-intervals/description/
 *
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function (intervals) {
  // 根据重叠示图：
  // A:       from ------------------- to
  // B1: from ------ to
  // B2:             from ------ to
  // B3:                         from ------ to
  // 可以得出区间A,B的重叠判定为 A.from <= B.to && B.from <= A.to
  // 本题思路：
  // 1. 对给定区间数组根据区间起始范围进行排序
  // 2. 相邻区间比较，如果存在重叠情况，则进行合并，否则为互相独立区间，加入到结果集
  if (intervals.length <= 1) {
      return intervals[0] ? intervals : [];
  }
  intervals = intervals.sort((a, b) => a[0] - b[0]);
  let base = intervals[0];
  const result = [base];
  for (let i = 1; i < intervals.length; i++) {
      if (intervals[i][0] <= base[1]) {
          base[1] = Math.max(intervals[i][1], base[1]);
      } else {
          base = intervals[i];
          result.push(base);
      }
  }
  return result;
};
