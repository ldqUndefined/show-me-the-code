//https://leetcode-cn.com/problems/linked-list-cycle-ii/
/**
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
var detectCycle = function(head) {
  if (!head) {
    return null;
  }
  let fast = (slow = head);
  while (fast !== null) {
    if (fast.next) {
      fast = fast.next.next;
      slow = slow.next;
    } else {
      return null;
    }
    if (fast === slow) {
      fast = head;
      while (fast !== slow) {
        fast = fast.next;
        slow = slow.next;
      }
      return slow;
    }
  }
  return null;
};
