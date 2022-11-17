import {
  routerValidatorTo,
  ToApp,
  isDef,
  iconStorage,
  INDEX_ICON,
  getAction,
  toWeb,
} from '../../utils/index.js';
Page({
  data: {
    bannerBox: [],
    icons: iconStorage.get(INDEX_ICON),
    menus: [{
        id: 0,
        name: '成绩查询',
        url: '/packageIndex/getScore/score',
      },
      {
        id: 1,
        name: '课表查询',
        url: '/packageIndex/getClass/table',
      },
      {
        id: 2,
        name: '青年大学习',
        url: '/packageIndex/youthLearning/learn'
      },
      {
        id: 3,
        name: '体测计算器',
        url: '/packageCalculator/Calculator/calculator',
        loginable: false,
        bindable: false
      }
    ],
    otherMenus: [
      // {
      //   id: 5,
      //   name: '远程打印',
      //   url: '/packageIndex/print/print',
      //   loginable: false,
      //   appId: ''
      // },
      {
        id: 6,
        name: '四六级查询',
        url: 'packageResultQuery/pages/cet_his/CET_Result_His_Portal',
        appId: 'wxa56afc785454c86b'
      },
      {
        id: 7,
        name: '教资查询',
        url: 'jiaoyubu/pages/business/ntceScore/fillInfo/fillInfo',
        appId: 'wx2eec5fb00157a603'
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
    return {

    }
  }
})