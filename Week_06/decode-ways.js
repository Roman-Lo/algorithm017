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
 * 思路：根据题目内容，我们可以知道，对于某一个位置`i`的解码结果`R`，抛出其合法性，有两种：R(s[i]), R(s[i-1], s[i])
 * 因此我们可以给出初步的dp方程：f(n) = f(n - 1) + f(n - 2); // PS：简直就是fib
 * 其中： f(n-1) 代表解码结果`R(s[i])`时，之前的解码可能性
 *       f(n-2) 代表解码结果`R(s[i-1], s[i])`时，之前的解码可能性
 *              这里可能比较迷，但其实就是你在这个结果时已经用了两个字符，因此之前的可能性就要排除这两个字符的之前的可能性，所以是(n-2)
 * 图示：
 *                1 2 3 4 ... s(n-2)  s(n-1)  s(n)
 * R(s[i])                            f(n-1) [s[i]] <-- 单字符解码
 * R(s[i-1], s[i])            f(n-2) [s(i-1)  s(i)] <-- 双字符解码
 *
 * 在这个基础上，根据题意进行解码合法性分析，分别可以：
 * 1. 提取或废弃某些可能结果集
 * 2. 直接中断程序
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
 * 于numDecodings_DP一样的思路，但是可以把dp状态表的空间复杂度降低到O(1)，原因是dp方程里的每一步递推只需要依赖前两个计算结果，
 * 这里用s1, s2表示。具体：
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
