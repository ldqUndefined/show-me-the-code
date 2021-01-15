//rgb转16进制
const rgbTo16 = rgb => {
  const withOutP = rgb.slice(4, rgb.length - 1);
  const withOutPArr = withOutP.split(',');
  return (
    '#' +
    withOutPArr
      .map(item => Number(item).toString(16))
      .map(item => (item.length === 2 ? item : '0' + item))
      .join('')
  );
};

console.log(rgbTo16('rbg(255,50,3)'));

const sixteenToRGB = sixteen => {
  sixteen = sixteen.slice(1);
  if (sixteen.length === 3) {
    sixteen = sixteen.split('').reduce((acc, cur) => acc + cur + cur, '');
  }
  let result = sixteen
    .split('')
    .reduce(
      (acc, cur, index) =>
        index % 2 === 0
          ? [...acc, parseInt(cur + sixteen.charAt(index + 1), 16)]
          : acc,
      []
    );
  return `rbg(${result.join(',')})`;
};
console.log(sixteenToRGB('#ff3203'));
