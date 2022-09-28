export function showToast(title, icon = 'success'){
  wx.showToast({
    title,
    icon,
    mask:true
  })
}