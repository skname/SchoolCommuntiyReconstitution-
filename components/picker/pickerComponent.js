// components/picker/pickerComponent.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    ranges: {
      type: Array,
      value: []
    },
    select: {
      type: Number,
      value: 0
    },
    rangeKey: {
      type: String,
      value: ''
    },
    title: {
      type: String,
      value: ''
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
    handlePickChang({detail}){
      const { value} = detail;
      this.triggerEvent('handlePickChang', value)
    }
  }
})