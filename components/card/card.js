import {
  navigationList
} from '../../pages/space/index.js';
import {
  routerAndParam,
  preview,
  showModal,
  validatorRouter,
  iconStorage,
  ARTICLE_TYPE_ICONS,
  ARTICLE_BOTTOM_ICONS
} from '../../utils/index.js';
import {
  proxyThrottle,
  handleDeleteArticle,
} from './index.js';
Component({
  options: {
    addGlobalClass: true
  },
  data: {
    icons: iconStorage.get(ARTICLE_BOTTOM_ICONS),
    typeIcons: iconStorage.get(ARTICLE_TYPE_ICONS),
    nav: navigationList,
    isShow: false,
    openId1: 'o_fdS46LIcYUrbtr7Jlo-saxtc4g',
    openId2: 'o_fdS4zt7U0pfXX_ZP4bs3YQBVFc'
  },
  properties: {
    articleInfo: Object,
    isShowTitleAndFooter: { // 是否展示类型和点赞评论
      type: Boolean,
      value: true
    },
    isClickDetail: { // 防止一直点击
      type: Boolean,
      value: true
    },
    isMine: { // 是否从我的帖子进入
      type: Boolean,
      value: false
    },
    isTop: { // 是否置顶
      type: Boolean,
      value: false
    }
  },
  lifetimes: {
    attached() {
      this.isLiked = this.properties.articleInfo.isLiked;
    }
  },
  methods: {
    handleRouterAndParam(event) {
      const {
        detail,
        url
      } = event.currentTarget.dataset
      routerAndParam(url, {
        articleInfo: detail
      })
    },
    handleRouter(event) {
      const {
        openid,
        url
      } = event.currentTarget.dataset
      routerAndParam(url, {
        openId: openid,
      })
    },
    preview: preview,
    giveLike() {
      if (!validatorRouter(true, false)) {
        return
      }
      proxyThrottle.call(this)
    },
    cancelLike() {
      proxyThrottle.call(this)
    },
    handleDelete(event) {
      showModal({
        confirmColor: '#f00',
        title: '确认删除？',
        async success({
          confirm
        }) {
          if (confirm) {
            await handleDeleteArticle.call(this, event.currentTarget.dataset.aid)
          }
        }
      })
    }
  }
})