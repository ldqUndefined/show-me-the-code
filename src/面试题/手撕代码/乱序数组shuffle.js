//[1,2,3].sort(()=>Math.random()-0.5)的结果不是真正的乱序
//这是因为V8引擎中对sort的实现当数组元素小于10个时是使用的插入排序
//插入排序的特点是：当前轮比较元素如果比下标为i元素大，则认为该元素大于所有下标小于i的元素，就停止比较
//正是这个原因导致了越靠前的元素在离自己原始位置的概率越大。

//shuffle真正乱序的实现
const shuffle = arr => {
  for (let i = arr.length; i > 1; i--) {
    let j = Math.floor(Math.random() * i);
    let temp = arr[i - 1];
    arr[i - 1] = arr[j];
    arr[j] = temp;
  }
  console.log(arr);
};

shuffle([1, 2, 3, 4, 5, 6, 7, 8]);
shuffle([1, 2, 3, 4, 5, 6, 7, 8]);
shuffle([1, 2, 3, 4, 5, 6, 7, 8]);
shuffle([1, 2, 3, 4, 5, 6, 7, 8]);
