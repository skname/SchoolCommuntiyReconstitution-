import {
  USERINFO,
  postAction,
  showLoading,
  hideLoading,
  showToast,
  setStorage,
  throttle,
  chooseImage,
  upload,
  getUserInfo,
  back
} from '../../utils/index.js';

const handleUpdate = async function () {
  let {
    openId,
    userSex,
    userInfo,
    nickName,
    headPic
  } = this.data;
  if (nickName == '') {
    return showToast({
      title: '昵称不能为空',
      icon: 'error'
    })
  }
  postAction('/user/info/update', {
    openId,
    userSex,
    userInfo,
    nickName,
    headPic
  }, {
    mask: true,
    title: '保存中...'
  }).then(res => {
    setStorage(USERINFO, res)
    const value = getUserInfo();
    value.nickName = nickName;
    value.userInfo = userInfo;
    value.userSex = userSex;
    back()
  })
}

export const handleUpdateThrottle = throttle(handleUpdate, 1000)

export function handleUpdateHeadPic() {
  chooseImage({
    count: 1
  }, async file => {
    showLoading({
      mask: true,
      title: '上传中...'
    })
    const openId = this.data.openId
    try {
      const {
        code,
        data,
        msg
      } = await upload('/file/avatar/update', file[0], 'headPic', {
        openId
      })
      hideLoading();
      if (code == 200) {
        // 渲染，代替
        uploadComplete.call(this, data);
        showToast({
          title: msg,
          icon: 'success'
        })

      } else {
        showToast({
          title: msg || '',
          icon: 'error'
        })
      }
    } catch {
      hideLoading();
      showToast({
        title: '服务器异常',
        icon: 'error'
      })
    }

  })
}
// 处理渲染和替换缓存
async function uploadComplete(data) {
  this.setData({
    headPic: data.url
  })
  const value = getUserInfo()
  if (value) {
    value['headPic'] = data.url;
    setStorage(USERINFO, value)
  }
}