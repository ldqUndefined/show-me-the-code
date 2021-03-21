//https://leetcode-cn.com/problems/unique-binary-search-trees/
/**
 * @param {number} n
 * @return {number}
 */
 var numTrees = function(n) {
    let result = []
    result[0] = 1
    result[1] = 1
    result[2] = 2
    for(let i = 3;i<=n;i++){
        let temp = 0
        for(let j = 0;j<Math.floor(i/2);j++){
            temp += (result[j]*result[i-j-1])*2
        }
        if(i%2===1){
            temp += result[(i-1)/2]*result[(i-1)/2]
        }
        result[i] = temp
    }
    return result[n]
};