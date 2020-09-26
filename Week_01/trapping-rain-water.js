/**
 * Q42. Trapping Rain Water: 
 * https://leetcode.com/problems/trapping-rain-water/
 * 
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
    // solveByStack(height);
    solveBySeueeze(height);
};

/**
 * @param {number[]} height
 * @return {number}
 */
var solveByStack = function (height) {
    let collection = 0;
    if (height.length > 2) {
        const stack = [];
        let i = 0;
        while (i < height.length) {
            while (stack.length && height[stack[stack.length - 1]] < height[i]) {
                const downEdge = height[stack.pop()];
                if (!stack.length) {
                    break; // no left bounds and should end the program right away.
                }
                const left = stack[stack.length - 1];
                collection += (Math.min(height[left], height[i]) - downEdge) * (i - left - 1); // |0 .1 |.2  
            }
            stack.push(i++);
        }
    }
    return collection;
}

/**
 * @param {number[]} height
 * @return {number}
 */
var solveBySeueeze = function (height) {
    let collection = 0;
    if (height.length > 2) {
        let left = 0, right = height.length - 1;
        let maxLeft = height[left], maxRight = height[right];
        while (left < right) {
            if (maxLeft < maxRight) {
                if (maxLeft < height[++left]) {
                    maxLeft = height[left];
                } else {
                    collection += maxLeft - height[left];
                }
            } else {
                if (maxRight < height[--right]) {
                    maxRight = height[right];
                } else {
                    collection += maxRight - height[right];
                }
            }
        }
    }
    return collection;
}
