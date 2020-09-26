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
    /**
     * 思路：
     * 因为两个数组都已经排好序，且`nums1`的长度为m+n，
     * 那么，对于`num1`中的最末尾元素，即：`nums1[m+n-1]`，
     * 有：`nums1[m+n-1] = Max(MaxNumInNums1, MaxNumInNums2)` 
     * 即：`nums1[m+n-1] = Math.max(nums1[m - 1], nums2[n - 1])`
     * 因此，我们只需要解决这么一个重复子问题：找到当前最大的元素，并放置于当前尾部指针位置。
     * 于是就有了一下题解：
     */
    if (n === 0) return;
    let end = m + n - 1; // 标记尾部的指针，初始化为`nums1`的最后一个元素位置
    let i = m - 1;
    let j = n - 1;
    while (i >= 0 && j >= 0) { // 限定条件，有且仅有两个数组均未被遍历完时，才需要进行差异比较

        nums1[end--] // 每一轮肯定会有一个结果放置在这个尾部指针位置，放置完之后，需要移动到下一个尾部位置，因此直接进行了`end--`操作
            = 
            // 选择较大的元素，并且将其数组对应的最大指针往前移动一格
            nums1[i] > nums2[j] 
            ? nums1[i--] 
            : nums2[j--]; 
    }

    // 这里是后补情况，出现这种情况是因为`nums2`中存在比`nums1`最小元素更小的情况，
    // 因此`nums2`有没有被遍历的元素，我们需要把他们都填充到`nums1`相应的位置
    while (j >= 0) {
        nums1[j] = nums2[j];
        j--;
    }
};