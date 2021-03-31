const flatObj = (obj, keyName = '', result = {}) => {
  const keys = Object.keys(obj);
  for (let key of keys) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      if (Array.isArray(obj)) {
        let tempKeyName = `${keyName}[${key}]`;
        if (!Array.isArray(obj[key])) {
          tempKeyName += '.';
        }
        flatObj(obj[key], tempKeyName, result);
      } else {
        let tempKeyName = keyName + key;
        if (!Array.isArray(obj[key])) {
          tempKeyName += '.';
        }
        flatObj(obj[key], tempKeyName, result);
      }
    } else {
      if (Array.isArray(obj)) {
        result[`${keyName}[${key}]`] = obj[key];
      } else {
        result[keyName + key] = obj[key];
      }
    }
  }
  return result;
};
const test = {
  a: {
    b: {
      c: {
        d: 1
      }
    }
  },
  aa: 2,
  c: [1, 2],
  dd: [{ f: 523 }, { a: { b: { c: { d: { e: 21 } } } } }],
  g: [[[1]]]
};
console.log(flatObj(test));
