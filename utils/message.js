export function showToast(data) {
  wx.showToast(data)
}
// 对话框
export function showModal(data) {

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