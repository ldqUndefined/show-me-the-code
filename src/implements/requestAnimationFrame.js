//用setTimeout模拟requestAnimationFrame
(function() {
  //上次调用时间戳
  let lastTime = 0;
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function(callback) {
      let currTime = new Date().getTime();
      let timeToCall = Math.max(0, 16 - (currTime - lastTime));
      let id = window.setTimeout(() => {
        callback(currTime + timeToCall);
      }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
  }
  if (!window.cancelAnimationFrame) {
    window.requestAnimationFrame = function(id) {
      clearTimeout(id);
    };
  }
})();
