import {
  mergeObject,
  showToast,
  getAction,
  getOpenId,
  isContain,
  pageScrollTo,
  nextTickRender
} from '../utils/index.js'
const openId = getOpenId()
const handleIsLiked = function handleIsLiked(list) {
  list.forEach(item => {
    item.isLiked = isContain(item.isLikedList, openId)
  })
}

export function articleListMinix() {
  const wxx = this;
  // 对象合并 私有属性和公共属性合并

  wxx.pages = {
    pageNum: 1,
    pageSize: 5,
    isBottom: false
  }

  wxx.initPage = function () {
    this.pages = {
      pageNum: 1,
      pageSize: 5,
      isBottom: false
    }
  }
  wxx.init = async function () {
    const url = wxx.url;
    // 合并查询条件
    const search = wxx.data.search ?
      mergeObject(wxx.data.search, {
        pageNumber: wxx.pages.pageNum,
        pageSize: wxx.pages.pageSize
      }) : {
        pageNumber: wxx.pages.pageNum,
        pageSize: wxx.pages.pageSize
      }
    let res = await getAction(url, search)
    let {
      code,
      msg
    } = res;
    if (code === 200) {
      wxx.pages.pageNum === 1 && showToast({
        title: msg,
        icon: 'success',
        mask: true
      })
      let newList = (res.data && (res.data.records || [])) || [];
      // 处理是否点赞
      openId && handleIsLiked(newList);
      if (newList.length < wxx.pages.pageSize) {
        wxx.pages.isBottom = true
      }
      if (wxx.clear) {
        wxx.clear = false
        const to = {
          scrollTop: 0,
          duration: 300,
          success() {
            nextTickRender.call(wxx, {
              cardList: [newList]
            })
          }
        }
        pageScrollTo.call(wxx, to);
      }
      nextTickRender.call(wxx, {
        [`cardList[${wxx.pages.pageNum - 1}]`]: newList
      })

      return
    }
    showToast({
      title: msg,
      icon: 'error'
    });
  }
  wxx.handleScrollBottom = function () {
    if (this.pages.isBottom) {
      return showToast({
        title: '已经到底了！',
        icon: 'error'
      })
    }
    this.pages.pageNum += 1;
    wxx.init()
  }
  wxx.init()
}