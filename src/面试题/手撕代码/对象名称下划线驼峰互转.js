//下划线转驼峰
//正则版
const changeName = obj => {
  const keys = Object.keys(obj);
  const result = {};
  for (let key of keys) {
    let newKey = key.replace(/\_(\w)/g, (_, v) => v.toUpperCase());
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      result[newKey] = changeName(obj[key]);
    } else {
      result[newKey] = obj[key];
    }
  }
  return result;
};
//非正则版
const changeName1 = obj => {
  const keys = Object.keys(obj);
  const result = {};
  for (let key of keys) {
    let newKey = key;
    while (newKey.indexOf('_') !== -1) {
      let index = newKey.indexOf('_');
      if (index < newKey.length - 1) {
        newKey =
          newKey.slice(0, index) +
          newKey.charAt(index + 1).toUpperCase() +
          newKey.slice(index + 2);
      } else {
        newKey = newKey.slice(0, index);
      }
    }
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      result[newKey] = changeName1(obj[key]);
    } else {
      result[newKey] = obj[key];
    }
  }
  return result;
};

let testObj = {
  fdsa_fdsa: 321,
  ta_dsa_fdsa: 'fdas'
};
console.log(changeName1(testObj));

//驼峰转下划线
//正则版
const changeName2 = obj => {
  const keys = Object.keys(obj);
  const result = {};
  for (let key of keys) {
    let newKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      result[newKey] = changeName2(obj[key]);
    } else {
      result[newKey] = obj[key];
    }
  }
  return result;
};

const changeName3 = obj => {
  const keys = Object.keys(obj);
  const result = {};
  for (let key of keys) {
    let newKey = key;
    for (let i = 0; i < newKey.length; i++) {
      let diff = newKey.charCodeAt(i) - 'A'.charCodeAt();
      if (diff >= 0 && diff <= 25) {
        newKey =
          newKey.slice(0, i) +
          '_' +
          newKey.charAt(i).toLowerCase() +
          newKey.slice(i + 1);
        i++;
      }
    }
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      result[newKey] = changeName3(obj[key]);
    } else {
      result[newKey] = obj[key];
    }
  }
  return result;
};

const testObj2 = {
  fdsaNfdasTfdsa: 32,
  fdsaNfdsaAAAfdas: 'fdsa'
};
console.log(changeName3(testObj2));
