import {
  getAction,
  showToast
} from "../../utils/index.js";
import {
  articleListMinix
} from '../../minix/articleListMinix.js'

export function initProxy() {
  this.data.search.openId = this.openId;
  this.url = '/article/list/user';
  articleListMinix.call(this);
}

// 获取主页信息
export function getPersonInfoAndRender(isMine) {
  getAction('/user/home', {
    openId: this.openId
  }).then(res => {
    if (res.code != 200) {
      showToast({
        title: res.msg,
        icon: 'error'
      })
    }
    this.setData({
      userInfo: res.data,
      isMine
    })
  }, err => {
    showToast({
      title: '服务器异常',
      icon: 'error'
    })
  })
}