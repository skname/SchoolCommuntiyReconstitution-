export function throttle(delay, fn) {
  let time = null;
  return function () {
    if (time) {
      return false;
    }
    fn && fn.apply(this, arguments);
    time = setTimeout(() => {
      clearTimeout(time);
      time = null;
    }, delay * 1000);
    return true
  }
}

export function debounce(fn, delay) {
  let time = ''
  return function (...arge) {
    if (time) {
      clearInterval(time);
    }
    time = setTimeout(() => {
      fn.apply(this, arge);
      clearInterval(time);
      time = ''
    }, delay);
  }
}