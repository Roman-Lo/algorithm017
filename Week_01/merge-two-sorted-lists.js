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
    if (!l1) { return l2; }
    else if (!l2) { return l1; }
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