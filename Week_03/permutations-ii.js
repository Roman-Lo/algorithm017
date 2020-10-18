/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteUnique = function (nums) {

};



/**
 * 基于 `permute` 题目的加入hashset做法。
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteUnique_Recursive_HashSet = function (nums) {
  const results = [];
  const existed = new Set();
  const size = nums.length;
  /**
   * @param {number[]} s 当前集合
   * @param {number[]} range 可用元素
   */
  const place = function (s, range) {
    if (s.length === size) { // #terminator
      const key = s.join('');
      if (!existed.has(key)) {
        results.push([...s]);
        existed.add(key);
      }
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



/**
 * 思路：依旧基于 `permute` 题目，但是因为有重复元素，所以应该予以排除，
 * 而排除的最有效办法，就是排序然后与i-1元素比较，重复的话直接跳过。
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteUnique_Recursive_PreSorting = function (nums) {
  const results = [];
  const size = nums.length;
  const existOfi = [];
  nums = nums.sort();
  /**
   * @param {number[]} s 当前集合
   * @param {number[]} range 可用元素
   */
  const place = function (s) {
    if (s.length === size) { // #terminator
      results.push([...s]);
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      if (existOfi[i] || i > 0 && nums[i - 1] === nums[i] && !existOfi[i - 1]) {
        continue;
      }
      // 1.
      s.push(nums[i]);
      existOfi[i] = true;
      // 2.
      place(s);
      // reverse state
      s.pop();
      existOfi[i] = false;
    }
  };

  place([]);

  return results;
}
