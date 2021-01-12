//数字千分位加逗号，且有小数点。正则版本
function change(num) {
  let numStr = num.toString();
  let dotIndex = numStr.indexOf('.');
  if (dotIndex > -1) {
    let firstPart = numStr.slice(0, dotIndex);
    let secondPart = numStr.slice(dotIndex);
    return firstPart.replace(/(\d)(?=(\d{3})+$)/g, '$1,') + secondPart;
  } else {
    return numStr.replace(/(\d)(?=(\d{3})+$)/g, '$1,');
  }
}

console.log(change(432));
console.log(change(432.531543));
console.log(change(3214.21));
console.log(change(32124.312));
console.log(change(324414.4214));
console.log(change(3244154.65757));

//数字千分位加逗号，且有小数点。计算版本
function change(num) {
  let numStr = num.toString();
  let dotIndex = numStr.indexOf('.');
  let firstPart = numStr.slice(0, dotIndex);
  let secondPart = numStr.slice(dotIndex);
  let firstResult = '';
  for (let i = firstPart.length - 1, count = 1; i >= 0; i--, count++) {
    firstResult = firstPart.charAt(i) + firstResult;
    if (count % 3 === 0 && i !== 0) {
      firstResult = ',' + firstResult;
    }
  }
  return firstResult + secondPart;
}

console.log(change(432));
console.log(change(432.531543));
console.log(change(3214.21));
console.log(change(32124.312));
console.log(change(324414.4214));
console.log(change(3244154.65757));

//反向千分位12345678.01 =>123,456,78.01。正则版本
function change1(num) {
  let numStr = num.toString();
  let dotIndex = numStr.indexOf('.');
  if (dotIndex > -1) {
    let firstPart = numStr.slice(0, dotIndex);
    let secondPart = numStr.slice(dotIndex);
    return firstPart.replace(/(\d{3})(?=\d)/g, '$1,') + secondPart;
  } else {
    return numStr.replace(/(\d{3})(?=\d)/g, '$1,');
  }
}
console.log(change1(432));
console.log(change1(432.531543));
console.log(change1(3214.21));
console.log(change1(32124.312));
console.log(change1(324414.4214));
console.log(change1(3244154.65757));

//反向千分位12345678.01 =>123,456,78.01。计算版本
function change1(num) {
  let numStr = num.toString();
  let dotIndex = numStr.indexOf('.');
  let firstPart = numStr.slice(0, dotIndex);
  let secondPart = dotIndex === -1 ? '' : numStr.slice(dotIndex);
  let firstResult = '';
  for (let i = 0; i < firstPart.length; i++) {
    firstResult += firstPart.charAt(i);
    if ((i + 1) % 3 === 0 && i !== firstPart.length - 1) {
      firstResult += ',';
    }
  }
  return firstResult + secondPart;
}
console.log(change1(432));
console.log(change1(432.531543));
console.log(change1(3214.21));
console.log(change1(32124.312));
console.log(change1(324414.4214));
console.log(change1(3244154.65757));
