import {
  iconStorage,
  MY_MESSAGE_ICON
} from '../../utils/index.js'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isChecked: {
      type: Boolean,
      value: false
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    icons: iconStorage.get(MY_MESSAGE_ICON)
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleSelect() {
      this.triggerEvent('handleSelect')
    }
  }
})