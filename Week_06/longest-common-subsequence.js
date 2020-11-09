/*
 * @lc app=leetcode.cn id=1143 lang=javascript
 *
 * [1143] 最长公共子序列
 *
 * https://leetcode-cn.com/problems/longest-common-subsequence/description/
 *
 */

// @lc code=start
/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
var longestCommonSubsequence = function (text1, text2) {
  // dp: f(m, n) = t[m] === t[n]
  //               ? f(m - 1, n - 1) + 1
  //               : max(f(m - 1, n), f(m, n - 1));
  const dp = [];
  for (let i = 0; i < text1.length; i++) {
    dp.push([]);
    for (let j = 0; j < text2.length; j++) {
      if (text1[i] === text2[j]) {
        dp[i][j] = 1 + (dp[i - 1] || [])[j - 1] || 0;
      } else {
        dp[i][j] = Math.max(
          (dp[i - 1] || [])[j] || 0,
          (dp[i][j - 1] || 0)
        );
      }
    }
  }
  return dp[text1.length - 1][text2.length - 1];
};
// @lc code=end
longestCommonSubsequence("bsbininm",
"jmjkbkjkv")
