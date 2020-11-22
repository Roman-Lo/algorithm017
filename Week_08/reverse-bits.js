/**
 * @param {number} n - a positive integer
 * @return {number} - a positive integer
 */
var reverseBits = function(n) {
    let r = 0, cnt = 32; // 正数为32位
    while (cnt--) {
      r = (r << 1) + (n & 1); // r左移一位并在末位加入当前n最后一位数字
      n >>= 1; // n右移1位
    }
    return r >>> 0; // js零填充右位移（将0补充到符号位）
};
