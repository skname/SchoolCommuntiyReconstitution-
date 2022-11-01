import {
  getGolbalStatus
} from './index.js';
App({
  onLaunch() {
    getGolbalStatus.call(this)
  }
})