//实现Promise

function Promise(executor) {
  this.status = 'pending';
  this.data = undefined;
  this.onResolveCallback = [];
  this.onRejectCallback = [];
  var self = this;
  function resolve(value) {
    setTimeout(function() {
      if (self.status === 'pending') {
        self.status = 'fulfilled';
        self.data = value;
        for (let i = 0; i < self.onRejectCallback.length; i++) {
          self.onRejectCallback[i](value);
        }
      }
    }, 0);
  }
  function reject(reason) {
    setTimeout(() => {
      if (self.status === 'pending') {
        self.status = 'rejected';
        self.data = reason;
        for (let i = 0; i < self.onRejectCallback.length; i++) {
          self.onRejectCallback[i](reason);
        }
      }
    }, 0);
  }
  try {
    executor(resolve, reject);
  } catch (reason) {
    reject(reason);
  }
}
Promise.prototype.then = function(onResolve, onReject) {
  var self = this;
  onResolve =
    typeof onResolve === 'function'
      ? onResolve
      : function(v) {
          return v;
        };
  onReject =
    typeof onReject === 'function'
      ? onReject
      : function(e) {
          return e;
        };
  if (self.status === 'pending') {
    return new Promise((resolve, reject) => {
      self.onResolveCallback.push(function(value) {
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
      self.onRejectCallback(function(value) {
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
  if (self.status === 'fulfilled') {
    return new Promise((resolve, reject) => {
      try {
        var result = onResolve(self.data);
        if (result instanceof Promise) {
          result.then(resolve, reject);
        } else {
          resolve();
        }
      } catch (reason) {
        reject(reason);
      }
    });
  }
  if (self.status === 'rejected') {
    return new Promise((resolve, reject) => {
      try {
        var result = onReject(self.data);
        if (result instanceof Promise) {
          result.then(resolve, reject);
        } else {
          resolve();
        }
      } catch (reason) {
        reject(reason);
      }
    });
  }
};
Promise.prototype.catch = function(onReject) {
  return this.then(null, onReject);
};

let a = new Promise((resolve, reject) => {
  console.log('1');
  resolve(2);
}).then(v => {
  console.log(v);
});

console.log(3);
