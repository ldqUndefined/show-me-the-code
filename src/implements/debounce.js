//防抖实现
const debounce = (fun, wait, immediate) => {
  let timeout, result;
  const debounced = function(...args) {
    if (timeout) {
      clearTimeout(timeout);
    }
    if (immediate) {
      const callNow = !timeout;
      timeout = setTimeout(() => {
        timeout = null;
      }, wait);
      if (callNow) {
        result = fun.call(this, ...args);
      }
    } else {
      timeout = setTimeout(() => {
        fun.call(this, ...args);
      }, wait);
    }
    return result;
  };
  debounced.cancel = () => {
    clearTimeout(timeout);
    timeout = null;
  };
  return debounced;
};
const theFunc = debounce(
  function() {
    console.log('move!');
  },
  5000,
  true
);
document.onmousemove = theFunc;
const button = document.createElement('div');
button.style.height = '100px';
button.style.width = '100px';
button.style.position = 'fixed';
button.style.right = '0';
button.style.bottom = '0';
button.style.backgroundColor = '#000';
document.body.appendChild(button);
button.onclick = theFunc.cancel;
