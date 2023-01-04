import {
  routerTo,
  throttle,
  isLogin,
  nextTickRender,
  isBindStudentNum,
  routerAndParam,
  getUserInfo,
  iconStorage,
  INFO_ICON
} from '../../utils/index.js'
import {
  login,
  emitLogin,
  listNoLogin,
  loginRender,
  bindRender,
  reflash
} from './index.js';

const throttleLogin = throttle(login, 1000);
const throtteEmitLogin = throttle(emitLogin, 1000);
Page({
  data: {
    isBind: false,
    isLogin: false,
    List: [],
    userInfo: {},
    icons: iconStorage.get(INFO_ICON),
    activityData: null
  },
  // 路由跳转
  handleRouter(event) {
    const {
      url
    } = event.currentTarget.dataset

    if (url == '/packageInfo/personInfo/personInfo' || "/packageStudentBind/studentBind/studentBind" == url) {
      this.isReflash = true
    }
    if (url == '/packageInfo/myArticle/myArticle') {
      const userInfos = getUserInfo()
      return routerAndParam(url, userInfos)
    }
    routerTo.call(this, event)
  },
  // 获取用户信息
  handleLogin() {
    throttleLogin.call(this);
  },
  emitLogin() {
    throtteEmitLogin.call(this);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.isReflash = false;
    let logined = isLogin();
    let binded = isBindStudentNum();
    if (logined) {
      loginRender.call(this, logined);
    } else {
      nextTickRender.call(this, {
        list: listNoLogin
      })
    }
    if (binded) {
      bindRender.call(this, binded)
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (this.data.isLogin && this.isReflash) {
      this.isReflash = false
      // 刷新缓存
      reflash.call(this)
    }
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})