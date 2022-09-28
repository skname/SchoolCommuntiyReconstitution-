// 跳转到其他 Tab 页面
export function switchTab(data) {
  wx.switchTab(data)
}

//跳转到非 tab 页面
export function navigate(data, isToken) {
  // 验证token
  if (isToken) {
    // 阻止跳转
  }
  wx.navigateTo(data)
}

// 返回上一级
export function back(data = {
  delta: 1
}) {
  wx.navigateBack(data);
}
// 跳转其他App
export function ToApp(appId, fn) {
  wx.navigateToMiniProgram({
    appId,
    success: (data) => {
      fn(data)
    },
    fail: () => {

    }
  })
}