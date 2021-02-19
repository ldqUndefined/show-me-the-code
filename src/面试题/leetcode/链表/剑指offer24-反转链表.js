//https://leetcode-cn.com/problems/fan-zhuan-lian-biao-lcof/
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
var reverseList = function(head) {
  let prev = null,
    cur = head;
  while (cur) {
    let second = cur.next;
    cur.next = prev;
    prev = cur;
    cur = second;
  }
  return prev;
};

//递归版
var reverseList = function(head) {
  if (!head || !head.next) {
    return head;
  }
  let second = head.next;
  head.next = null;
  let result = reverseList(second);
  second.next = head;
  return result;
};
