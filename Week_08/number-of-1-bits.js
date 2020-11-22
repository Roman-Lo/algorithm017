/**
 * [191] 位1的个数
 *
 * https://leetcode-cn.com/problems/number-of-1-bits/description/
 *
 * @param {number} n - a positive integer
 * @return {number}
 */
var hammingWeight = function (n) {
  // 思路：每次运算将其最后一个1位置零并计数，直到数值等于0，即完成
  let cnt = 0;
  while (n != 0) {
    n = n & (n - 1); // 根据位运算性质，n & (n - 1) 可以将其最后一个1位置零
    cnt++;
  }
  return cnt;
};
