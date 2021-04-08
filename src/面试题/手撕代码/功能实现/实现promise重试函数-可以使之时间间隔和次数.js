Promise.retry = (promiseFn, time = 3) => {
  const tryFunc = () => {
    return promiseFn()
      .then(v => Promise.resolve(v))
      .catch(e => {
        if (--time === 0) {
          return Promise.reject(e);
        } else {
          return tryFunc();
        }
      });
  };
  return tryFunc();
};

Promise.retry = (promiseFn, time = 3) => {
  return new Promise(async (resolve, reject) => {
    while (time-- > 0) {
      try {
        let result = await promiseFn();
        resolve(result);
        break;
      } catch (e) {
        if (time === 0) {
          reject(e);
        }
      }
    }
  });
};

const test = () =>
  new Promise((resolve, reject) => {
    let temp = Math.random();
    setTimeout(() => {
      if (temp < 0.1) {
        console.log('成功');
        resolve(temp);
      } else {
        console.log('失败');
        reject('可怜哦');
      }
    }, 100);
  });

Promise.retry(test, 5)
  .then(v => console.log('成功咯', v))
  .catch(e => console.log('失败咯', e));
