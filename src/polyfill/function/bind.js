//bind ES3模拟实现
Function.prototype.bindES3 = function(context) {
  if (typeof this !== 'function') {
    throw new Error(
      'Function.prototype.bind - what is trying to be bound is not callable'
    );
  }
  var self = this;
  var args = Array.prototype.slice.call(arguments, 1);
  var FNOP = function() {};
  var FBound = function() {
    var bindArgs = Array.prototype.slice.call(arguments);
    return self.apply(
      this instanceof FNOP ? this : context,
      args.concat(bindArgs)
    );
  };
  FNOP.prototype = this.prototype;
  FBound.prototype = new FNOP();
  return FBound;
};

var value = 2;

var foo = {
  value: 1
};

function bar(name, age) {
  this.habit = 'shopping';
  console.log(this.value);
  console.log(name);
  console.log(age);
}

bar.prototype.friend = 'kevin';

var bindFoo = bar.bindES3(foo, 'daisy');

var obj = new bindFoo('18');

console.log(obj.habit);
console.log(obj.friend);

//bind ES6模拟实现
Function.prototype.bindES6 = function(context, ...arg) {
  if (typeof this !== 'function') {
    throw new Error(
      'Function.prototype.bind - what is trying to be bound is not callable'
    );
  }
  const self = this;
  const FNOP = function() {};
  const FBound = function(...restArg) {
    return self.apply(this instanceof FNOP ? this : context, [
      ...arg,
      ...restArg
    ]);
  };
  FNOP.prototype = this.prototype;
  FBound.prototype = new FNOP();
  return FBound;
};

var value = 2;

var foo = {
  value: 1
};

function bar(name, age) {
  this.habit = 'shopping';
  console.log(this.value);
  console.log(name);
  console.log(age);
}

bar.prototype.friend = 'kevin';

var bindFoo = bar.bindES6(foo, 'daisy');

var obj = new bindFoo('18');

console.log(obj.habit);
console.log(obj.friend);
