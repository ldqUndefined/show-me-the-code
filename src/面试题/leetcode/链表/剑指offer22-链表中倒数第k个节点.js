//https://leetcode-cn.com/problems/lian-biao-zhong-dao-shu-di-kge-jie-dian-lcof/
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
var getKthFromEnd = function(head, k) {
  let cur = head;
  while (--k > 0) {
    cur = cur.next;
  }
  while (cur.next) {
    cur = cur.next;
    head = head.next;
  }
  return head;
};

//牛客网
//https://www.nowcoder.com/practice/529d3ae5a407492994ad2a246518148a?tpId=13&tqId=11167&rp=1&ru=%2Fta%2Fcoding-interviews&qru=%2Fta%2Fcoding-interviews%2Fquestion-ranking&tab=answerKey
/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/
function FindKthToTail(head, k) {
  if (k <= 0) {
    return null;
  }
  let cur = head;
  while (--k > 0) {
    if (!cur || !cur.next) {
      return null;
    }
    cur = cur.next;
  }
  while (cur.next) {
    cur = cur.next;
    head = head.next;
  }
  return head;
}
