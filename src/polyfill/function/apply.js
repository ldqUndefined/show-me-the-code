//apply ES3实现
Function.prototype.applyES3 = function(context, arr) {
  var theContext = context == null ? window : Object(context);
  theContext._fn = this;
  var args = [];
  for (var i = 0; i < arr.length; i++) {
    args.push('arr[' + i + ']');
  }
  var result = eval('theContext._fn(' + args + ')');
  delete theContext._fn;
  return result;
};

var a = {
  name: 'aname',
  age: 18
};

function test(arg) {
  console.log(this, this.name, '--', this.age, '-', arg, '-', this.length);
}

test.applyES3(null, ['haha']);

//apply ES6实现

Function.prototype.applyES6 = function(context, arr) {
  const theContext = context == null ? window : Object(context);
  const _fn = Symbol('_fn');
  theContext[_fn] = this;
  const result = theContext[_fn](...arr);
  delete theContext[_fn];
  return result;
};

let b = {
  name: 'fdsafds',
  age: 5235235
};
function test1(arg) {
  console.log(this, '--', this.name, '--', this.age, '--', arg);
}
test1.applyES6(b, ['haha']);
