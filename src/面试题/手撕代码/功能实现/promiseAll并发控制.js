//实现promiseAll并发控制
function promiseAllCtrl(arr, limit) {
  let result = [];
  let running = [];
  let index = 0;
  function run() {
    if (index >= arr.length) {
      return Promise.resolve();
    }
    let p = arr[index++]();
    running.push(p);
    result.push(p);
    p.then(() => {
      running.splice(running.indexOf(p), 1);
    });
    if (running.length >= limit) {
      return Promise.race(running).then(run);
    } else {
      return Promise.resolve().then(run);
    }
  }
  return run().then(() => Promise.all(result));
}

let wait = (time, order) =>
  new Promise(resolve =>
    setTimeout(() => {
      console.log(order);
      resolve(order);
    }, time)
  );
let pool = [
  () => wait(500, 1),
  () => wait(100, 2),
  () => wait(100, 3),
  () => wait(400, 4),
  () => wait(100, 5)
];
promiseAllCtrl(pool, 2)
  .then(value => {
    console.log('finish', value);
  })
  .catch(() => {
    console.log('error');
  });
