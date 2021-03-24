const changeIterator = obj => {
  obj[Symbol.iterator] = () => {
    const keys = Object.keys(obj);
    let i = 0;
    return {
      next: () => {
        return i < keys.length
          ? { value: obj[keys[i++]], done: false }
          : { value: undefined, done: true };
      }
    };
  };
};

const test = {
  a: 21,
  b: 412,
  c: '53253'
};
changeIterator(test);
for (let v of test) {
  console.log(v);
}
