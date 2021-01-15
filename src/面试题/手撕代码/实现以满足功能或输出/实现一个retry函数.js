//实现一个retry函数
//如果fn返回成功,则打印一下,最终结果成功
//如果fn返回失败,则打印times下,最终结果失败
// retry(fn,times)
// retry(() => {
//   console.log('doing')
//   return Promise.reject(Error('done'))
// }, 3)

// retry(() => {
//   console.log('doing')
//   return Promise.resolve('done')
// }, 3)

function retry(fn, times) {
  return new Promise((resolve, reject) => {
    fn()
      .then(() => {
        console.log('success');
        resolve();
      })
      .catch(() => {
        for (let i = 0; i < times; i++) {
          console.log('failt');
          reject();
        }
      });
  });
}
retry(() => {
  console.log('doing');
  return Promise.reject(Error('done'));
}, 3);

retry(() => {
  console.log('doing');
  return Promise.resolve('done');
}, 3);
let frameTime = 0;
const channel = new MessageChannel();
const port1 = channel.port1;
const port2 = channel.port2;
const test = () => {
  console.log('test');
  frameTime = performance.now();
  port1.postMessage('port1 postmessage');
};
port2.onmessage = () => {
  console.log('port2 onmessage');
  if (performance.now() - frameTime < 5) {
    port1.postMessage('port1 postmessage');
  } else {
    requestAnimationFrame(test);
  }
};
test();
