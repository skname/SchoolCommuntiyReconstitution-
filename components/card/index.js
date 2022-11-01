import {
  debounce,
  getAction,
  getOpenId,
  postAction,
  showToast
} from '../../utils/index.js'

const handleClickLile = function () {
  const openIdClicked = getOpenId();
  //  发送请求
  let oldStatus = this.isLiked,
    newStatus = this.data.articleInfo.isLiked
  if (oldStatus == newStatus) return;
  let url;
  if (newStatus) {
    url = '/article/click' // 发送点赞请求
  } else {
    url = '/article/unclick' // 取消点赞请求
  }
  const {
    aid,
    openId
  } = this.data.articleInfo
  postAction(url, {
    aid,
    openId,
    clickPostId: openIdClicked
  }, false, false).then(res => {
    this.isLiked = newStatus
  })
}
const handleClickLikeThrottle = debounce(handleClickLile, 1000);

const reRenderBottom = function (articleInfoProxy) {
  this.setData({
    ['articleInfo.isLiked']: articleInfoProxy.isLiked,
    ['articleInfo.click']: articleInfoProxy.click
  })
}

export function proxyThrottle() {
  let articleInfoProxy = this.data.articleInfo;
  articleInfoProxy.isLiked = !articleInfoProxy.isLiked
  if (articleInfoProxy.isLiked) {
    articleInfoProxy.click += 1
  } else {
    articleInfoProxy.click -= 1
  }
  reRenderBottom.call(this, articleInfoProxy)
  handleClickLikeThrottle.call(this);
}

export async function handleDeleteArticle(aid) {
  const res = await getAction('/article/delete', {
    aid,
    openId: getOpenId()
  })
  if (res.code != 200) {
    return showToast({
      title: res.msg,
      icon: 'error'
    })
  }
  showToast({
    title: res.msg,
    icon: 'success'
  })
}