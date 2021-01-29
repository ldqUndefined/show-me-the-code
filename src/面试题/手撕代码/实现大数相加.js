const bigNumAdd = (num1, num2) => {
  if (num1.length > num2.length) {
    let temp = num1;
    num1 = num2;
    num2 = temp;
  }
  let diff = '0'.repeat(num2.length - num1.length);
  num1 = diff + num1;
  let result = [],
    carry = 0,
    len = num1.length;
  for (let i = len - 1; i >= 0; i--) {
    let digit = Number(num1.charAt(i)) + Number(num2.charAt(i));
    result[i] = (digit + carry) % 10;
    carry = digit + carry > 9 ? 1 : 0;
  }
  result = result.join('');
  return carry > 0 ? '1' + result : result;
};

console.log(
  bigNumAdd(
    '87597864865856387547425754278654897659',
    '8658865865865754237543426236432686585648654856'
  )
);
console.log(
  87597864865856387547425754278654897659n +
    8658865865865754237543426236432686585648654856n
);
