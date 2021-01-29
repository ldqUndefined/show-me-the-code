//call模拟实现

Function.prototype.call = function(context, ...args) {
  context = context != null ? Object(context) : window;
  let fn = Symbol();
  context[fn] = this;
  let result = context[fn](...args);
  delete context[fn];
  return result;
};

var length = 1;
var a = {
  length: 2222
};
function test(str) {
  console.log(this.length, str);
}
test.call('fdsafds', 'haha');
test.call(a, 'haha');
test.call(null, 'haha');

//apply模拟实现
Function.prototype.apply = function(context, args) {
  context = context != null ? Object(context) : window;
  let fn = Symbol();
  context[fn] = this;
  let result = context[fn](...args);
  delete context[fn];
  return result;
};

var length = 1;
var a = {
  length: 2222
};
function test(str) {
  console.log(this.length, str);
}
test.apply('fdsafds', ['haha']);
test.apply(a, ['haha']);
test.apply(null, ['haha']);

//bind模拟实现
Function.prototype.bind = function(context, ...args) {
  let self = this;
  let fn = Symbol();
  context = context != null ? Object(context) : window;
  function fBound(...restArgs) {
    if (this instanceof fBound) {
      let instance = Object.create(fBound.prototype);
      instance[fn] = self;
      let result = instance[fn](...args, ...restArgs);
      delete instance[fn];
      return result ? result : instance;
    } else {
      context[fn] = self;
      let result = context[fn](...args, ...restArgs);
      delete context[fn];
      return result;
    }
  }
  fBound.prototype = Object.create(this.prototype);
  return fBound;
};

let obj = {
  a: 12
};
let obj2 = {
  a: 12
};
function Person(age, name) {
  this.age = age;
  this.name = name;
}
let bindPerson = Person.bind(obj, 18);
let bindPerson2 = Person.bind(obj2, 18);
bindPerson('xiaoming');
let result = new bindPerson2('xiaoming');
console.log(obj);
console.log(result, obj2);
