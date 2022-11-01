// 充值一个对象中的某些属性
import Config from '../config.js'
import {
  hideLoading,
  showModal
} from './message.js';
import {
  back,
  toWeb
} from './router.js';
import {
  Store
} from '../store/index.js'

export function handleReset(obj = {}, attr = [], init = '') {
  let len = attr.length;
  for (let i = 0; i < len; i++) {
    obj[attr[i]] = init
  }
}

// 从一个数组重过滤另一个数组
export function filterFromOther(arr = [], filters = []) {
  filters.forEach(item => {
    const index = arr.indexOf(item);
    if (index != -1) {
      arr.splice(index, 1);
    }
  })
  return arr;
}

// 数组是否拥有某个值
export function isContain(source = [], target) {
  return source.includes(target)
}

export function mergeObject(target, source) {
  Object.assign(target, source);
  return target;
}

export function handleFocus(event) {
  this.setData({
    focusId: event.currentTarget.id
  })
}

export function chooseImage({
  count = 1
}, callback) {
  wx.chooseMedia({
    count,
    mediaType: 'image',
    sizeType: ['compressed'],
    async success(res) {
      let tempFiles = res.tempFiles;
      const arr = [];
      let len = tempFiles.length;
      for (let i = 0; i < len; i++) {
        arr.push(tempFiles[i].tempFilePath);
      }
      callback(arr);
    },
    fail() {

    }
  })
}

export function upload(url, filePath, name, data) {
  return new Promise((res, rej) => {
    wx.uploadFile({
      filePath,
      name,
      url: Config.baseUrl + url,
      formData: data,
      timeout: 10000,
      success: data => {
        res(JSON.parse(data.data));
      },
      fail: err => {
        rej(err)
      }
    })
  })
}
// 改过
export function uploadMany(url, filesPaths = [], name, data = {}) {
  let len = filesPaths.length;
  for (let i = 0; i < len; i++) {
    let config = {
      isLast: len,
      index: i
    }
    let mergeData = mergeObject(data, config);
    upload(url, filesPaths[i], name, mergeData).then(res => {
      if (res.data != null && res.code == 200) {
        hideLoading()
        back();
      }
    })
  }
}
// 滚动动指定位置
export function pageScrollTo(to) {
  wx.pageScrollTo(to)
}

// 预览图片
export function preview(event) {
  const {
    current,
    imgs
  } = event.currentTarget.dataset;
  const sources = imgs.map(url => {
    return {
      url
    }
  })
  wx.previewMedia({
    sources: sources,
    current
  })
}
export function isAttention() {
  if (!Store.status.isMpStatus) {
    // 跳转到关注页面
    toWeb('https://mp.weixin.qq.com/s/yssiJMm2YTy-9fa4UB55Zw')
  }
}


export function openGuide(currStatus, title, fn) {
  const that = this;
  const isMpStatus = Store.status.isMpStatus;
  if (!currStatus) { // 如果要开启
    if (!isMpStatus) {
      showModal({
        title: '请先关注公众号哦！',
        success({
          confirm,
          cancel
        }) {
          if (confirm) {
            toWeb('https://mp.weixin.qq.com/s/yssiJMm2YTy-9fa4UB55Zw'); // 跳转
            fn()
          }
          if (cancel) {
            that.setData({
              isChecked: currStatus
            })
          }
        }
      })
      return
    }

    // 已关注 直接执行
    fn()
    return;
  }
  // 关闭
  showModal({
    title: title,
    success({
      cancel,
      confirm
    }) {
      if (confirm) {
        fn();
      }
      if (cancel) {
        that.setData({
          isChecked: currStatus
        })
      }
    }
  })
}

export function toAttention(title, isMpStatus) {
  !isMpStatus && showModal({
    title,
    confirmText: '去关注',
    success({
      confirm
    }) {
      if (confirm) {
        toWeb('https://mp.weixin.qq.com/s/yssiJMm2YTy-9fa4UB55Zw');
      }
    }
  })
}