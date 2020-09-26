/**
 * 24. Swap Nodes in Pairs
 * https://leetcode.com/problems/swap-nodes-in-pairs/
 * 
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var swapPairs = function (head) {
    if (!head || !head.next) return head;
    let fakeHead = new ListNode(null);
    fakeHead.next = head;
    let last = fakeHead;
    while (head && head.next) {
        // [state 1]
        // prev --> [first -->  second] --> afterwards 
        //   ^         ^
        //  last      head
        let first = head;
        let second = head.next;

        // swap operations
        // [state 2]
        // prev  [first -->  second] --> afterwards
        //  ^        ^         ^
        // last     head      /
        //   \               /    
        //    \ _ _ _ _ _ _ /
        last.next = second;

        // [state 3]
        //             _ _ _ _ _ _ _ _
        //           /                 \
        //          /                   ∨
        // prev  [first   second] --> afterwards 
        //  ^       ^        ^
        // last   head      /
        //   \             /
        //    \ _ _ _ _ _ /
        first.next = second.next;

        // [state 4]
        //             _ _ _ _ _ _ _ _ _
        //           /  _ _             \
        //          / /     \            \
        //         / ∨       \            ∨
        // prev  [first    second]   afterwards 
        //  ^       ^        ^
        // last   head      /
        //   \             /
        //    \ _ _ _ _ _ /
        second.next = first;

        // reset pointers for next loop
        // [state 5]
        //                      last
        //                       ∨
        // prev --> second --> first --> afterwards
        //                       ^          
        //                     head    
        last = first;
        // [state 6]
        //                      last
        //                       ∨
        // prev --> second --> first --> afterwards
        //                                   ^          
        //                                  head    
        head = first.next;
    }
    return fakeHead.next;
};