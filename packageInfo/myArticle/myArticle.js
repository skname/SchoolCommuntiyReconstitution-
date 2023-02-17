import {
  getPersonInfoAndRender,
  initProxy
} from './index.js'
import {
  preview,
  iconStorage,
  MY_ARTICLE_ICON,
  getOpenId,
  routerAndParam,
  isLogin
} from '../../utils/index.js'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    cardList: [],
    search: {},
    icons: iconStorage.get(MY_ARTICLE_ICON),
    isMine: false
  },
  preview,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const {
      detail
    } = options;
    const result = JSON.parse(detail);
    this.openId = result.openId;
    getPersonInfoAndRender.call(this, result.openId == getOpenId());
    initProxy.call(this);
  },
  handleChat() {
    if (!isLogin()) {
      return wx.switchTab({
        url: '/pages/info/info',
        success() {
          wx.showToast({
            title: '请先登录！',
            icon: 'success'
          })
        }
      })
    }
    routerAndParam("/packageInfo/chatPage/chat", {
      userInfo: {
        targetOpenId: this.openId,
        headPic: this.data.userInfo.headPic
      }
    })

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
    this.initPage()
    this.clear = true
    this.init()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    this.handleScrollBottom()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})