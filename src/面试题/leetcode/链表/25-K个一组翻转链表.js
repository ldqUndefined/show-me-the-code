//https://leetcode-cn.com/problems/reverse-nodes-in-k-group/
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var reverseKGroup = function(head, k) {
  let result = new ListNode();
  result.next = head;
  let cur = result;
  while (cur) {
    let last = cur.next;
    for (let i = 0; i < k; i++) {
      if (!last) {
        return result.next;
      }
      last = last.next;
    }
    let prev = null,
      current = cur.next;
    for (let i = 0; i < k; i++) {
      let next = current.next;
      current.next = prev;
      prev = current;
      current = next;
    }
    let p = cur.next;
    p.next = last;
    cur.next = prev;
    cur = p;
  }
  return result.next;
};
