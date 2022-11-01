import {
  isBindStudentNum,
  nextTickRender,
  handleFocus,
  getUserInfo
} from '../../utils/index.js'
import {
  handleUpdateThrottle,
  handleUpdateHeadPic
} from './index.js'
Page({
  data: {
    studentNum: '',
    isBind: 'false',
    nickName: '',
    userSex: '',
    userInfo: '',
    focusId: 'nickName',
    index: 0,
    selectSex: [{
        id: 0,
        name: '男'
      },
      {
        id: 1,
        name: '女'
      }
    ]
  },
  handleFocus,
  handleUpdate: handleUpdateThrottle,
  handleUpdateHeadPic,
  handlePickChang(event) {
    let index = event.detail.value
    let data = this.data.selectSex
    this.setData({
      index,
      userSex: data[index].name
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let value = isBindStudentNum()
    const userInfos = getUserInfo()
    if (userInfos) {
      const {
        openId,
        nickName,
        userSex,
        userInfo,
        headPic,
        createTime
      } = userInfos
      nextTickRender.call(this, {
        userInfo,
        openId,
        nickName,
        userSex,
        headPic,
        createTime: createTime.split('T')[0]
      })
    }
    if (value) {
      nextTickRender.call(this, {
        isBind: 'true',
        studentNum: value
      })
    }
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  }
})