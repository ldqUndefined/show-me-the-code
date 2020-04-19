//惰性函数的实现

//需求：实现一个foo函数，这个函数返回首次调用创建的Date对象，后续调用均返回这个Date对象。

//第一版
//缺点：1污染全局；2每次执行都要判断
let _t;
let foo_bad1 = () => {
  if (_t) {
    return _t;
  }
  _t = new Date();
  return _t;
};

//第二版
//利用立即执行函数，使用了闭包，但还是没有解决后需调用还会判断的缺点
let foo_bad2 = (() => {
  let _t;
  return () => {
    if (_t) {
      return _t;
    }
    _t = new Date();
    return _t;
  };
})();

//第三版
//使用函数对象，但是后需调用还是要判断
let foo_bad3 = () => {
  if (foo_bad3._t) {
    return foo_bad3._t;
  }
  foo_bad3._t = new Date();
  return foo_bad3._t;
};

//第四版
//使用闭包和重写函数，解决每次调用都进行判断的问题
let foo = () => {
  const _t = new Date();
  foo = () => {
    return _t;
  };
  return _t;
};

//经典应用
//兼容现代浏览器和IE浏览器的写法，但是每次调用addEvent时都要进行判断
function addEvent(type, el, fn) {
  if (window.addEventListener) {
    el.addEventListener(type, fn, false);
  } else if (window.attachEvent) {
    el.attachEvent('on' + type, fn);
  }
}

//使用惰性函数
function addEvent(type, el, fn) {
  if (window.addEventListener) {
    addEvent = function(type, el, fn) {
      window.addEventListener(type, el, fn);
    };
  } else if (window.attachEvent) {
    addEvent = function(type, el, fn) {
      window.attachEvent(type, el, fn);
    };
  }
  //第一次调用时也要绑定事件
  addEvent(type, el, fn);
}
