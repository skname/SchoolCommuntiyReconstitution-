// packageIndex/getScore/score.js
import {
  nextTickRender,
  preview,
  getUserInfo,
  getStudentInfo,
  pageScrollTo
} from '../../utils/index.js'
import {
  handleGetGrade,
  getCaptcha,
  handleUpdateScore
} from './index.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    captchaUrl: '',
    grade: '',
    isShow: false,
    icons: ['https://s1.ax1x.com/2022/10/10/xtMUQ1.png']
  },
  handlePreview: preview,
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    const UserInfo = getUserInfo()
    const studentInfo = getStudentInfo()
    this.setData({
      headPic: UserInfo.headPic,
      name: studentInfo.name,
      id: studentInfo.id,
      department: studentInfo.department,
      classNo: studentInfo.classNo
    })
    let studentGrade = await handleGetGrade.call(this, studentInfo.id);

    nextTickRender.call(this, studentGrade)
  },
  openUpdate() {
    const that = this;
    pageScrollTo({
      scrollTop: 0,
      success() {
        that.setData({
          isShow: true
        })
        getCaptcha.call(that)
      }
    })

  },
  closeMask() {
    this.setData({
      isShow: false
    })
  },
  handleInputChange(event) {
    const value = event.detail.value
    if (value.length == 4) {
      this.closeMask()
      const studentNum = getStudentInfo().id;
      handleUpdateScore.call(this, studentNum, value)
    }
  },
  handleFouse() {},
  handleScroll() {},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})