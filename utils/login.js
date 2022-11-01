import {
  getStudentInfo,
  getUserInfo
} from './type.js'

export function isLogin() {
  return getUserInfo()
}

export function isBindStudentNum() {
  return getStudentInfo()
}

export function validatorRouter(loginable, bindable) {
  let logined = isLogin();
  let binded = isBindStudentNum()
  if (!logined && loginable) {
    wx.switchTab({
      url: '/pages/info/info',
      success() {
        wx.showToast({
          title: '请先登录！',
          icon: 'success'
        })
      }
    })
    return false;
  }

  if (!binded && bindable) {
    wx.navigateTo({
      url: '/packageStudentBind/studentBind/studentBind',
      success() {
        wx.showToast({
          title: '请先绑定！',
          icon: 'success'
        })
      }
    })
    return false
  }
  return true
}