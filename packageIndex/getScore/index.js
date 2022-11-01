import {
  getAction,
  setStorage,
  STUDENT_GRADE,
  showToast,
  getStudentGrade,
  nextTickRender,
  showLoading,
  hideLoading
} from '../../utils/index.js'
export async function handleGetGrade(id) {
  const studentGrade = getStudentGrade();
  if (studentGrade) {
    return Promise.resolve(studentGrade)
  }
  let gradeInfo = await getAction('/urp/grade', {
    id,
  })
  if (gradeInfo.code != 200) {
    return showToast({
      title: gradeInfo.msg,
      icon: 'error'
    })
  }
  gradeInfo.data.terms.reverse()
  setStorage(STUDENT_GRADE, gradeInfo.data)
  return gradeInfo.data
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

export function handleUpdateScore(userName, captcha) {
  showLoading({
    title: '更新中...',
    mask: true
  })
  getAction('/urp/grade/refresh', {
    userName,
    captcha
  }).then(res => {
    hideLoading()
    if (res.code != 200) {
      return showToast({
        icon: 'error',
        title: res.msg,
        duration: 2000,
        mask: true
      })
    }
    showToast({
      icon: 'success',
      title: res.msg,
      duration: 2000,
      mask: true
    });
    let studentGrade = res.data;
    studentGrade.terms.reverse()
    nextTickRender.call(this, studentGrade)
    setStorage(STUDENT_GRADE, studentGrade)
  })
}