/*
 * @lc app=leetcode.cn id=120 lang=javascript
 *
 * [120] 三角形最小路径和
 *
 * https://leetcode-cn.com/problems/triangle/description/
 */

// @lc code=start
/**
 * @param {number[][]} triangle
 * @return {number}
 */
var minimumTotal = function (triangle) {

};
// @lc code=end


/**
 * @param {number[][]} triangle
 * @return {number}
 */
var minimumTotal_DP = function (triangle) {
  if (!triangle || triangle.length === 0) return 0;
  if (triangle.length === 1) return triangle[0][0];
  // dp方程：f(n, k) = min(f(n + 1, k), f(n + 1, k + 1)) + tri[n, k];
  // 从三角形最底部开始，向上推断
  const depth = triangle.length;
  let dp = [...triangle[depth - 1]];
  for (let i = depth - 2; i >= 0; i--) {
    for (let j = 0; j < triangle[i].length; j++) {
      dp[j] = Math.min(dp[j], dp[j + 1]) + triangle[i][j];
    }
  }
  return dp[0];
};


minimumTotal_DP(
  [
    [2],
    [3, 4],
    [6, 5, 7],
    [4, 1, 8, 3]
  ]
)
