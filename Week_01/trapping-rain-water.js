/**
 * Q42. Trapping Rain Water: 
 * https://leetcode.com/problems/trapping-rain-water/
 * 
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
    // solveByStack(height);
    solveBySqueeze(height);
};

/**
 * @param {number[]} height
 * @return {number}
 */
var solveByStack = function (height) {
    // 这个我已经理解了，万一忘了，直接看超哥视频即可，此处不做太多注解。
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
var solveBySqueeze = function (height) {
    // 这道题目的进阶思考版：
    // 从逻辑角度来讲，当前的位置蓄水的充要条件，是：
    // 存在一个左边界和一个右边界，比当前的位置要高。
    // 换句话说，我们判定当前位置蓄水与否，不需要边界与其相邻。
    // 而，其实际蓄水量，是其最大左边界以及最大右边界中的最小值与其的差；
    // 那么我们可以双边收敛式地去观察和记录边界，
    // 并且塑造出其蓄水的充要条件即可。
    let collection = 0;
    if (height.length > 2) {
        let left = 0, right = height.length - 1;
        let maxLeft = height[left], maxRight = height[right];
        while (left < right) {
            // 相对当前节点来说，有一个左边界，比已知的最大右边界要小
            if (maxLeft < maxRight) {
                // 如果左边界比当前节点小，那么当前节点不符合蓄水条件，需要更新边界
                if (maxLeft < height[++left]) {
                    maxLeft = height[left];
                } else { 
                    // 反之，节点符合蓄水的充要条件。
                    // 根据`maxLeft < curMaxRight <= maxRight`， 
                    // 我们可以知道，此时的`最大左边界以及最大右边界中的最小值`就是maxLeft，
                    // 所以可以直接求出当前节点的蓄水量
                    collection += maxLeft - height[left];
                }
            } else {
                // 右节点同理。
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
