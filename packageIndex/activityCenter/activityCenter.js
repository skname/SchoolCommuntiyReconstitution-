import {
  getAction,
  getOpenId,
  showToast,
  handleClipboardData,
  routerTo,
  isLogin,
  getUserInfo,
  validatorRouter
} from "../../utils/index.js";

import {
  init
} from './index.js'
// packageIndex/activityCenter/activityCenter.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    prizeList: [{
        id: 1,
        name: '回家车票',
        icon: 'https://img.skself.work/icon/%E6%9C%BA%E7%A5%A8.png'
      },
      {
        id: 2,
        name: '现金100元',
        icon: 'https://img.skself.work/icon/%E7%BA%A2%E5%8C%85.png'
      },
      {
        id: 3,
        name: '现金50元',
        icon: 'https://img.skself.work/icon/%E7%BA%A2%E5%8C%85.png'
      },
      {
        id: 8,
        name: '现金0.1元',
        icon: 'https://img.skself.work/icon/%E7%BA%A2%E5%8C%85.png'
      },

      {
        id: 99,
        name: '抽奖',
        icon: 'https://img.skself.work/icon/%E7%BA%A2%E5%8C%85.png'
      },
      {
        id: 4,
        name: '现金10元',
        icon: 'https://img.skself.work/icon/%E7%BA%A2%E5%8C%85.png'
      },
      {
        id: 7,
        name: '现金0.2元',
        icon: 'https://img.skself.work/icon/%E7%BA%A2%E5%8C%85.png'
      },
      {
        id: 6,
        name: '现金0.5元',
        icon: 'https://img.skself.work/icon/%E7%BA%A2%E5%8C%85.png'
      },
      {
        id: 5,
        name: '现金1元',
        icon: 'https://img.skself.work/icon/%E7%BA%A2%E5%8C%85.png'
      }
    ],
    select: 1,
    isShow: false,
    num: 0,
    activeNum: 0,
    prizeData: '',
    helpData: null
  },
  handleRouter(event) {
    const {
      url
    } = event.target.dataset;
    if (url == '/packageIndex/activityCenter/myPrize' && !validatorRouter(true, true)) {
      return;
    }
    routerTo(event)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  handleStart() {
    if (!validatorRouter(true, false)) {
      return;
    }

    if (this.data.num <= 0) {
      return showToast({
        icon: 'none',
        title: '请邀请好友助力获取抽奖次数！'
      });
    }
    if (this.isStart) {
      return showToast({
        icon: 'none',
        title: '正在抽奖中！'
      })
    }
    this.isStart = true; // 开始过程不能继续进入
    // 初始化
    let select = 0, // 初始值
      speed = 70, // 速度
      that = this; // 目标
    let response = null,
      err = null;
    // 发起请求觉得结果
    getAction('/prize/get', {
      openId: getOpenId()
    }).then(res => {
      response = res.data;
    }, err => {
      err = true;
    })
    const start = () => {
      if (response && that.getTurns(select) >= 6 && select % 9 == response.target) {
        // 弹窗抽奖结果
        this.setData({
          isShow: true,
          prizeData: response,
          num: this.data.num - 1
        })
        this.isStart = false
        return
      }
      if (err) {
        err = null;
        return;
      }
      // 减速
      if (that.getTurns(select) >= 4) {
        speed = 100;
      }
      select++;
      const Time = setTimeout(() => {
        that.setData({
          select: select % 9
        })
        start() // 重新开始
        clearTimeout(Time);
      }, speed);
    }
    start()
  },
  closeMask() {
    this.setData({
      isShow: false
    })
  },
  handleStatic() {

  },
  getTurns(number) {
    return Math.floor(number / 9);
  },
  clipboardData() {
    const {
      prizeCode
    } = this.data.prizeData;
    prizeCode && handleClipboardData(prizeCode, () => {
      this.closeMask()
    });
  },
  onLoad(options) {
    this.isStart = false;
    isLogin() && init.call(this);
    const {
      activityOpenId,
      headPic
    } = options
    // 从转发队列进入
    if (activityOpenId) {
      this.setData({
        helpData: {
          headPic: headPic,
          activityOpenId
        }
      })
      const activityComponent = this.selectComponent('#component-help')
      activityComponent.setData({
        isShow: true
      })
    }
    // 活动 end
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
    if (!validatorRouter(true, false)) return;
    const openId = getOpenId(),
      headPic = getUserInfo().headPic
    return {
      path: `/packageIndex/activityCenter/activityCenter?activityOpenId=${openId}&headPic=${headPic}`
    }
  }
})