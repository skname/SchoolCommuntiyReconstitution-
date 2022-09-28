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

export function getStorage(key, isSync = false) {
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
export function getStorageSync(key) {
  let value;
  try {
    value = wx.getStorageSync(key);
    if (value) return JSON.parse(value)
  } catch (err) {
    console.log(err)
  }
}

export function removeStorage(key) {
  return new Promise((res, rej) => {
    wx.removeStorage({
      key,
      success: data => {
        res(data);
      },
      fail: err => {
        rej(err);
      }
    })
  })
}