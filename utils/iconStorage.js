import {
  getStorageSync,
  setStorage
} from './storage.js'
import {
  ICONS
} from './icons.js'
import {
  isDef
} from './type.js';
let map = {}
const down = function (url) {
  return new Promise((res, rej) => {
    wx.downloadFile({
      url: url,
      success(data) {
        const fs = wx.getFileSystemManager();
        fs.saveFile({
          tempFilePath: data.tempFilePath,
          success(value) {
            res(value.savedFilePath)
          }
        })
      }
    })
  })
}

export const iconStorage = {
  async set(name, icons = []) {
    let iconsStorage = [],
      len = icons.length; 
    for (let i = 0; i < len; i++) {
      const temPath = await down(icons[i]);
      iconsStorage.push(temPath);
    }
    setStorage(name, iconsStorage)
  },
  get(name) {
    let icons = map[name] || (map[name] = getStorageSync(name));
    if (!isDef(icons)) {
      // 进行缓存
      iconStorage.set(name, ICONS[name]);
      icons = ICONS[name]
    }
    return icons;
  }
}