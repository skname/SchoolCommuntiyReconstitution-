import {
  getStudentInfo,
  routerTo
} from '../../utils/index.js'
import {
  getStudyInfo,
  handleSubmitDebouce,
  getStudyUploadInfo
} from './index.js'
Page({
  data: {
    imageBox: [],
    select: 0,
    isSubmited: false,
    pickerGroup: [{
      id: 0,
      value: '群众'
    }, {
      id: 1,
      value: '共青团员'
    }, {
      id: 2,
      value: '积极分子'
    }, {
      id: 3,
      value: '预备党员'
    }, {
      id: 4,
      value: '正式党员'
    }]
  },
  handleImageBox({
    detail
  }) {
    const {
      imageBox
    } = detail;
    this.setData({
      imageBox
    })
  },
  handleSubmit() {
    handleSubmitDebouce.call(this)
  },
  handleUpdate() {
    this.setData({
      isSubmited: false
    })
  },
  handlePiceChange({
    detail
  }) {
    this.setData({
      select: detail
    })
  },
  handleSubmitStatus(event) {
    routerTo.call(this, event)
  },
  onLoad() {
    this.studentInfo = getStudentInfo();
    // 从缓存拿取状态
    getStudyInfo.call(this);
    // 后端请求是否已经上传
    getStudyUploadInfo.call(this);
  },
  onReady() {

  },
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  }
})