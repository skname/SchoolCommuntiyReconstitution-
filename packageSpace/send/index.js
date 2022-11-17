import {
  throttle,
  postAction,
  showLoading,
  getOpenId,
  showToast,
  back,
  checkSymbol,
  uploadByQiNiu,
  ARTICLE_PIC,
  hideLoading,
  isDef
} from '../../utils/index.js'
import {
  Store
} from '../../store/index.js'
export async function submit() {
  const {
    content,
    selectIndex
  } = this.data
  const urls = this.data.imageBox;
  if (!isDef(content) && !isDef(urls)) {
    return showToast({
      title: "不能为空！",
      icon: 'error'
    })
  }
  showLoading({
    mask: false,
    title: '上传中...'
  })
  let picInfo = '';

  // 先发表内容
  try {
    if (urls.length > 0) {
      picInfo = await uploadByQiNiu(urls, ARTICLE_PIC);
    }

    await postAction('/article/upload', {
      content: checkSymbol(content),
      picInfo,
      openId: getOpenId(),
      cid: this.data.selectType[selectIndex].id
    }, {
      mask: false,
      title: '上传中...'
    }, false);
    // 设置发送过新文章
    Store.commit('SET_PUBLIC', true)
    hideLoading()
    back();
  } catch {}
}
export const submitThrottle = throttle(submit, 2000)