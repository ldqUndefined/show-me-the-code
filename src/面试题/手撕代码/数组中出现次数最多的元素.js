//数组中出现次数最多的元素
const getMax = arr => {
  const map = new Map();
  let maxNum = 0,
    maxEle = undefined;
  for (let i = 0; i < arr.length; i++) {
    map.set(arr[i], (map.get(arr[i]) || 0) + 1);
    if (map.get(arr[i]) > maxNum) {
      maxNum = map.get(arr[i]);
      maxEle = arr[i];
    }
  }
  return maxEle;
};

console.log(getMax([1, 2, 4, 2, 4, 2, 5, 67, 3, 4, 2, 1]));
