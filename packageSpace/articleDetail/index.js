import {
  getAction,
  postAction,
  showToast,
  validatorRouter,
  uploadByQiNiu,
  ARTICLE_PIC,
  showLoading,
  hideLoading
} from '../../utils/index.js'

export function initComment(aid) {
  getAction('/article/comments/list', {
    aid
  }).then(res => {
    let {
      code,
      data
    } = res;
    if (code != 200) {
      return showToast({
        title: '服务器异常！',
        icon: 'error'
      })
    }
    renderComment.call(this, data);
  })
}

function renderComment(data) {
  this.setData({
    comments: data
  })
}
export function isLoginAndBind(loginable = true, bindable = true) {
  const isLoginAndBind = validatorRouter(loginable, bindable)
  return isLoginAndBind
}
export async function submitRequest(data) {
  showLoading({
    mask: true,
    title: '评论中...'
  })
  try {
    if (this.data.commentPic.length) {
      const url = await uploadByQiNiu(this.data.commentPic, ARTICLE_PIC);
      data.content += ('::COMMITPICTDYY::' + url);
    }
    hideLoading()
    await postAction('/article/comments/add', data, {
      title: '评论中...',
      mask: true
    })
    // 隐藏输入框 刷新评论
    wx.nextTick(() => {
      this.setData({
        isShow: false,
        commentContent: '',
        commentPic: []
      })
    })
    initComment.call(this, this.data.articleInfo.aid)
  } catch {}

}