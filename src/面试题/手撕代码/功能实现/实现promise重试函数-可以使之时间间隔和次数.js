function tryPromise(fn, interval, times) {
  let timeOut = ms => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject('timeout');
      }, ms);
    });
  };
  let p = fn();
  const tryP = () => {
    return Promise.race([p, timeOut(interval)])
      .then(v => v)
      .catch(reason => {
        if (times === 0) {
          throw new Error(reason);
        } else {
          console.log('重试一次');
          times--;
          return tryP();
        }
      });
  };
  return tryP();
}

let timeOutSuccess = ms => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('success');
      resolve('666');
    }, ms);
  });
};

tryPromise(() => timeOutSuccess(6000), 999, 5)
  .then(v => {
    console.log('成功啦', v);
  })
  .catch(v => {
    console.log('失败咯');
  });
