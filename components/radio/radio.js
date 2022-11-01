Component({
  /**
   * 组件的属性列表
   */
  properties: {
    radioGroup: {
      type: Array,
      value: []
    },
    title: {
      type: String,
      value: ''
    },
    select:{
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
    handleChange(event) {
      const currSelect = event.detail.value
      this.triggerEvent('handleRadioSelect', currSelect)
    }
  }
})