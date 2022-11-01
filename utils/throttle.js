export function throttle(fn, delay) {
  let time = null;
  return function (...args) {
    if (time) {
      return false;
    }
    fn.apply(this, args);
    time = setTimeout(() => {
      clearTimeout(time);
      time = null;
    }, delay);
  }
}

export function debounce(fn, delay) {
  let time = ''
  return function (...args) {
    if (time) {
      clearInterval(time);
    }
    time = setTimeout(() => {
      fn.apply(this, args);
      clearInterval(time);
      time = ''
    }, delay);
  }
}