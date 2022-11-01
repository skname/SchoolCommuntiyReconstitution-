export function showToast(data = {
  title: '成功',
  icon: 'success'
}) {
  wx.showToast(data)
}
// 对话框
export function showModal(data) {
  wx.showModal(data)
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