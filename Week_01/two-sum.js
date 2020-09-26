/**
 * Q1. Two Sum
 * https://leetcode.com/problems/two-sum/
 * 
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    const m = new Map();
    for (let i = 0; i < nums.length; i++) {
        if (m.has(nums[i])) {
            return [m.get(i), i];
        } else {
            m.set(target - nums[i], i);
        }
    }
    return []; // nothing is found 
};