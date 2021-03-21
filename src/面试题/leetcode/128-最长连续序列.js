//https://leetcode-cn.com/problems/longest-consecutive-sequence/
/**
 * @param {number[]} nums
 * @return {number}
 */
 var longestConsecutive = function(nums) {
    const set = new Set(nums)
    let result = 0
    for(let v of set.values()){
        if(!set.has(v-1)){
            let num = v
            let len = 1
            while(set.has(num+1)){
                num+=1
                len+=1
            }
            result = Math.max(result,len)
        }
    }
    return result
};