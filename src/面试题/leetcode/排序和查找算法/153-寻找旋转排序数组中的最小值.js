//https://leetcode-cn.com/problems/find-minimum-in-rotated-sorted-array/
/**
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function(nums) {
    let lo = 0,hi = nums.length-1,right = nums[nums.length-1]
    while(lo<hi){
        let mid = Math.floor((lo+hi)/2)
        if(nums[mid]>right){
            lo = mid+1
        }else{
            hi = mid
        }
    }
    return nums[lo]
};