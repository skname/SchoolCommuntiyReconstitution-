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
// 异步获取缓存
export function getStorage(key) {
  return new Promise((res, rej) => {
    wx.getStorage({
      key,
      success: data => {
        res(JSON.parse(data.data));
      },
      fail: err => {
        rej(err);
      }
    })
  })
}
//  同步获取缓存
export function getStorageSync(key) {
  let value;
  try {
    value = wx.getStorageSync(key);
    if (value) return JSON.parse(value)
  } catch (err) {
    return ''
  }
}
// 删除缓存
export function removeStorage(key) {
  wx.removeStorage({
    key
  }).then(value => {}, err => {});
}

// 清空所有缓存
export function removeAllStorage() {
  wx.clearStorage({
    success: (res) => {},
  })
}