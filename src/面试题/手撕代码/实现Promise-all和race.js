//promise.all
function PromiseAll(promiseArr) {
  let result = [];
  let finishCount = 0;
  return new Promise((resolve, reject) => {
    promiseArr.forEach((item, index) => {
      Promise.resolve(item)
        .then(value => {
          result[index] = value;
          finishCount++;
          if (finishCount === promiseArr.length) {
            resolve(result);
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  });
}
let a = Promise.resolve(1);
let b = Promise.resolve(2);
let c = Promise.resolve(3);
let d = Promise.reject('err');
PromiseAll([a, b, c, d])
  .then(value => {
    console.log(value);
  })
  .catch(err => {
    console.log(err);
  });
//promise.race
function PromiseRace(promiseArr) {
  return new Promise((resolve, reject) => {
    promiseArr.forEach(item => {
      Promise.resolve(item).then(
        value => resolve(value),
        err => reject(err)
      );
    });
  });
}

let a = Promise.resolve(1);
let b = Promise.resolve(2);
let c = Promise.resolve(3);
let d = Promise.reject('err');
PromiseRace([d, b, c, a])
  .then(value => {
    console.log('insuccess');
    console.log(value);
  })
  .catch(err => {
    console.log('inerror');
    console.log(err);
  });
