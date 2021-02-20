//https://leetcode-cn.com/problems/fu-za-lian-biao-de-fu-zhi-lcof/
/**
 * // Definition for a Node.
 * function Node(val, next, random) {
 *    this.val = val;
 *    this.next = next;
 *    this.random = random;
 * };
 */

/**
 * @param {Node} head
 * @return {Node}
 */
//用hash表版本,时间O(n),空间O(n)
var copyRandomList = function(head) {
  let map = new Map();
  let result = (cur = new Node());
  while (head) {
    let temp;
    if (map.has(head)) {
      temp = map.get(head);
    } else {
      temp = new Node(head.val);
      map.set(head, temp);
    }
    cur.next = temp;
    if (head.next) {
      if (map.get(head.next)) {
        temp.next = map.get(head.next);
      } else {
        temp.next = new Node(head.next.val);
        map.set(head.next, temp.next);
      }
    }
    if (head.random) {
      if (map.get(head.random)) {
        temp.random = map.get(head.random);
      } else {
        temp.random = new Node(head.random.val);
        map.set(head.random, temp.random);
      }
    }
    cur = cur.next;
    head = head.next;
  }
  return result.next;
};

//无hash表，拼接版本，时间O(n),空间O(1)
var copyRandomList = function(head) {
  if (!head) {
    return null;
  }
  let cur = head;
  while (cur) {
    let temp = new Node(cur.val);
    temp.next = cur.next;
    cur.next = temp;
    cur = temp.next;
  }
  cur = head;
  while (cur) {
    let temp = cur.next;
    if (cur.random) {
      temp.random = cur.random.next;
    }
    cur = temp.next;
  }
  cur = head;
  let result = cur.next;
  while (cur) {
    let temp = cur.next;
    cur.next = temp.next;
    if (cur.next) {
      temp.next = cur.next.next;
    }
    cur = cur.next;
  }
  return result;
};
