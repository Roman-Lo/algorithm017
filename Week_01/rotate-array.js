/**
 * 189. 旋转数组
 * https://leetcode-cn.com/problems/rotate-array/
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function (nums, k) {

};

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var solveByReserve = function (nums, k) {
    // reverse the sub array from the given start pos to the given end pos.
    var reverse = function (start, end) {
        while (start < end) {
            const tmp = nums[start];
            nums[start] = nums[end];
            nums[end] = tmp;
            start++;
            end--;
        }
    }

    k = k % nums.length;
    reverse(0, nums.length - 1);
    reverse(0, k - 1);
    reverse(k, nums.length - 1);
}

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var solveByNextAct = function (nums, k) {
    if (nums.length <= 1) return;
    if (k === 0) return;
    let start = 0;
    let i = 0;
    let act = k % nums.length;
    let hold = null;
    let pos = 0;
    while(i++ < nums.length) {
        let tmp = nums[pos];
        nums[pos] = hold;
        hold = tmp;
        pos = (pos + act) % nums.length;
        if (pos === start) {
            nums[pos] = hold;
            hold = null;
            start++;
            pos = start;
        }
    }
}