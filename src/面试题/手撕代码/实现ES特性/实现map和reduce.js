//实现map
Array.prototype.map = function(callback, thisArg) {
  let length = this.length;
  let result = Array(length);
  for (let i = 0; i < length; i++) {
    result[i] = callback.call(thisArg, this[i], i, this);
  }
  return result;
};

let temp = [1, 2, 3, 4, 5];
console.log(temp.map(x => x * 2));

//实现reduce
Array.prototype.reduce = function(callback, initialValue) {
  if (initialValue === undefined && this.length === 0) {
    throw new TypeError('error');
  }
  let result = initialValue === undefined ? this[0] : initialValue;
  let index = initialValue === undefined ? 1 : 0;
  let length = this.length;
  for (; index < length; index++) {
    result = callback(result, this[index], index, this);
  }
  return result;
};

let test = [1, 2, 3, 4, 5];
console.log(test.reduce((acc, cur) => acc + cur));

//实现filter
Array.prototype.filter = function(callback, thisArg) {
  let length = this.length;
  let result = [];
  for (let i = 0; i < length; i++) {
    if (callback.call(thisArg, this[i], i, this)) {
      result.push(this[i]);
    }
  }
  return result;
};
let go = [1, 2, 3, 4, 5];
console.log(go.filter(v => v % 2 === 0));
