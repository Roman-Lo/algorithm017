/*
 * @lc app=leetcode.cn id=64 lang=javascript
 *
 * [64] 最小路径和
 *
 * https://leetcode-cn.com/problems/minimum-path-sum/description/
 */

// @lc code=start
/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function (grid) {

};
// @lc code=end
/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum_Recursive = function (grid) {
  const walked = new Map(); // key: '${row},${col}', value: min path
  walked.set(`0,0`, grid[0][0]);
  const minWalkTo = function (row, col) {
    let minPath = walked.get(`${row},${col}`);
    if (minPath === undefined) {
      if (row - 1 < 0) {
        minPath = grid[row][col] + minWalkTo(row, col - 1);
      } else if (col - 1 < 0) {
        minPath = grid[row][col] + minWalkTo(row - 1, col);
      } else {
        minPath = grid[row][col] + Math.min(minWalkTo(row - 1, col), minWalkTo(row, col - 1));
      }
      walked.set(`${row},${col}`, minPath);
    }
    return minPath;
  }
  return minWalkTo(grid.length - 1, grid[0].length - 1);
}

/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum_DynamicProgramming = function (grid) {
  const matrix = [];
  const maxRow = grid.length - 1;
  const maxCol = grid[maxRow].length - 1;
  for (let row = 0; row <= maxRow; row++) {
    matrix.push([]);
    for (let col = 0; col <= maxCol; col++) {
      if (row === 0) {
        if (col === 0) {
          min = grid[row][col];
        } else {
          min = matrix[row][col - 1];
        }
      } else if (col === 0) {
        min = matrix[row - 1][col];
      } else {
        min = Math.min(matrix[row][col - 1], matrix[row - 1][col]);
      }
      matrix[row][col] = min + grid[row][col];
    }
  }
  return matrix[maxRow][maxCol];
}

minPathSum_Recursive([[1, 3, 1], [1, 5, 1], [4, 2, 1]]);
