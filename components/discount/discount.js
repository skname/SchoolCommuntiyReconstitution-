import {
  getOpenId,
  postAction,
  showToast,
  showModal
} from "../../utils/index.js"

// components/discount/discount.js
Component({
  /**
   * 组件的属性列表
   */
  options: {
    addGlobalClass: true
  },
  properties: {
    discountInfo: {
      type: Object
    },
    cardType: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    async handleGet(event) {
      const {
        id
      } = event.target.dataset
      // 抢券
      try {
        await postAction('/coupon/addUser', {
          couponId: id,
          openId: getOpenId()
        }, {
          title: '抢券中...',
          mask: true
        })
      } catch {
        showToast({
          title: '服务器异常！',
          icon: 'error'
        })
      }
    },
    handleDelete(event) {
      const that = this;
      const { 
        id
      } = event.target.dataset;
      // 使用券
      showModal({
        title: '确认使用？',
        content: '使用后将自动销毁',
        async success({
          confirm,
          cancel
        }) {
          if (confirm) {
            try {
              await postAction('/coupon/useCoupon', {
                id,
                openId: getOpenId()
              }, {
                title: '使用中...',
                mask: true
              })
              // 销毁
              that.triggerEvent('handleDelete')

            } catch {
              showToast({
                title: '服务器异常！',
                icon: 'error'
              })
            }
          }
        }
      })
    }
  }
})