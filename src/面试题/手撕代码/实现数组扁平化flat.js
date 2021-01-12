//实现数组扁平化,reduce+concat+isArray+recursivity
const flatReduce = (arr, depth = 1) => {
  if (depth > 0) {
    return arr.reduce((acc, cur) => {
      return acc.concat(Array.isArray(cur) ? flatReduce(cur, depth - 1) : cur);
    }, []);
  } else {
    return [...arr];
  }
};
let temp = [1, 2, 3, [4], [[42, 3], [21]], [2, [2, [5, [6, [7]]]]]];

console.log(flatReduce(temp, Infinity));
