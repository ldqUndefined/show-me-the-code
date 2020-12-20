//函数防抖
//在函数被触发n秒后再执行回调，如果这n秒内又被处罚，则重新计时

//定时器版防抖
let debounce = (fn, delay) => {
  let timer;
  return function(...rest) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(this, rest);
      timer = null;
    }, delay);
  };
};
//可以立即执行版
let debounce1 = (fn, delay, immediate) => {
  let timer;
  return function(...rest) {
    if (immediate) {
      fn.apply(this, rest);
      immediate = false;
      timer = setTimeout(() => {
        timer = null;
      }, delay);
    } else {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        fn.apply(this, rest);
        timer = null;
      }, delay);
    }
  };
};
//立即执行有返回值
let debounce2 = (fn, delay, immediate) => {
  let timer;
  return function(...rest) {
    if (immediate) {
      const result = fn.apply(this, rest);
      immediate = false;
      timer = setTimeout(() => {
        timer = null;
      }, delay);
      return result;
    } else {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        fn.apply(this, rest);
        timer = null;
      }, delay);
    }
  };
};
//可取消版
let debounce3 = (fn, delay, immediate) => {
  let timer;
  function debounced(...rest) {
    if (immediate) {
      const result = fn.apply(this, rest);
      immediate = false;
      timer = setTimeout(() => {
        timer = null;
      }, delay);
      return result;
    } else {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        fn.apply(this, rest);
        timer = null;
      }, delay);
    }
  }
  debounced.cancel = function() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  };
  return debounced;
};
//测试用例
window.addEventListener(
  'mouseover',
  debounce2(
    e => {
      console.log(e);
      return 111;
    },
    1000,
    true
  )
);

//函数防抖应用场景：连续的事件，只需触发一次回调的场景
// 1、搜索框搜索输入，等用户输入停顿之后再发送请求。
// 2、手机号、邮箱验证输入检测，等输入停顿一段时间后再校验。
// 3、窗口大小resize，只需窗口调整完成后，再计算窗口大小，防止重复渲染。

//--------------------------------------------------------------------------------

//函数节流
//每个n秒只执行一次函数，在这个时间间隔内触发多次都不执行
let throttle = (fn, delay) => {
  let timer;
  return function(...rest) {
    if (timer) {
      return;
    }
    fn.apply(this, rest);
    timer = setTimeout(() => {
      timer = null;
    }, delay);
  };
};
//时间戳版节流
let throttle_timestamp = (fn, delay) => {
  let prev = 0;
  return function(...rest) {
    let now = Date.now();
    if (now - prev >= delay) {
      fn.apply(this, rest);
      prev = now;
    }
  };
};

window.addEventListener(
  'mouseover',
  throttle_timestamp(e => {
    console.log(e);
  }, 1000)
);

//函数节流应用场景：间隔一段时间实行一次回调的场景
// 1、滚动加载，加载更多或者滚到底部监听。
// 2、表单比较，防止表单重复提交。
