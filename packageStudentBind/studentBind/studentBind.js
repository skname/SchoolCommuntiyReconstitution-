import {
  getCaptcha,
  getCaptchaThrottle,
  handleBindStudentThrottle
} from './index.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isAgree: true,
    captchaUrl: '',
    studentNum: '',
    studentPassword: '',
    captcha: ''
  },
  inputFocus: function (e) {
    if (e.target.id == 'userid') {
      this.setData({
        'userid_focus': true
      });
    } else if (e.target.id == 'passwd') {
      this.setData({
        'passwd_focus': true
      });
    } else if (e.target.id == 'verific') {
      this.setData({
        'verific_focus': true
      });
    }
  },

  inputBlur: function (e) {
    if (e.target.id == 'userid') {
      this.setData({
        'userid_focus': false
      });
    } else if (e.target.id == 'passwd') {
      this.setData({
        'passwd_focus': false
      });
    } else if (e.target.id == 'verific') {
      this.setData({
        'verific_focus': false
      });
    }
  },
  handleBindStudent: handleBindStudentThrottle,
  // 刷新验证码
  reflashCaptch: getCaptchaThrottle,
  handleIsAgree() {
    this.setData({
      isAgree: !this.data.isAgree
    })
  },
  /** 
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    getCaptcha.call(this)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    wx.nextTick(() => {
      this.animate('.bottom', [{
          translateY: 600
        },
        {
          translateY: 0
        }
      ], 800)
      this.animate('.logo', [{
          opacity: 0
        },
        {
          opacity: 1
        }
      ], 1200)
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },
})