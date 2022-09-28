import {req} from './utils/Req';
import {setStorage, getStorage} from './utils/Storage';
// app.js
App({
  async onLaunch() {
    try{ 
      data = await getStorage('openid');
    }catch(err) {
      // 登录
      wx.login({
        success:async ({code}) => {
          let openid = await req('/login', 'POST', { code });
            setStorage('openid', openid);
        } 
      })
    }
  },
})