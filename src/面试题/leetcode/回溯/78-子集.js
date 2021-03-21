//https://leetcode-cn.com/problems/subsets/
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
 var subsets = function(nums) {
    const temp = [],result = []
    let n = nums.length
    const dfs = (index) => {
        if(index===n){
            result.push([...temp])
            return
        }
        temp.push(nums[index])
        dfs(index+1)
        temp.pop()
        dfs(index+1)
    }
    dfs(0)
    return result
};