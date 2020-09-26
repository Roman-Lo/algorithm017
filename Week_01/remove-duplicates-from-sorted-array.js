/**
 * #26. Remove Duplicates from Sorted Array
 * 
 * https://leetcode.com/problems/remove-duplicates-from-sorted-array/
 * 
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    let pos = 0;
    for (let cursor = 1; cursor < nums.length; cursor++) {
        if (nums[pos] !== nums[cursor]) {
            nums[++pos] = nums[cursor];
        }
    }
    return pos + 1;
};