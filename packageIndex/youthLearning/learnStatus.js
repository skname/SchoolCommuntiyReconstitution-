import {
  init
} from './index.js'
import {
  preview,
  showToast
} from '../../utils/index.js'
Page({
  data: {
    list: []
  },
  handePreview(event) {
    const {
      imgs
    } = event.currentTarget.dataset;
    if (!imgs || !imgs.length) {
      return showToast({
        title: '该同学未提交！',
        icon: 'error'
      })
    }
    preview(event)
  },
  onLoad(options) {
    init.call(this);
  }
})