/**
 * Q283. Move Zeroes
 * https://leetcode.com/problems/move-zeroes/
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function (nums) {
    for (let pos = 0, cursor = 1; cursor < nums.length; cursor++) {
        if (nums[pos] === 0) {
            if (nums[cursor] !== 0) {
                nums[pos++] = nums[cursor];
                nums[cursor] = 0;
            }
        } else {
            pos++;
        }
    }
};

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var officialSolution = function (nums) {
    let lstZIndex = 0;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== 0) {
            nums[lstZIndex++] = nums[i];
        }
    }
    while (lstZIndex < nums.length) {
        nums[lstZIndex++] = 0;
    }
}

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var officialOptimizedSolution = function (nums) {
    for (let pos = 0, cursor = 0; cursor < nums.length; cursor++) {
        if (nums[cursor] != 0) {
            let tmp = nums[pos];
            nums[pos++] = nums[cursor];
            nums[cursor] = tmp;
        }
    }
}