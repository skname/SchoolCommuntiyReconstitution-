Component({
  properties: {
    nav: {
      type: Array,
      value: []
    },
    topArticle: {
      type: Object,
      value: null
    }
  },
  data: {
    select: 0,
    refresh: true
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
    },
    handleRefresh() {

    }
  }
})