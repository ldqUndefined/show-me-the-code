//数组去重

//es6语法
const removeDup1 = (arr) => [...new Set(arr)]


//不用es6语法
function removeDup(arr){
  var result = []
  for(var i = 0;i<arr.length;i++){
    if(arr.indexOf(arr[i])===i){
      result.push(arr[i])
    }
  }
  return result
}

