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
        const min = Math.min(dp[r][c - 1], dp[r - 1][c], dp[r - 1][c - 1]);
        dp[r][c] = min > 0 ? min + 1 : 1;
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
        dp[c] = min > 0 ? min + 1 : 1;
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
