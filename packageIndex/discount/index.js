import {
  getAction,
  getOpenId
} from '../../utils/index.js'
export function init() {
  getAction('/coupon/listCoupon').then(res => {
    this.setData({
      discountList: res.data
    })
  })
}