/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
  return permute_Recursive(nums);
};

/**
 * 思路：其实就是C(n,n)的组合问题，给定`n`个空位，从n个不重复的取值项目里填充；
 * 问题可以简化成：
 * 1. 对于当前每一个可取值元素，分别填充到当前空位中
 * 2. 获取剩余的可选择元素并重复该逻辑
 * (#terminator) 当集合大小为`n`（或者可取值范围为空时），结束并存放结果
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute_Recursive = function (nums) {
  const results = [];
  const size = nums.length;
  /**
   * @param {number[]} s 当前集合
   * @param {number[]} range 可用元素
   */
  const place = function (s, range) {
    if (s.length === size) { // #terminator
      results.push([...s]);
      return;
    }
    for (let i = 0; i < range.length; i++) {
      // 1.
      s.push(range[i]);
      // 2.
      const nxRange = [...range];
      nxRange.splice(i, 1);
      place(s, nxRange);
      // recover state
      s.pop();
    }
  };

  place([], nums);

  return results;
}
