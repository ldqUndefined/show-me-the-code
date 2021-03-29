//https://leetcode-cn.com/problems/rotate-list/
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var rotateRight = function(head, k) {
  let result = new ListNode();
  result.next = head;
  let cur = head;
  let len = 0;
  while (cur) {
    len++;
    cur = cur.next;
  }
  let diff = len - (k % len);
  cur = result;
  while (diff-- > 0) {
    cur = cur.next;
  }

  let last = cur;
  while (last) {
    if (!last.next) {
      break;
    }
    last = last.next;
  }
  last.next = result.next;
  result.next = cur.next;
  cur.next = null;
  return result.next;
};
