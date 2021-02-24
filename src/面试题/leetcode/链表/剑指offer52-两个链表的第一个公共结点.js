//https://leetcode-cn.com/problems/liang-ge-lian-biao-de-di-yi-ge-gong-gong-jie-dian-lcof/
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function(headA, headB) {
  let set = new Set();
  while (headA) {
    set.add(headA);
    headA = headA.next;
  }
  while (headB) {
    if (set.has(headB)) {
      return headB;
    } else {
      headB = headB.next;
    }
  }
  return null;
};

//空间O(1)解法
var getIntersectionNode = function(headA, headB) {
  let a = headA,
    b = headB;
  while (a !== b) {
    if (!a) {
      a = headB;
    } else {
      a = a.next;
    }
    if (!b) {
      b = headA;
    } else {
      b = b.next;
    }
  }
  return a;
};
