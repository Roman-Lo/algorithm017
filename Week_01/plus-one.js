/**
 * Q66. Plus One
 * https://leetcode.com/problems/plus-one/
 * 
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function (digits) {
    /**
     * 思路：
     * 这个题目非常简单，把它模拟成我们平时的竖式计算即可
     *   a[0] a[1] ... a[n]
     * +                  1
     * ---------------------
     * 可以很明显看出，我们需要从数组末尾节点开始，因为只是单纯的`+1`，进位触发就仅有当
     * 当前位置为数字`9`的时候才会发生，所以也用不着取模余(%)的操作。
     * 如果数字刚好都是`9`，意味着数组需要在头部插入一个进位`1`。
     */
    let i = digits.length - 1;
    do {
        if (digits[i] == 9) {
            digits[i] = 0;
        } else {
            digits[i]++;
            return digits;
        }
    } while (i-- > 0)
    return [1, ...digits];
};