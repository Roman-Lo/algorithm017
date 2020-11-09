/*
 * @lc app=leetcode.cn id=221 lang=javascript
 *
 * [221] 最大正方形
 *
 * https://leetcode-cn.com/problems/maximal-square/description/
 *
 */

// @lc code=start
/**
 * @param {character[][]} matrix
 * @return {number}
 */
var maximalSquare = function (matrix) {
  maximalSquare_DP(matrix);
};
// @lc code=end

/**
 * 思路：首先，正方形四边长都相等，我们的计算基于二位数组，因此可以理解成我们是在一个规则矩形里进行搜索。
 * 因此，在搜索过程中，我们可以对每一个位置，定义在这个位置上，它能获得的最大的等边长度。并用一个全局变量
 * 将其记录下来，最后范围这个最大边长的乘积，即为最大正方形面积。
 * DP方程：
 * f(x,y) = matrix[x][y] === '1'
 *          ? min(f(x, y - 1), f(x - 1, y), f(x - 1, y - 1)) + 1
 *          : 0
 * 其中：
 * 1. 当前位置满足成边条件时：min(f(x, y - 1), f(x - 1, y), f(x - 1, y - 1))
 *    * 我们通过f(x, y - 1)，f(x - 1, y)来确定，垂直和水平边延伸方向上最大能得到的边长（因为是正方形，所以只能取其最小值以确保它的长度一致）
 *    * f(x - 1, y - 1)是用来确保，这个正方形是实心而非空心，它参与最小值运算是确保正方形的边不会超过其有效核心。图示：
 *
 *                   1  1  1  | 1
 *                   1  1  1  | 1
 * (x - 1, y - 1)  ------> 1  | 1 <-- (x - 1, y) [垂直边]
 *      ^             -- -- -- .
 *      |            1  1  1    1 <-- (x, y) [当前点]
 *      |                  ^
 *      |                  (x, y - 1) [水平边]
 *      |
 * [比当前点边长少1的核心正方形]
 *
 *
 * 2. 如果当前位置不满足成边条件，置0
 *
 * @param {character[][]} matrix
 * @return {number}
 */
var maximalSquare_DP = function (matrix) {
  if (!matrix || matrix.length === 0) return 0;
  const row = matrix.length - 1;
  const col = matrix[row].length - 1;
  if (row === 0 && col === 0) return matrix[0][0] === '1' ? 1 : 0;
  let max = matrix[0][0] === '1' ? 1 : 0;
  const dp = [[max]]; // edge count
  // initialize
  for (let c = 1; c <= col; c++) {
    if (matrix[0][c] === '1') {
      dp[0][c] = 1;
      max = 1;
    } else {
      dp[0][c] = 0;
    }
  }
  for (let r = 1; r <= row; r++) {
    dp.push([matrix[r][0] === '1' ? 1 : 0]);// initialize row
    max = Math.max(max, dp[r][0]);
    for (let c = 1; c <= col; c++) {
      if (matrix[r][c] === '1') {
        dp[r][c] = Math.min(dp[r][c - 1], dp[r - 1][c], dp[r - 1][c - 1]) + 1;
        max = Math.max(max, dp[r][c]);
      } else {
        dp[r][c] = 0;
      }
    }
  }
  return max * max;
};

/**
 * @param {character[][]} matrix
 * @return {number}
 */
var maximalSquare_DPV2 = function (matrix) {
  if (!matrix) return 0;
  const row = matrix.length - 1;
  const col = matrix[row].length - 1;
  if (row === 0 && col === 0) return matrix[0][0] === '1' ? 1 : 0;
  let max = matrix[0][0] === '1' ? 1 : 0;
  const dp = [max]; // edge count
  // initialize
  for (let c = 1; c <= col; c++) {
    if (matrix[0][c] === '1') {
      dp[c] = 1;
      max = 1;
    } else {
      dp[c] = 0;
    }
  }
  for (let r = 1; r <= row; r++) {
    let topRight = dp[0];
    dp[0] = matrix[r][0] === '1' ? 1 : 0;
    max = Math.max(max, dp[0]);
    for (let c = 1; c <= col; c++) {
      if (matrix[r][c] === '1') {
        const min = Math.min(dp[c - 1], dp[c], topRight);
        topRight = dp[c];
        dp[c] = min + 1;
        max = Math.max(max, dp[c]);
      } else {
        topRight = dp[c];
        dp[c] = 0;
      }
    }
  }
  return max * max;
};


maximalSquare([["1", "0", "1", "0", "0"], ["1", "0", "1", "1", "1"], ["1", "1", "1", "1", "1"], ["1", "0", "0", "1", "0"]]);
