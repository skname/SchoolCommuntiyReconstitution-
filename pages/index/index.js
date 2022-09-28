import {
  req
} from '../../utils/Req'
import {
  ToApp
} from '../../utils/toOtherApp';
import {
  imgStorage,
  getImgs
} from '../../utils/imgStorage';
import {
  isLogin
} from '../../utils/Status/index';
Page({
  data: {
    isopen: true,
    reply: '',
    imageBox: '',
    icons: [
      'https://skself.work/static/icon/messageBorad.png',
      'https://skself.work/static/icon/find1.png',
      'https://skself.work/static/icon/print.png',
      'https://skself.work/static/icon/message.png',
    ],
    menus: [{
        id: 0,
        name: '暗恋 吧',
        url: '/packageIndex/messageBoard/index'
      },
      {
        id: 1,
        name: '捞微信',
        url: '/packageIndex/GetWechat/index'
      },
      {
        id: 2,
        name: '体测计算器',
        url: '/packageIndex/Calculator/calculator'
      }
    ]
  },
  toweb(e) {
    let {
      src
    } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/package/webView/web?src=${src}`,
    })
  },

  toPrint() {
    ToApp('wx7613a90097b68222');
  },
  async onLoad() {
    getImgs.call(this, 'iconIndex');
    if (!await isLogin()) {
      const imageBox = await req('/getBanner', 'get')
      this.setData({
        imageBox,
        reply: 0
      })
      wx.setStorageSync('reply', 0);
      return;
    }
    let openidd = wx.getStorageSync('openid');
    Promise.all([req(`/getReply?openid=${openidd}&&num=1`, 'get'), req('/getBanner', 'get')]).then(res => {
      const replyNum = Number(res[0]);
      this.setData({
        imageBox: res[1],
        reply: replyNum
      })
      wx.setStorageSync('reply', replyNum);
    })
  },
  async onReady() {
    imgStorage(this.data.icons, 'iconIndex');
  },
  onShow() {
    let reply = wx.getStorageSync('reply');
    this.setData({
      reply
    })
  },
  onShareAppMessage: function () {
    return {

    }
  },
  onShareTimeline() {
    return {

    }
  }
})