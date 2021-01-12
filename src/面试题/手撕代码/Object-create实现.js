//Object.create实现
function ObjectCreate(proto) {
  function F() {}
  F.prototype = proto;
  return new F();
}
