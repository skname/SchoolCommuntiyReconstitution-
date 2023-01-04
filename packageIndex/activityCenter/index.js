import {
  getAction,
  getOpenId
} from "../../utils/index.js";

export function init() {
  getAction('/prize/initPrizeStatus', {
    openId: getOpenId()
  }).then(res => {
    const {
      prizeNum,
      activeNum
    } = res.data
    this.num = prizeNum
    this.setData({
      num: prizeNum,
      activeNum
    })
  })
}