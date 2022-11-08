import {
  init
} from './index.js'
import {
  preview,
  showToast
} from '../../utils/index.js'
Page({ 
  data: {
    list: []
  },
  handePreview(event) {
    const {
      imgs
    } = event.currentTarget.dataset;
    if (!imgs || !imgs.length) {
      return showToast({
        title: '该同学未提交！',
        icon: 'error'
      })
    }
    preview(event)
  },
  onLoad(options) {
    init.call(this);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})