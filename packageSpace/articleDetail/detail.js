import {
  showToast,
  getOpenId,
  routerAndParam,
  isDef,
  pageScrollTo,
  checkSymbol,
  nextTickRender
} from '../../utils/index.js';

import {
  initComment,
  isLoginAndBind,
  submitRequest
} from './index.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isShow: false,
    isFocus: false,
    commentContent: '',
    nickName: ''
  },
  sendCommont(event) { // 做节流
    this.hideChildComponent()
    // 检查是否绑定
    if (!isLoginAndBind(true, false)) {
      return
    }
    const {
      aid,
      replyopenid,
      comid,
      type,
      nickname
    } = event.currentTarget.dataset;
    const openId = getOpenId();
    let data;
    if (type == 1) {
      // 需要 aid,content, openId
      data = {
        openId,
        aid
      }
    } else if (type == 2) {
      data = {
        aid,
        openId,
        comId: comid,
        replyOpenid: replyopenid
      }
    }

    this.sendData = data;
    this.setData({
      isShow: true,
      nickName: nickname,
      isFocus: true
    })
  },
  submit() {
    const comment = this.data.commentContent
    if (!isDef(comment)) {
      return showToast({
        title: '评论内容为空!',
        icon: 'error'
      })
    }
    this.sendData.content = checkSymbol(comment)
    submitRequest.call(this, this.sendData)
  },
  hideChildComponent() {
    const compoennt = this.selectComponent('#component-card')
    compoennt.hideShow() // 隐藏转载
  },
  closeInput() {
    this.hideChildComponent()
    this.setData({
      isShow: false,
      isFocus: false
    })
  },
  handleFocus() {
    this.setData({
      isFocus: true
    })
  },
  handleInput(event) {
    this.setData({
      commentContent: event.detail.value
    })
  },
  handleRouter(event) {
    let url = '/packageInfo/myArticle/myArticle';
    const {
      openid: openId,
    } = event.currentTarget.dataset;
    routerAndParam(url, {
      openId
    })
  },
  /** 
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let {
      detail
    } = options;
    this.shareData = detail
    detail = JSON.parse(detail)
    if (isDef(detail.positionId)) {
      this.positionId = detail.positionId
      nextTickRender.call(this, {
        positionId: detail.positionId
      })
    }
    nextTickRender.call(this, {
      articleInfo: detail.articleInfo
    })
    initComment.call(this, detail.articleInfo.aid)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    // 定位到评论 
    if (!isDef(this.positionId)) return
    this.time = setTimeout(() => {
      pageScrollTo({
        selector: `#${this.positionId}`,
        duration: 300,
        offsetTop: -300
      })
      clearTimeout(this.time)
      this.time = null
    }, 500)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

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
    const param = this.shareData;
    return {
      path: `/packageSpace/articleDetail/detail?detail=${param}`
    }
  },
  onShareTimeline() {
    return {}
  }
})