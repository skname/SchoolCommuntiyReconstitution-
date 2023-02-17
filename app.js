import {
  getGolbalStatus,
} from './index.js';
import {
  init,
  getOpenId
} from "./utils/index.js"
App({
  onLaunch() {
    getGolbalStatus.call(this)
    const id = getOpenId();
    id && init(id)
  },
})