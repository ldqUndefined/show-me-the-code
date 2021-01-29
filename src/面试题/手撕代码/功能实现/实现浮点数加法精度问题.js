const add = (a, b) => {
  let aDigit = (a.toString().split('.')[1] || '').length;
  let bDigit = (b.toString().split('.')[1] || '').length;
  let maxDigit = Math.pow(10, Math.max(aDigit, bDigit));
  return (a * maxDigit + b * maxDigit) / maxDigit;
};
console.log(add(0.1, 0.2));
