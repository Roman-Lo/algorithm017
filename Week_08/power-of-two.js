/**
 *
 * [231] 2的幂
 *
 * https://leetcode-cn.com/problems/power-of-two/description/
 * @param {number} n
 * @return {boolean}
 */
var isPowerOfTwo = function(n) {
  // 思路：二次幂肯定是正数，且在二进制表达中，仅有一个位为1。因此可以根据`[191] 位1的个数`相同思路进行解答：
  return n > 0 // 确保数值为正
      &&
        (n & (n - 1)) === 0 // 将其最后一个1位置零后如果是零，说明刚刚被置零的那个1是唯一的1。
};
