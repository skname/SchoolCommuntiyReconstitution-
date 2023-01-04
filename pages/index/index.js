import {
  routerValidatorTo,
  ToApp,
  isDef,
  getAction,
  toWeb
} from '../../utils/index.js';
Page({
  data: {
    posterConfig: {
      width: 400,
      height: 300,
      showSavePopup: true,
      backgroundColor: 'red',
      blocks: [{
        x: 0,
        y: 0,
      }]
    },
    bannerBox: [],
    menus: [{
        id: 0,
        name: '成绩查询',
        url: '/packageIndex/getScore/score',
        icon: 'https://img.skself.work/icon/index/xQUZEF.png'
      },
      {
        id: 1,
        name: '课表查询',
        url: '/packageIndex/getClass/table',
        icon: 'https://img.skself.work/icon/index/x0oCWj.png'
      }, {
        id: 2,
        name: '男神女神墙',
        icon: 'https://img.skself.work/icon/logo/logoman.jpg',
        loginable: false,
        bindable: false,
        url: '/packageIndex/manAndGirl/manAndGirl'
      },
      {
        id: 3,
        name: '体测计算器',
        url: '/packageCalculator/Calculator/calculator',
        icon: 'https://img.skself.work/icon/index/x0oFln.png',
        loginable: false,
        bindable: false
      }, {
        id: 4,
        name: '优惠券',
        icon: 'https://img.skself.work/icon/index/discount.png',
        url: '/packageIndex/discount/discount',
        loginable: true,
        bindable: false
      },
      {
        id: 5,
        name: '活动中心',
        icon: 'https://img.skself.work/icon/index/%E6%B4%BB%E5%8A%A8.png',
        loginable: false,
        bindable: false,
        url: '/packageIndex/activityCenter/activityCenter'
      },

    ],
    otherMenus: [{
        id: 9,
        name: '太大图书馆',
        icon: 'https://img.skself.work/icon/index/%E5%9B%BE%E4%B9%A6%E9%A6%86.png',
        appId: 'wx727308baa9bdc50a',
        url: 'pages/index/index'
      }, {
        id: 10,
        name: '四六级查询',
        url: 'packageResultQuery/pages/cet_his/CET_Result_His_Portal',
        appId: 'wxa56afc785454c86b',
        icon: 'https://img.skself.work/icon/index/x36Tqe.png'
      },
      {
        id: 11,
        name: '教资查询',
        url: 'jiaoyubu/pages/business/ntceScore/fillInfo/fillInfo',
        appId: 'wx2eec5fb00157a603',
        icon: 'https://img.skself.work/icon/index/xWc3DA.png'
      }
    ]
  },
  routerTo: routerValidatorTo,
  toweb(e) {
    let {
      src
    } = e.currentTarget.dataset;
    if (!isDef(src)) return;
    toWeb(src)
  },
  toApp(event) {
    const {
      appid,
      url
    } = event.currentTarget.dataset
    ToApp(appid, url);
  },
  onPosterSuccess(e) {

  },
  onLoad() {
    getAction('/banner/list').then(({
      data
    }) => {
      this.setData({
        bannerBox: data
      })
    })
  },
  handleLoad() {},
  onShareAppMessage: function () {
    return {}
  },
  onShareTimeline() {
    return {}
  }
})