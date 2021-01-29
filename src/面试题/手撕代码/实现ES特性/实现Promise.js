function Promise(executor) {
  this.status = 'pending';
  this.data = undefined;
  this.onResolveCallback = [];
  this.onRejectCallback = [];

  var self = this;

  function resolve(value) {
    //resolve异步
    setTimeout(() => {
      if (self.status === 'pending') {
        self.status = 'fulfilled';
        self.data = value;
        for (var i = 0; i < self.onResolveCallback.length; i++) {
          self.onResolveCallback[i](value);
        }
      }
    }, 0);
  }

  function reject(reason) {
    //reject异步
    setTimeout(() => {
      if (self.status === 'pending') {
        self.status = 'rejected';
        self.data = reason;
        for (var i = 0; i < self.onRejectCallback.length; i++) {
          self.onRejectCallback[i](reason);
        }
      }
    }, 0);
  }

  try {
    //executor错误处理
    executor(resolve, reject);
  } catch (reason) {
    reject(reason);
  }
}
Promise.prototype.then = function(onResolve, onReject) {
  //值穿透
  onResolve =
    typeof onResolve === 'function'
      ? onResolve
      : function(v) {
          return v;
        };
  onReject =
    typeof onReject === 'function'
      ? onReject
      : function(v) {
          return v;
        };
  if (this.status === 'pending') {
    //同步放入异步队列，等resolve或reject时被调用
    return new Promise((resolve, reject) => {
      this.onResolveCallback.push(function(value) {
        try {
          var result = onResolve(value);
          if (result instanceof Promise) {
            result.then(resolve, reject);
          } else {
            resolve(result);
          }
        } catch (reason) {
          reject(reason);
        }
      });
      this.onRejectCallback.push(function(value) {
        try {
          var result = onReject(value);
          if (result instanceof Promise) {
            result.then(resolve, reject);
          } else {
            resolve(result);
          }
        } catch (reason) {
          reject(reason);
        }
      });
    });
  }
  if (this.status === 'fulfilled') {
    //异步调用，否则对于已resolve或者已reject的会出现同步情况
    return new Promise((resolve, reject) => {
      var self = this;
      setTimeout(() => {
        try {
          var result = onResolve(self.data);
          if (result instanceof Promise) {
            result.then(resolve, reject);
          } else {
            resolve(result);
          }
        } catch (reason) {
          reject(reason);
        }
      }, 0);
    });
  }
  if (this.status === 'rejected') {
    //异步调用，否则对于已resolve或者已reject的会出现同步情况
    return new Promise((resolve, reject) => {
      let self = this;
      setTimeout(() => {
        try {
          var result = onReject(self.data);
          if (result instanceof Promise) {
            result.then(resolve, reject);
          } else {
            resolve(result);
          }
        } catch (reason) {
          reject(reason);
        }
      }, 0);
    });
  }
};
Promise.prototype.catch = function(onReject) {
  return this.then(null, onReject);
};

let a = new Promise(resolve => {
  console.log(1);
  resolve(2);
});
let b = a.then(v => {
  console.log(v);
  a.then(() => {
    console.log('insert');
  });
  console.log('after instert');
  return 3;
});
console.log(5);
let cc = b.then(v => {
  console.log(v);
});
