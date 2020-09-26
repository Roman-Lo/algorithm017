/**
 * Q88. Merge Sorted Array
 * https://leetcode.com/problems/merge-sorted-array/
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function (nums1, m, nums2, n) {
    if (n === 0) return;
    let end = m + n - 1;
    let i = m - 1;
    let j = n - 1;
    while (i >= 0 && j >= 0) {
        nums1[end--] = nums1[i] > nums2[j] ? nums1[i--] : nums2[j--]; 
    }
    while (j >= 0) {
        nums1[j] = nums2[j];
        j--;
    }
};