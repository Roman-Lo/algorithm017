/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {

  return climbStairs_Loop(n);
  // return climbStairs_recursive(n);
};

/**
 * @param {number} n
 * @return {number}
 */
var climbStairs_recursive = function (n) {
  if (n === 0) return 0;
  const memo = new Map(); // 将每一阶的可能走法存起来，方便复用
  memo.set(1, 1); // 计算基础：当一阶时，只有一种走法
  memo.set(2, 2); // 计算基础：当两阶时，有两种走法
  var climbCount = function (lvl) {
    if (memo.has(lvl)) { return memo.get(lvl); }
    const count =
      climbCount(lvl - 1) // 抵达一步距离的阶走法数
      + climbCount(lvl - 2); // 抵达两步距离的阶走法数
    memo.set(lvl, count);
    return count;
  }
  return climbCount(n);
}

/**
 * 思路：根据上述递归的特性，因为计算当前层只需要前两层的结果，即：
 * 只需要存储近两层的步数（p1, p2）相加即可得出当前层的步数和（s）,
 * 初始层数为1，因此p1取值0， p2取值1，
 * @param {number} n
 * @return {number}
 */
var climbStairs_Loop = function (n) {
  if (n === 0) return 0;
  let s = 0, p1 = 0, p2 = 1;
  while (n-- > 0) {
    s = p1 + p2;
    p1 = p2;
    p2 = s;
  }
  return s;
}
