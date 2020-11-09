/**
 * [62] 不同路径
 * https://leetcode-cn.com/problems/unique-paths/description/
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function(m, n) {
  uniquePaths_DP(m, n);
};

/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths_DP = function(m, n) {
  // 规律，走到每一个格子的路径和相当于其上面和右边能走的路径和相加
  // dp方程： f(x,y) = f(x - 1, y) + f(x, y - 1);
  // 有: f(0, y) = y; f(x, 0) = (x);
  // 结果： f(m, n)
  // 只存一行即可
  const dp = [];
  // 初始化首行为1（因为从边沿走只会有一种走法），因此初始化首层值为1
  for (let x = 0; x < m; x++) { dp[x] = 1; }
  for (let y = 1; y < n; y++) { // 遍历每一层，此时y对应着dp数组所在行
    // 每一层的首个格子也属于边沿，因此也只会有一种路径，而我们已经初始化dp[0]为1，
    // 因此这里直接从第二个格子开始计算即可
    for (let x = 1; x < m; x++) { // 遍历每一列，此时x对应着列数
      // 由于y不变，因此：
      // f(x - 1, y) ==> dp[x - 1];
      // f(x, y - 1) ==> dp[x];
      // 对于当前y的 f(x,y) = dp[x - 1] + dp[x];
      dp[x] = dp[x - 1] + dp[x];
    }
  }
  // 此时y已经抵达底部因此，f(m, n) ==> dp[m - 1]
  return dp[m - 1];
}

uniquePaths_DP(7, 3);
