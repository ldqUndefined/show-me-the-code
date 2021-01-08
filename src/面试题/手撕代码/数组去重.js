//数组去重

//es6语法
const removeDup1 = arr => [...new Set(arr)];

//不用es6语法
//用indexOf，新空间，O(n2)
function removeDup1(arr) {
  var result = [];
  for (var i = 0; i < arr.length; i++) {
    if (arr.indexOf(arr[i]) === i) {
      result.push(arr[i]);
    }
  }
  return result;
}
//用splice，操作原数组，没有新空间，O(n2)
function removeDup2(arr) {
  for (var i = 0; i < arr.length; i++) {
    for (var j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j]) {
        arr.splice(j, 1);
        j--;
      }
    }
  }
  return arr;
}
//用sort，操作元素组，生成新空间，O(nlogn)
function removeDup3(arr) {
  arr.sort();
  var result = [arr[0]];
  for (var i = 1; i < arr.length; i++) {
    if (arr[i] !== arr[i - 1]) {
      result.push(arr[i]);
    }
  }
  return result;
}
//用对象属性，新空间，O(n)，有问题，无法区分数字和字符串
function removeDup4(arr) {
  var result = [];
  var obj = {};
  for (var i = 0; i < arr.length; i++) {
    if (!obj[arr[i]]) {
      obj[arr[i]] = true;
      result.push(arr[i]);
    }
  }
  return result;
}
//用filter，很声明式,O(n2)
function removeDup5(arr) {
  return arr.filter((item, index) => arr.indexOf(item) === index);
}
