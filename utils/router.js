import {
  validatorRouter
} from './login.js'

// 验证跳转
export function routerValidatorTo(event) {
  let {
    url,
    loginable = true,
    bindable = true,
  } = event.currentTarget.dataset
  if (loginable || bindable) {
    let isRouter = validatorRouter(loginable, bindable)
    if (!isRouter) return
  }

  wx.navigateTo({
    url
  })
}

export function routerTo(event) {
  let {
    url
  } = event.currentTarget.dataset;
  wx.navigateTo({
    url
  })
}
export function routerAndParam(url, data) {
  let param = JSON.stringify(data);
  const Reg = /[?]/g;
  if (param.includes('?')) {
    param = param.replace(Reg, '？');
  }
  wx.navigateTo({
    url: url + `?detail=${param}`
  })
}

// 跳转到其他 Tab 页面
export function switchTab(data) {
  wx.switchTab(data)
}

// 返回上一级
export function back(data = {
  delta: 1
}) {
  wx.navigateBack(data);
} 
// 跳转其他App
export function ToApp(appId, path, fn = () => {}) {
  wx.navigateToMiniProgram({
    appId,
    path: path,
    success: (data) => {
      fn(data)
    },
    fail: () => {

    }
  })
}

export function toWeb(src){
  wx.navigateTo({
    url: `/packageIndex/webView/web?src=${src}`,
  })
}