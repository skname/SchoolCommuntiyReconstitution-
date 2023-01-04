import {
  nextTickRender,
  routerValidatorTo,
  iconStorage,
  SPACE_ICON,
  isContain,
  getOpenId
} from '../../utils/index.js'
import {
  Store
} from '../../store/index.js'
import {
  navigationList,
  initProxy,
  getTopList,
  handleSearchThrottle
} from './index.js';
const newNav = [...navigationList]
newNav.pop()
Page({
  data: {
    isHasMessage: false,
    navigationList: newNav,
    cardList: [],
    search: {
      cid: 0,
      searchContent: ''
    },
    topArticle: null,
    icons: iconStorage.get(SPACE_ICON)
  },
  handleRouter(event) {
    routerValidatorTo.call(this, event);
  },
  switchPage(event) {
    let index = event.detail;
    this.data.search.cid = index;
    this.clear = true
    this.initPage()
    this.init()
  },
  handleChange(event) {
    this.setData({
      ['search.searchContent']: event.detail.value
    })
    // 删除搜索时自动刷新
    if (event.detail.value == '') {
      this.clear = true
      this.initPage()
      this.init()
    }
  },
  handleSearch() {
    handleSearchThrottle.call(this)
  },
  onLoad: function () {
    // 获取 topList 
    getTopList('all', ({
      isHasMessage,
      topArticle
    }) => {
      if (topArticle) {
        topArticle.cid = 9
        topArticle.isLiked = isContain(topArticle.isLikedList, getOpenId())
      }
      nextTickRender.call(this, {
        isHasMessage: isHasMessage,
        topArticle: topArticle || null
      })
      Store.commit('SET_MESSAGE', isHasMessage);
    })
    initProxy.call(this)
  },
  onReady: function () {},
  onShow: function () {
    if (Store.status.isPublicNewArticle) { // 如果发表新文章
      this.clear = true;
      this.initPage();
      this.init()
      Store.commit('SET_PUBLIC', false)
    }
    getTopList('isMessage', ({
      isHasMessage
    }) => {
      Store.commit('SET_MESSAGE', isHasMessage);
      nextTickRender.call(this, {
        isHasMessage: Store.status.isHasMessage
      })
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.initPage()
    this.init()
    wx.stopPullDownRefresh() // 回弹
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
  onShareAppMessage: function () {
    return {

    }
  },
  // 分享到朋友圈
  onShareTimeline() {
    return {

    }
  }
})