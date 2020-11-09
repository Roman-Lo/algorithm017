/*
 * @lc app=leetcode.cn id=63 lang=javascript
 *
 * [63] 不同路径 II
 *
 * https://leetcode-cn.com/problems/unique-paths-ii/description/
 */

// @lc code=start
/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
var uniquePathsWithObstacles = function(obstacleGrid) {
  uniquePathsWithObstacles_DP(obstacleGrid);
};
// @lc code=end

/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
var uniquePathsWithObstacles_DP = function(obstacleGrid) {
  // 思路，跟 不同路径I 相似，只是加入了障碍判断
  // dp方程： f(x, y) = obstacleGrid[y][x] === 1 ? 0 : f(x - 1, y) + f(x, y - 1);
  // 同样地，我们使用一维数组即可，但是由于有障碍物影响，边沿路径不能统一赋值为1。

  // 如果第一格就不行，那就真的没办法，直接返回0；
  if(obstacleGrid[0][0] === 1) return 0;
  const row = obstacleGrid.length - 1;
  const col = obstacleGrid[row].length - 1;
  const dp = [1]; // 初始化首个格子，因为之前已经判定好没有障碍，因此直接赋值1

  // 初始化首行状态
  for (let x = 1; x <= col; x++) {
    dp[x] = obstacleGrid[y][x] === 1 ? 0 : dp[x - 1];
  }

  for (let y = 1; y <= row; y++) {
    dp[0] = obstacleGrid[y][0] === 1 ? 0 : dp[0];
    let hasNoneZero = dp[0] !== 0; // 标记当前层是否有有效路径的格子
    for (let x = 1; x <= col; x++) {
      // 根据状态转移方程：
      // f(x, y) = obstacleGrid[y][x] === 1 ? 0 : f(x - 1, y) + f(x, y - 1);
      // 由于y不变，因此：
      // f(x - 1, y) ==> dp[x - 1];
      // f(x, y - 1) ==> dp[x];
      // 对于当前y的 f(x,y) = obstacleGrid[y][x] === 1 ? 0 : (dp[x - 1] + dp[x]);
      dp[x] = obstacleGrid[y][x] === 1 ? 0 : (dp[x - 1] + dp[x]);
      hasNoneZero |= dp[x] !== 0; // 更新标记
    }
    if (!hasNoneZero) {
      // 当前层没有可用路径格子，因此直接跳出（此时dp[col]为0）
      break;
    }
  }
  return dp[col];
}

uniquePathsWithObstacles_DP([[0,1,0],[1,1,0],[0,0,0]]);
