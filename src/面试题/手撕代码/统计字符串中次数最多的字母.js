//统计字符串中次数最多的字母
const getMost = str => {
  let map = new Map();
  let length = str.length;
  for (let i = 0; i < length; i++) {
    let char = str.charAt(i);
    map.set(char, (map.get(char) || 0) + 1);
  }
  let char = str.charAt(0),
    num = map.get(char);
  for (let [c, v] of map.entries()) {
    if (v > num) {
      char = c;
      num = v;
    }
  }
  return char;
};

console.log(getMost('fhdsuihbpahuipthueiwpg'));
console.log(getMost('313141535'));
console.log(getMost('gd124sdrwwww'));
