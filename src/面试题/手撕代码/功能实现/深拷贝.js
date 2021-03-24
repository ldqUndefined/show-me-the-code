//深拷贝
//丐版
const deepCloneEasy = obj => JSON.parse(JSON.stringify(obj));

//递归版

const deepClone = (target, map = new Map()) => {
  if (typeof target !== 'object' || target === null) {
    return target;
  }
  if (map.has(target)) {
    return map.get(target);
  }
  if (isMap(target)) {
    const cloneMap = new Map();
    for (let [mapKey, mapValue] of target.values()) {
      cloneMap.set(deepClone(mapKey), deepClone(mapValue));
    }
    map.set(target, cloneMap);
    return cloneMap;
  }
  if (isSet(target)) {
    const cloneSet = new Set();
    for (let setValue of target.values()) {
      cloneSet.add(deepClone(setValue));
    }
    map.set(target, cloneSet);
    return cloneSet;
  }

  const cloneTarget = Array.isArray(target) ? [] : {};
  map.set(target, cloneTarget);
  for (let key of [
    ...Object.keys(target),
    ...Object.getOwnPropertySymbols(target)
  ]) {
    if (Object.prototype.hasOwnProperty.call(target, key)) {
      if (typeof target[key] !== 'object' || target[key] === null) {
        cloneTarget[key] = target[key];
      } else {
        cloneTarget[key] = deepClone(target[key], map);
      }
    }
  }
  return cloneTarget;
};

const getType = obj => {
  return Object.prototype.toString.call(obj);
};
const isSet = obj => {
  return getType(obj) === ['object Set'];
};
const isMap = obj => {
  return getType(obj) === ['object Map'];
};

//迭代版
const deepClone = target => {
  if (typeof target !== 'object' || target === null) {
    return target;
  }
  const root = Array.isArray(target) ? [] : {};
  const map = new Map();
  map.set(target, root);
  const loopStack = [{ parent: root, key: undefined, data: target }];
  while (loopStack.length > 0) {
    const { parent, key, data } = loopStack.pop();
    let copyTo = parent;
    if (key !== undefined) {
      if (map.has(data)) {
        parent[key] = map.get(data);
        continue;
      } else {
        if (Object.prototype.toString.call(data) === '[object Map]') {
          copyTo = parent[key] = new Map();
          for (let [mapKey, mapValue] of data.entries()) {
            let copyMapKey = getInitialValue(mapKey);
            let copyMapValue = getInitialValue(mapValue);
            copyTo.set(copyMapKey, copyMapValue);
            if (isObject(copyMapKey)) {
              loopStack.push({
                parent: copyMapKey,
                key: undefined,
                data: mapKey
              });
              map.set(mapKey, copyMapKey);
            }
            if (isObject(copyMapValue)) {
              loopStack.push({
                parent: copyMapValue,
                key: undefined,
                data: mapValue
              });
              map.set(mapValue, copyMapValue);
            }
          }
          continue;
        }
        if (Object.prototype.toString.call(data) === '[object Set]') {
          copyTo = parent[key] = new Set();
          for (let setValue of data.values()) {
            let copySetValue = getInitialValue(setValue);
            copyTo.add(copySetValue);
            if (isObject(copySetValue)) {
              loopStack.push({
                parent: copySetValue,
                key: undefined,
                data: setValue
              });
              map.set(setValue, copySetValue);
            }
          }
          continue;
        }
        copyTo = parent[key] = Array.isArray(data) ? [] : {};
        map.set(data, copyTo);
      }
    }
    for (let k of [
      ...Object.keys(data),
      ...Object.getOwnPropertySymbols(data)
    ]) {
      if (Object.prototype.hasOwnProperty.call(data, k)) {
        if (typeof data[k] !== 'object' || data[k] === null) {
          copyTo[k] = data[k];
        } else {
          loopStack.push({
            parent: copyTo,
            key: k,
            data: data[k]
          });
        }
      }
    }
  }
  return root;
};

const getInitialValue = value => {
  if (typeof value !== 'object' || value === null) {
    return value;
  } else if (Array.isArray(value)) {
    return [];
  } else {
    return {};
  }
};
const isObject = value => {
  return typeof value === 'object' && value !== null;
};

//测试用例
const a = {
  b: 1,
  c: '31',
  d: null,
  e: undefined,
  h: {
    i: {
      j: {
        k: {
          [Symbol('j')]: 'j',
          [Symbol('k')]: Symbol('m')
        }
      }
    }
  },
  n: [1, { b: 2 }, 'fdsa', undefined, null, Symbol('s')],
  [Symbol('o')]: '000',
  map: new Map([
    [1, '21'],
    [{ bb: 66 }, 'fdsa']
  ]),
  set: new Set([{ fff: '21' }, 21, [2, { fds: '321' }, 2]])
};
a.self = a;
const result = deepClone(a);
