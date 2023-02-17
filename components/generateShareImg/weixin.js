import {
  postAction
} from "../../utils/req"

export async function generatePic(param) {
  try {
    // 记得改
    const data = await postAction("https://td.3threestart.com/qr/", param, null, false)
    return data.qr;
  } catch (err) {
    console.log(err, "生成图片出错")
  }
}

// 获取小程序码
export async function getShareImg(param) {
  // 参数
  const picConfig = {
    path: `/packageSpace/articleDetail/detail?detail=${param}`,
    width: 280
  }
  try {
    const data = await generatePic(picConfig);
    return data
  } catch {

  }
}

// 获取手机信息

export function getSystemInfo() {
  return new Promise((res, rej) => {
    wx.getSystemInfoAsync({
      success(info) {
        res(info)
      }
    })
  })
}

// 获取节点
export function getNode(selector) {
  const query = this.createSelectorQuery().in(this);
  return new Promise((resolve, reject) => {
    query.select(".canvas").fields({
      node: true,
      size: true
    }).exec(res => {
      const canvas = res[0].node;
      resolve(canvas);
    })
  })
}