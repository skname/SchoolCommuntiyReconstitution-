Component({
  options: {
    addGlobalClass: true
  },
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
   * 组件的方法列表
   */
  methods: {
    handlePickChang({
      detail
    }) {
      const {
        value
      } = detail;
      this.triggerEvent('handlePickChang', value)
    }
  }
})