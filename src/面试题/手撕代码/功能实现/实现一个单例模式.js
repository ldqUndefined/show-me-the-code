//静态属性实现
function SinglePerson(name) {
  if (!SinglePerson.instance) {
    this.name = name;
    SinglePerson.instance = this;
  }
  return SinglePerson.instance;
}
let a = new SinglePerson('fdas');
let b = new SinglePerson(21);
console.log(a === b);

//闭包实现
const SinglePerson = (function() {
  let instance = null;
  return function(name) {
    if (!instance) {
      this.name = name;
      instance = this;
    }
    return instance;
  };
})();

let a = new SinglePerson('fdsa');
let b = new SinglePerson('fdsaf');
console.log(a === b);

//进阶版，类和单例功能分离
function Person(name) {
  this.name = name;
}

function SingleTon(fn) {
  let instance = null;
  return function(...args) {
    if (instance) {
      return instance;
    } else {
      let temp = fn.apply(this, args);
      if (typeof temp === 'object' && temp !== null) {
        instance = temp;
      } else {
        instance = this;
      }
      return instance;
    }
  };
}

let SinglePerson = SingleTon(Person);
let a = new SinglePerson('xiaoming');
let b = new SinglePerson('xiaoming');
console.log(a === b);
