export default {
  show(title){
      wx.showLoading({
          title,
          mask:true
      })
  },
  hide(){
      wx.hideLoading(); 
  }
} 