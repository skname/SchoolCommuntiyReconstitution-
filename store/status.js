import {
  toAttention,
  isLogin
} from '../utils/index.js'

function createStore() {
  const store = {
    status: {
      isHasMessage: false, // 是否有新的消息
      isPublicNewArticle: false, // 是否发表新的文章
      isOpenMessageEmit: false, // 是否开启消息推送 
      isOpenClassEmit: false, // 是否开启课表推送
      isMpStatus: false, // 是否关注
    },
    mutation: {
      SET_MESSAGE(status, value = true) {
        status.isHasMessage = value
      },
      SET_PUBLIC(status, value = false) {
        status.isPublicNewArticle = value
      },
      SET_MESSAGE_EMIT(status, value = false) {
        status.isOpenMessageEmit = value
      },
      SET_CLASS_EMIT(status, value = false) {
        status.isOpenClassEmit = value
      },
      SET_MP_STATUS(status, value = false) {
        status.isMpStatus = value;
        isLogin() && toAttention('关注公众号开启更多玩法！', value)
      }
    }
  }
  store.commit = function (type, ...args) {
    this.mutation[type](this.status, ...args);
  }
  return store
}

export const Store = createStore()