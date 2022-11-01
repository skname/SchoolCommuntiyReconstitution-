import {
  mergeObject
} from './handle.js'
let callback = [];
let isLock = false;

export function nextTickRender(data) {
  callback.push(data);
  if (!isLock) {
    isLock = true;
    fn.call(this);
  }
}

const fn = function () {
  Promise.resolve().then(() => {
    isLock = false;
    let renderData = {};
    let len = callback.length;
    if (len != 0) {
      for (let i = 0; i < len; i++) {
        let data = callback[i];
        renderData = mergeObject(renderData, data);
      }
    }
    callback = [];
    this.setData(renderData);
  })
}