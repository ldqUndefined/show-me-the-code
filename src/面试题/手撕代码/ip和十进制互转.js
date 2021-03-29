//https://www.nowcoder.com/questionTerminal/66ca0e28f90c42a196afd78cc9c496ea
const transformIPToNum = ip => {
  let ipArr = ip.split('.');
  let one = (Number(ipArr[0]) & 255) << 24;
  let two = (Number(ipArr[1]) & 255) << 16;
  let three = (Number(ipArr[2]) & 255) << 8;
  let four = Number(ipArr[3]) & 255;
  return one | two | three | four;
};
const transformNumToIP = num => {
  let one = (num >> 24) & 255;
  let two = (num >> 16) & 255;
  let tree = (num >> 8) & 255;
  let four = num & 255;
  return [one, two, tree, four].join('.');
};
