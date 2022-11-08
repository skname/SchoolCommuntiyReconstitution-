let workUrl = 'https://skself.work'; // 工作
let baseUrl = workUrl
let cookieStore = '';
const STUDENTINFO = 'studentInfo';
const USERINFO = 'userInfo';

function throttle(fn, delay) {
  let time = null;
  return function (...args) {
    if (time) {
      return false;
    }
    fn.apply(this, args);
    time = setTimeout(() => {
      clearTimeout(time);
      time = null;
    }, delay);
  }
}

export const getCaptchaThrottle = throttle(getCaptcha, 3000);
export const handleBindStudentThrottle = throttle(handleBindStudent, 3000);

function parseCookie(cookies) {
  const cookie = cookies.split(';')
  cookieStore = cookie[0]
}

function getAction(url, data = null) {
  let str = '';
  if (data) {
    str = '?';
    keys = Object.keys(data);
    let len = keys.length;
    for (let i = 0; i < len; i++) {
      const key = keys[i]
      str += `${key}=${data[key]}`;
      if (i != len - 1) {
        str += '&&';
      }
    }
  }
  return new Promise((res, rej) => {
    wx.request({
      url: `${baseUrl}${url}${str}`,
      timeout: 5000,
      method: 'GET',
      dataType: 'json',
      success: data => {
        data.cookies[0] && parseCookie(data.cookies[0])
        res(data.data);
      },
      fail: err => {
        rej(err)
      }
    })
  })
}

// POST 请求
function postAction(url, data = {}, loadMessage = {
  title: '加载中...',
  mask: true
}) {
  loadMessage && wx.showLoading(loadMessage)
  return new Promise((res, rej) => {
    wx.request({
      url: `${baseUrl}${url}`,
      method: 'POST',
      data,
      dataType: 'json',
      timeout: 5000,
      responseType: 'text',
      header: {
        'Cookie': cookieStore
      },
      success: data => {
        loadMessage && wx.hideLoading()
        let result = data.data;
        const {
          code,
          msg
        } = result;
        if (code == 200) {
          wx.showToast({
            title: msg,
            icon: 'success'
          })
          res(result.data);
        } else {
          getCaptcha.call(this)
          wx.showToast({
            title: msg,
            icon: 'error'
          })
        }
      },
      fail: err => {
        wx.hideLoading()
        wx.showToast({
          title: '服务器异常',
          icon: 'error'
        })
        rej(err)
      }
    })
  })
}

export function getCaptcha() {
  getAction('/urp/captcha').then(res => {
    let {
      msg,
      code,
      data
    } = res;
    if (code === 200) {
      this.setData({
        captchaUrl: data.url
      })
    } else {
      wx.showToast({
        title: msg,
        icon: 'error'
      })
    }
  }, err => {
    wx.showToast({
      title: '服务器繁忙',
      icon: 'error'
    })
  })
}

export function handleBindStudent() {
  try {
    let userInfo = JSON.parse(wx.getStorageSync(USERINFO))
    let {
      studentNum,
      studentPassword,
      captcha,
      isAgree
    } = this.data;
    if (!isAgree) {
      return wx.showToast({
        title: '请先同意用户协议',
        icon: 'error'
      })
    }
    if (!studentNum || !studentPassword || !captcha) {
      return wx.showToast({
        title: '请填写全部内容',
        icon: 'error'
      })
    }
    postAction.call(this, '/urp/bind', {
      userName: studentNum,
      password: studentPassword,
      captcha,
      openId: userInfo.openId
    }, {
      title: '学号绑定中...',
      mask: true
    }).then(res => {
      wx.setStorage({
        key: STUDENTINFO,
        data: JSON.stringify(res)
      })
      wx.navigateBack({
        delta: 1,
        success() {
          wx.showToast({
            title: '绑定成功！',
            icon: 'success'
          })
        }
      })

    }, err => {

    })
  } catch {

  }

}