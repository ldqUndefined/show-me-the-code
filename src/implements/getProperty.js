//获取对象上的属性，当path为字符串时，直接获取，当path为数组时，获取元素深层的值
const getProperty = (obj, path) => {
  if (Array.isArray(path)) {
    return getDeep(obj, path);
  } else {
    return getShallow(obj, path);
  }
};

const getShallow = (obj, key) => {
  return obj == null ? undefined : obj[key];
};

const getDeep = (obj, path) => {
  const len = path.length;
  for(let i = 0;i<len;i++){
    if(obj==null){
      return undefined
    }
    obj = obj[path[i]]
  }
  return len !== 0 ? obj : undefined
};

let obj = {
  a:{
    b:{
      c:423
    }
  },
  d:532
}
getProperty(obj,'d')
getProperty(obj,['a,b,c'])