//ES3实现
Function.prototype.callES3 = function(context) {
  var theContext = context == null ? window : Object(context);
  theContext._fn = this;
  var args = [];
  for (var i = 1; i < arguments.length; i++) {
    args.push('arguments[' + i + ']');
  }
  var result = eval('theContext._fn(' + args + ')');
  delete theContext._fn;
  return result;
};

var a = {
  name: 'haha',
  age: ' heihei'
};
function test() {
  console.log(this.name, '--', this.age, '--', this.length);
}

test.callES3(a);
test.callES3('fdsfdsa');

//--------------------------------------------------------------------------------------------------------

//ES6实现
Function.prototype.callES6 = function(context, ...args) {
  const theContext = context == null ? window : Object(context);
  const _fn = Symbol('_fn');
  theContext[_fn] = this;
  const result = theContext[_fn](...args);
  delete theContext[_fn];
  return result;
};

var a1 = {
  name: 'haha',
  age: ' heihei'
};
function test1() {
  console.log(this.name, '--', this.age, '--', this.length);
}

test1.callES6(a1);
test1.callES6('fdsfdsa');
