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

export function handleReset(obj = {}, attr = [], init = '') {
  let len = attr.length;
  for (let i = 0; i < len; i++) {
    obj[attr[i]] = init
  }
}

export function filterFromOther(arr = [], filters = []) {
  filters.forEach(item => {
    const index = arr.indexOf(item);
    if (index != -1) {
      arr.splice(index, 1);
    }
  })
  return arr;
}


export function setStorage(key, data, isSync = false) {
  data = JSON.stringify(data);
  if (isSync) {
    return wx.setStorageSync('key', data);
  }
  wx.setStorage({
    key,
    data
  })
}

export function showToast(data) {
  wx.showToast(data)
}


export function navigate(event) {
  wx.navigateTo({
    url: event.target.dataset.url
  })
}


export function transformTime(timestamp) {
  if (typeof timestamp != 'number') {
    return timestamp;
  }
  var time = new Date(timestamp);
  var M = time.getMonth() + 1; // getMonth方法从 Date 对象返回月份 (0 ~ 11)，返回结果需要手动加
  var d = time.getDate(); // getDate方法从 Date 对象返回一个月中的某一天 (1 ~ 31)
  var h = time.getHours(); // getHours方法返回 Date 对象的小时 (0 ~ 23)
  var m = time.getMinutes(); // getMinutes方法返回 Date 对象的分钟 (0 ~ 59)
  var s = time.getSeconds(); // getSeconds方法返回 Date 对象的秒数 (0 ~ 59)
  return M + '月' + d + '日 ' + h + ':' + m + ':' + s;
}

export function showLoading(data = {
  mask: true,
  title: '加载中...'
}) {
  wx.showLoading(data)
}

export function hideLoading() {
  wx.hideLoading();
}

export function getStorageSync(key) {
  let value;
  try {
    value = wx.getStorageSync(key);
    if (value) return JSON.parse(value)
  } catch (err) {
    console.log(err)
  }
}