import {
  getAction,
  getOpenId,
  hideLoading,
  showLoading,
  showToast,
  validatorRouter,
} from '../../utils/index.js';
import {
  Store
} from '../../store/index.js'
Component({
  /**
   * 组件的属性列表
   */
  options: {
    addGlobalClass: true
  },
  properties: {
    helpData: {
      type: Object
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isShow: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleCancel() {
      this.setData({
        isShow: false
      })
    },
    handleHelp() {
      // 先判断是否登录
      if (!validatorRouter(true, false)) {
        // 保存数据
        Store.commit('SET_ACTIVITY_DATA', this.properties.helpData);
        return;
      }
      showLoading({
        mask: true,
        title: '助力中...'
      })
      let openId = this.properties.helpData.activityOpenId;
      getAction('/active/click', {
        openId,
        helpOpenId: getOpenId()
      }).then(res => {
        this.handleCancel()
        hideLoading()
        showToast({
          title: '助力成功！',
          icon: 'success'
        })
      }, () => {
        hideLoading()
      })
    }
  }
})