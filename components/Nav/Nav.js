Component({
  properties: {
    nav: {
      type: Array,
      value: []
    },
    renderHtml: {
      type: String,
      value: ''
    }
  },
  data: {
    select: 0
  },
  methods: {
    handleSelect(event) {
      let {
        index
      } = event.currentTarget.dataset
      this.triggerEvent('handleSelect', index)
      this.setData({
        select: index
      })
    }
  }
})