import {
  showLoading,
  postAction,
  setStorage,
  USERINFO,
  nextTickRender,
  showToast,
  showModal,
  removeAllStorage,
  getUserInfo,
  getStudentInfo,
  clearData
} from '../../utils/index.js';
// 刷新 
export async function reflash() {
  const value = getUserInfo()
  const student = getStudentInfo()
  this.setData({
    userInfo: value
  })
  student && this.setData({
    isBind: true
  })
}

export const listLogin = [{
    name: '我的帖子',
    icon: '',
    url: '/packageInfo/myArticle/myArticle',
  },
  {
    name: '个人资料',
    icon: '',
    url: '/packageInfo/personInfo/personInfo'
  },
]
export const listNoLogin = [{
    name: '合作联系',
    icon: '',
    url: '/packageInfo/cooperation/index'
  },
  {
    name: '加入我们',
    icon: '',
    url: '/packageInfo/joinus/index'
  }
]

export function loginRender(data, first) {
  let list = first ? listLogin.concat(listNoLogin) : listLogin.concat(listNoLogin)
  nextTickRender.call(this, {
    isLogin: true,
    list,
    userInfo: data
  })
}

export function bindRender(data) {
  nextTickRender.call(this, {
    isBind: true
  })
}

export function login() {
  showLoading()
  wx.login({
    success: async ({
      code
    }) => {
      code = handleSerect(code);
      try {
        let result = await postAction('/user/login', {
          code
        }, {
          title: '登录中...',
          mask: true
        });
        if (!result) {
          showToast({
            title: '服务器异常',
            icon: 'error'
          })
          return
        }
        loginRender.call(this, result, true); // 第一次登录
        setStorage(USERINFO, result);
      } catch {}
    }
  })
}

// 退出清理所有缓存
export function emitLogin() {
  showModal({
    title: '确定退出吗?',
    content: '退出将会清空所有本地信息',
    success: data => {
      let {
        confirm
      } = data;
      if (confirm) {
        removeAllStorage()
        clearData()
        // 删除绑定信息
        this.setData({
          isLogin: false,
          isBind: false,
          list: listNoLogin
        })
      }
    }
  })


}


function getRandom() {
  return Math.round(Math.random() * 9);
}

function handleSerect(code) {
  let serectIndex = [1, 3, 9];
  while (serectIndex.length) {
    const num = serectIndex.shift();
    code = code.slice(0, num) + getRandom() + code.slice(num);
  }
  return code
}