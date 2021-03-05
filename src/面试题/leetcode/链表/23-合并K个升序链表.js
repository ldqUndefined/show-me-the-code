//https://leetcode-cn.com/problems/merge-k-sorted-lists/
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
let mergeTwo = (l1, l2) => {
  if (!l1) {
    return l2;
  }
  if (!l2) {
    return l1;
  }
  if (l1.val < l2.val) {
    l1.next = mergeTwo(l1.next, l2);
    return l1;
  } else {
    l2.next = mergeTwo(l1, l2.next);
    return l2;
  }
};
var mergeKLists = function(lists) {
  if (lists.length === 0) {
    return null;
  }
  let result = lists[0];
  for (let i = 1; i < lists.length; i++) {
    result = mergeTwo(result, lists[i]);
  }
  return result;
};

//分治,稍微快一点
let mergeTwo = (l1, l2) => {
  if (!l1) {
    return l2;
  }
  if (!l2) {
    return l1;
  }
  if (l1.val < l2.val) {
    l1.next = mergeTwo(l1.next, l2);
    return l1;
  } else {
    l2.next = mergeTwo(l1, l2.next);
    return l2;
  }
};
let mergeCur = (lists, lo, hi) => {
  if (lo === hi) {
    return lists[lo];
  }
  if (lo > hi) {
    return null;
  }
  let mid = Math.floor((lo + hi) / 2);
  return mergeTwo(mergeCur(lists, lo, mid), mergeCur(lists, mid + 1, hi));
};
var mergeKLists = function(lists) {
  return mergeCur(lists, 0, lists.length - 1);
};
