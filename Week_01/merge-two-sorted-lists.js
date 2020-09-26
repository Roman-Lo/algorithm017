/**
 * 21. Merge Two Sorted Lists
 * https://leetcode.com/problems/merge-two-sorted-lists/
 * 
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function (l1, l2) {
    // solveByRecursion(l1, l2);
    solveByIteration(l1, l2);
};

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var solveByRecursion = function (l1, l2) {
    // 递归终止条件：
    // 如果`l1`是`null`的时候，这里其实意味着`l1`已经终结了，这时候l2可能为`null`（已经结束）也可能还有后续节点，因此要返回`l2`;
    // 同理，当`l2`为`null`的时候，要返回`l1`
    if (!l1) { return l2; }
    else if (!l2) { return l1; }
    // 由于我们当前的数列是从小到大排列的，
    // 因此对于任意节点的值，比对方的值大的时候，我们要把将小值的节点留下，
    // 并将其`->next`链接到，通过小值节点的下一个节点与大值节点进行运算得出的结果。
    else if (l1.val > l2.val) {
        l2.next = solveByRecursion(l1, l2.next);
        return l2;
    } else {
        l1.next = solveByRecursion(l1.next, l2);
        return l1;
    }
}


/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var solveByIteration = function (l1, l2) {
    const fakeHead = new ListNode(-1);
    let prev = fakeHead;
    // 这个其实就是递归flatten版，看递归里的注释即可。
    while (l1 && l2) {
        if (l2.val > l1.val) {
            prev.next = l1;
            l1 = l1.next;
        } else {
            prev.next = l2;
            l2 = l2.next;
        }
        prev = prev.next;
    }
    if (l1) { prev.next = l1; }
    else if (l2) { prev.next = l2; }
    return fakeHead.next;
}


function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
}