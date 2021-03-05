//https://leetcode-cn.com/problems/add-two-numbers/
/**
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
var addTwoNumbers = function(l1, l2) {
  let result = (cur = new ListNode()),
    carry = 0;
  while (l1 || l2 || carry !== 0) {
    let a = l1 !== null ? l1.val : 0;
    let b = l2 !== null ? l2.val : 0;
    let temp = a + b + carry;
    cur.next = new ListNode(temp % 10);
    carry = temp >= 10 ? 1 : 0;
    if (l1) {
      l1 = l1.next;
    }
    if (l2) {
      l2 = l2.next;
    }
    cur = cur.next;
  }
  return result.next;
};
