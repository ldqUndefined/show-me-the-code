//两个数组求交集、并集

//es6版交集
const intersection = (arr1,arr2) => {
  const arr1Set = new Set(arr1)
  const result = []
  arr2.forEach(item=>{
    if(arr1Set.has(item)){
      result.push(item)
      arr1Set.delete(item)
    }
  })
  return result
}


//es6版并集
const union = (arr1,arr2) => [...new Set([...arr1,...arr2])]

