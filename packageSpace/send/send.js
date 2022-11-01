import {
  chooseImage,
  SEND_ICON,
  iconStorage
} from '../../utils/index.js'
import {
  submitThrottle
} from './index.js'
import {
  navigationList
} from '../../pages/space/index.js'

navigationList.splice(1, 1); // 删除热门

Page({
  data: {
    content: '',
    imageBox: [],
    selectIndex: 0,
    selectType: navigationList,
    icons: iconStorage.get(SEND_ICON),
  },
  handleImageBox({detail}) {
    this.setData({
      imageBox: detail
    })
  },
  submit: submitThrottle,
  handlePickChang(event) {
    let {
      value
    } = event.detail;
    this.setData({
      selectIndex: value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: async function () {}
})