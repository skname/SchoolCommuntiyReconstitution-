import {
  getUserInfo,
  getWs
} from "../../utils/index.js";

// packageInfo/chatPage/chat.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: false,
    bottom: 0,
    content: "",
    targetPic: "",
    myPic: "",
    charList: [{
      id: 0,
      content: "你好呀！(打招呼！)",
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  sendMessage() {
    const that = this;
    this.setData({
      isShow: true
    })
    wx.onKeyboardHeightChange(res => {
      that.setData({
        bottom: res.height,
      })
    })
  },
  // 关闭按钮
  closeInput() {
    this.setData({
      isShow: false
    })
  },
  // 发送消息
  submit() {
    const content = this.data.content;
    // 发送到服务器
    getWs().sendMessage(content)
    const charlist = this.data.charList
    charlist.push({
      id: 1,
      content,
    })
    this.setData({
      charList: charlist,
      isShow: false,
      content: ""
    })
  },
  handleInput(event) {
    this.setData({
      content: event.detail.value
    })
  },
  onLoad(options) {
    const ws = getWs();
    // 处理接受到新消息的事件
    const handleNewMessage = function (content) {
      const charlist = this.data.charList
      charlist.push({
        id: 0,
        content,
      })
      this.setData({
        charList: charlist,
      })
    }

    const props = JSON.parse(options.detail)
    ws.onMessage(handleNewMessage.bind(this))
    ws.setTarget(props.userInfo.targetOpenId)
    this.setData({
      targetPic: props.userInfo.headPic,
      myPic: getUserInfo().headPic
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