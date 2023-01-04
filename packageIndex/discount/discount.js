// packageIndex/discout/discount.js
import {
  init
} from './index.js';
import {
  getOpenId,
  getAction
} from '../../utils/index.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    select: 0,
    discountList: [],
    myDiscountList: []
  },
  handleSelect(event) {
    const {
      select
    } = event.target.dataset
    this.setData({
      select
    })
    if (select == 1) {
      getAction('/coupon/listUserCoupon', {
        openId: getOpenId()
      }).then(res => {
        this.setData({
          myDiscountList: res.data
        })
      })
    }
  },
  handleDelete(event) {
    const {
      index
    } = event.target.dataset;
    const card = this.data.myDiscountList
    card.splice(index, 1);
    this.setData({
      myDiscountList: card
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
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