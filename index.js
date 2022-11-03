import {
  getAction,
  showToast,
  getOpenId,
  isDef,
  removeAllStorage,
  getStorageSync,
  setStorage
} from "./utils/index.js";
import {
  Store
} from './store/index.js'

export async function getGolbalStatus() {
  const openId = getOpenId()
  if (!isDef(openId)) return;
  const {
    code,
    msg,
    data
  } = await getAction('/getGlobalStatus', {
    openId
  })
  if (code != 200) {
    return showToast({
      title: msg || '',
      icon: 'error'
    })
  }
  const {
    isOpenMessageEmit,
    isOpenClassEmit,
    isMpStatus,
    mangerStorage
  } = data
  mangerStorage && handleStorage(mangerStorage); // 清理缓存
  isOpenMessageEmit && Store.commit('SET_MESSAGE_EMIT', true);
  isOpenClassEmit && Store.commit('SET_CLASS_EMIT', true);
  Store.commit('SET_MP_STATUS', isMpStatus ? true : false);
}

function handleStorage(data) { // 清理缓存
  let clearKey = getStorageSync('allStorage');
  if (clearKey == data) return;
  removeAllStorage()
  setStorage('allStorage', data);
}