// {
//     a:{
//       b:{
//         c:{f:"aa"}
//       },
//       d:{
//         e:{g:"bb"},
//         h:{i:"cc"}
//       },
//       j:{
//         k:"dd"
//       }
//     }
// }
// [f,g,i,c,e,h,k,b,d,j,a]
function getPropertyName(obj) {
  let names = [];
  function travel(obj) {
    if (typeof obj !== 'object' || obj === null) {
      return;
    }
    for (let key of Object.keys(obj)) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        names.push(key);
        travel(obj[key]);
      }
    }
  }
  travel(obj);
  return names;
}
let temp = {
  a: {
    b: {
      c: { f: 'aa' }
    },
    d: {
      e: { g: 'bb' },
      h: { i: 'cc' }
    },
    j: {
      k: 'dd'
    }
  }
};
console.log(getPropertyName(temp));
