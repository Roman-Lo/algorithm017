/**
 * 15. 3Sum
 * https://leetcode.com/problems/3sum/
 * 
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
    const result = [];
    if (nums && nums.length > 2) { // 确保数据需要被计算：有且仅有数组存在且其长度大于等于最小集合长度3；
        // 排序：使偷懒成为可能 （排序desc或者asc皆可，此处用asc排序，若用desc排序，后续判定逆转即可）
        // *** 排序时间复杂度记录为：O(nlog(n)) ***
        nums = nums.sort((a, b) => a - b); 

        // 开始从第一个元素起，进行集合枚举
        // *** 对n个元素的循环时间复杂度：O(n) ***
        for (let i = 0; i < nums.length - 1; i++) {
            if (nums[i] > 0) {
                // 对位于[1,)区间的a,b,c，不可能满足a+b+c=0，
                // 而我们的数组已经sorted ascendingly，
                // 因此直接中断程序并返回结果；
                return result;
            }
            if (i > 0 && nums[i] === nums[i - 1]) {
                // 当第i次遍历完成后，意味着以第i个元素值开始的集合已经全部枚举完毕，
                // 因此这里通过比对当前元素与上一个元素的值，来确定是否可以偷懒；
                continue;
            }
            // 定义左，右闭区间进行枚举，其中：
            // 因为元素不可重复使用
            // 因此左边界应该为当前元素的下一个元素，右边界永远都是数组的右边界
            let left = i + 1;
            let right = nums.length - 1;

            // 当边界未重叠时，我们对其进行逼近操作; 
            // *** 这里的逼近操作是一个(n-i)次循环过程，时间复杂度记录为：O(n) ***
            while (left < right) { 
                const sum = nums[i] + nums[left] + nums[right]; // 求当前元素与边界值的和
                if (sum === 0) {
                    result.push([nums[i], nums[left], nums[right]]);
                    // 下面两步，用于消除已经计算了的重复边界值（此处前提依然是，我们的数据已经排序好）
                    // eg: [-2, -2, -2, -1, 0, 0, 2, 3, 4, 4]
                    //       ^                             ^
                    //       left                          right
                    // 不难发现，当前在left后面的所有`-2`元素都是没必要再计算的，同理right左边的`4`元素也一样
                    while (left < right && nums[left] === nums[++left]); 
                    while (left < right && nums[right] === nums[--right]);
                } 
                // 当求和不符合条件时：
                else if (sum > 0) { 
                    // 和大于0，意味着我们需要尝试更小的数，也就是要缩减最大值（右边界左移）
                    right--;
                } else { 
                    // sum < 0; 和小于0，意味着我们需要尝试更大的数，也就是要增加最小值（左边界右移）
                    left++;
                }
            }
        }
    }
    // 综上所述
    // 时间复杂度为 O(nlog(n)) + O(n) * O(n) = O(n^2)
    // 空间复杂度为 O(1)
    return result;
};