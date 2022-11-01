import {
  Store
} from '../../store/index.js'
import {
  showToast,
  getAction,
  getOpenId,
  nextTickRender,
  debounce,
  openGuide
} from '../../utils/index.js';

export function init() {
  this.setData({
    isChecked: Store.status.isOpenMessageEmit
  })

  const openId = getOpenId();
  Store.status.isHasMessage &&
    getAction('/article/getNotice', {
      openId
    }).then(({
      code,
      msg,
      data
    }) => {
      if (code !== 200) {
        return showToast({
          title: msg,
          icon: 'error'
        })
      }
      this.setData({
        list: data
      })
    })
}

export function handleDeleteMessage(aid, index) {
  getAction('/article/notice/delete', {
    aid
  }).then(res => {
    if (res.code != 200) {
      return showToast({
        title: res.msg,
        icon: 'error'
      })
    }
  })
  // 同步删除页面
  const list = this.data.list;
  list.splice(index, 1);
  if (list.length == 0) {
    Store.commit('SET_MESSAGE', false)
  }
  nextTickRender.call(this, {
    list
  })

}
export const handleMessageEmit = debounce(function () {
  let currStatus = this.data.isChecked;
  if (Store.status.isOpenMessageEmit !== currStatus) {
    getAction('/user/isMessage', {
      openId: getOpenId(),
      messageStatus: currStatus ? '1' : '0'
    }).then(() => {
      Store.commit('SET_MESSAGE_EMIT', currStatus);
    })
  }
}, 1500)