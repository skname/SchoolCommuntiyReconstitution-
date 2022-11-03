import {
  init,
  handleDeleteMessage,
  handleMessageEmit
} from './index.js';
import {
  routerAndParam,
  openGuide
} from '../../utils/index.js'
Page({
  data: {
    isChecked: ''
  }, 
  handleRouterAndParam(event) {
    const {
      url,
      detail,
      index,
      positionid
    } = event.currentTarget.dataset
    handleDeleteMessage.call(this, detail.aid, index)
    routerAndParam(url, {
      articleInfo: detail,
      positionId: positionid
    })
  },
  handleSelect() {
    let currStatus = this.data.isChecked;
    let title = currStatus ? '关闭后将无法收到回复！' : '请先关注公众号哦！';
    openGuide.call(this, currStatus, title, () => {
      this.setData({
        isChecked: !currStatus
      })
      // 发起请求
      handleMessageEmit.call(this)
    });

  },
  onLoad() {
    init.call(this);
  },
  onReady() {},
  onShow() {},
  onHide() {},
  onUnload() {},
  onPullDownRefresh() {},
  onReachBottom() {}
})