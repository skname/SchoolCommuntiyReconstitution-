import {
  ToApp
} from '../../utils/index.js'
Page({
  data: {
    menu: [{
        id: 1,
        name: '照片冲印',
        url: 'pages/photo/index?store_id=1197',
        appId: 'wx7613a90097b68222',
        color: '#fcbad3'
      }, {
        id: 2,
        name: '在店打印',
        url: 'pages/index/main?gzh_id=2230',
        appId: 'wx7e6ca8d9aa60e615',
        color: '#a8d8ea'
      },
      {
        id: 3,
        name: '远程打印',
        url: 'pages/tabbar/index?store_id=1197',
        appId: 'wx7613a90097b68222',
        color: '#abedd8'
      }
    ]
  },
  toApp(event) {
    const {
      appid,
      url
    } = event.currentTarget.dataset
    ToApp(appid, url);
  },
})