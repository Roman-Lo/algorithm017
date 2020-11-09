/*
 * @lc app=leetcode.cn id=91 lang=javascript
 *
 * [91] 解码方法
 *
 * https://leetcode-cn.com/problems/decode-ways/description/
 *
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var numDecodings = function (s) {
  return numDecodings_DP(s);
};
// @lc code=end

/**
 *
 * @param {string} s
 * @return {number}
 */
var numDecodings_DP = function (s) {
  if (!s || s.length === 0 || s === '0') return 0;
  if (s[0] === '0') return 0;
  const dp = [1]; // 初始化dp[0]
  for (let i = 1; i < s.length; i++) {
    if (s[i] === '0') {
      if (s[i - 1] === '0') return 0;
      else if (s[i - 1] === '1' || s[i - 1] == '2') dp[i] = dp[i - 2] || 1;
      else return 0;
    } else {
      const connectedVal = parseInt(s.substr(i - 1, 2));
      if (connectedVal > 10 && connectedVal < 27) {
        dp[i] = dp[i - 1] + (dp[i - 2] || 1);
      } else {
        dp[i] = dp[i - 1];
      }
    }
  }
  return dp[s.length - 1];
}

/**
 *
 * @param {string} s
 * @return {number}
 */
var numDecodings_DPV2 = function (s) {
  if (!s || s.length === 0 || s === '0') return 0;
  if (s[0] === '0') return 0;
  let s1 = 1, s2 = 1;
  for (let i = 1; i < s.length; i++) {
    let cur = s2;
    if (s[i] === '0') {
      if (s[i - 1] === '0') return 0;
      else if (s[i - 1] === '1' || s[i - 1] == '2') cur = s1;
      else return 0;
    } else {
      const connectedVal = parseInt(s.substr(i - 1, 2));
      if (connectedVal > 10 && connectedVal < 27) {
        cur = s2 + s1;
      } else {
        cur = s2;
      }
    }
    s1 = s2;
    s2 = cur;
  }
  return s2;
}

numDecodings_DP('27');
