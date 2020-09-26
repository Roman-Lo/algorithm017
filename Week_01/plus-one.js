/**
 * Q66. Plus One
 * https://leetcode.com/problems/plus-one/
 * 
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function (digits) {
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