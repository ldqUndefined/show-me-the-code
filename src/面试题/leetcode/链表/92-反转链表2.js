//https://leetcode-cn.com/problems/reverse-linked-list-ii/submissions/
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */
var reverseBetween = function(head, left, right) {
  let result = (cur = new ListNode());
  result.next = head;
  for (let i = 0; i < left - 1; i++) {
    cur = cur.next;
  }
  let pHead = cur.next,
    prev = null;
  for (let i = 0; i <= right - left; i++) {
    let second = pHead.next;
    pHead.next = prev;
    prev = pHead;
    pHead = second;
  }
  cur.next.next = pHead;
  cur.next = prev;
  return result.next;
};
