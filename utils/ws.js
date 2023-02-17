const config = {
  url: "ws://192.168.0.107:8088"
}
// 初始化
class WS {
  constructor(id) {
    this.id = id;
    this.connect()
    this.error()
  }
  connect() {
    this.ws = wx.connectSocket({
      url: config.url
    })
    this.open()
  }
  error() {
    const that = this;
    this.ws.onClose(() => {
      that.connect()
    })

  }
  open() {
    const wsss = this.ws;
    const that = this;
    wsss.onOpen(function () {
      wsss.send({
        data: "sfirstk" + that.id
      })
    })
  }
  setTarget(id) {
    this.targetId = id;
  }
  sendMessage(content) {
    if (!content) return;
    const data = `${this.targetId}targetOpenid${content}`
    this.ws.send({
      data,
    })
  }
  onMessage(fn) {
    this.ws.onMessage((res) => {
      fn(res.data)
    })
  }
}
let wss;
// 初始化
export function init(id) {
  wss = new WS(id);
}
export function getWs() {
  return wss;
}