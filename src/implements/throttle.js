//时间戳实现节流
const throttle = function(func, wait) {
  let lastTime = 0;
  return (...args) => {
    let now = Date.now();
    if (now - lastTime > wait) {
      func.call(this, ...args);
      lastTime = now;
    }
  };
};

document.onmousemove = throttle(() => {
  console.log('move');
}, 1000);

//定时器实现节流
const throttle_settimeout = function(func, wait) {
  let timeout = null;
  return (...args) => {
    if (!timeout) {
      func.call(this, ...args);
      timeout = setTimeout(() => {
        timeout = null;
      }, wait);
    }
  };
};
document.onmousemove = throttle_settimeout(() => {
  console.log('move');
}, 1000);

//有头有尾型。指定时间内触发了，在最后会再触发一次

const throttle_hasTail = function(func, wait) {
  let lastTime = 0,
    timeout = null;

  const throttled = (...args) => {
    let now = Date.now();
    let remaining = wait - (now - lastTime);
    if (remaining <= 0 || remaining > wait) {
      //remaining<=0是和上一次触发已经过了一个wait时间了
      //remaing>wait是now-lastTime<0，也就是系统时间被往前改了，这个时候也可以重新触发
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      lastTime = now;
      // console.log('immediate');
      func.call(this, ...args);
    } else if (!timeout) {
      timeout = setTimeout(() => {
        // console.log('remaing');
        lastTime = Date.now();
        timeout = null;
        func.call(this, ...args);
      }, remaining);
    }
  };
  return throttled;
};

document.onmousemove = throttle_hasTail(() => {
  console.log('move');
  console.log(new Date().getMilliseconds());
}, 1000);

//leading:false表示禁用第一次执行
//trailing:false表示禁用停止触发的回调
//leading和trailing不能同时设为false
const throttle_option = function(func, wait, options) {
  let timeout = null,
    lastTime = 0;
  if (!options) {
    options = {};
  }
  const throttled = (...args) => {
    let now = Date.now();
    if (!lastTime && options.leading === false) {
      lastTime = now;
    }
    let remaining = wait - (now - lastTime);
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      lastTime = now;
      func.call(this, ...args);
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(() => {
        lastTime = options.leading === false ? 0 : Date.now();
        timeout = null;
        func.call(this, ...args);
      }, remaining);
    }
  };
  throttled.cancel = () => {
    clearTimeout(timeout);
    timeout = null;
    lastTime = 0;
  };
  return throttled;
};
const test = throttle_option(() => {
  console.log('move');
  console.log(new Date().getMilliseconds());
}, 5000);
document.onmousemove = test;

let button = document.createElement('div');
button.onclick = test.cancel;
button.style.position = 'fixed';
button.style.right = '0';
button.style.bottom = '20px';
button.style.backgroundColor = '#000';
button.style.height = '50px';
button.style.width = '50px';
document.body.appendChild(button);
