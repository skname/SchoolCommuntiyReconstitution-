import {
  roundedRect,
  drawImage,
  canvasToImage,
  fillText
} from "./canvas.js"
import {
  getShareImg,
  getSystemInfo,
  getNode
} from "./weixin.js"
import {
  showLoading,
  hideLoading
} from "../../utils/index"
Component({
  /**
   * 组件的属性列表
   */
  data: {
    imageSrc: ""
  },
  properties: {
    articleInfo: {
      type: Object,
      value: null
    },
    shareParam: {
      type: String,
      value: null
    }
  },
  lifetimes: {
    async ready() {
      showLoading({
        mask: true,
        title: "生成中"
      })
      const {
        shareParam
      } = this.properties
      const {
        articleInfo
      } = JSON.parse(shareParam)

      // 获取设备信息
      const systemInfo = await getSystemInfo();
      // 计算 rpx 适配
      const {
        screenWidth,
        screenHeight,
        pixelRatio
      } = systemInfo;
      const width = screenWidth * pixelRatio;
      const height = screenHeight * pixelRatio;
      const rpx = width / 750; // 所有机型以 750 个像素为最长宽度
      this.rpx = rpx;
      // 获取画布节点 
      const canvas = await getNode.call(this, ".canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = width;
      canvas.height = 350 * rpx;

      // 填充背景颜色
      ctx.fillStyle = "#c3bef0";
      ctx.fillRect(0, 0, width, height);

      // 画圆角矩形
      ctx.fillStyle = "#FEFEFE";
      roundedRect(ctx, 40 * rpx, 20 * rpx, 670 * rpx, 200 * rpx, 20 * rpx);

      // 填充文章内容
      ctx.fillStyle = "#414141";
      ctx.font = `${32*rpx}px serif`;
      fillText.call(this, ctx, articleInfo.content, 17, 2)

      // 先生成小程序码并且绘制
      const imageSrc = await getShareImg(shareParam);
      this.setData({
        imageSrc
      })

      const shareImage = await drawImage.call(this, canvas, imageSrc, true)

      ctx.beginPath();
      ctx.arc(650 * rpx, 290 * rpx, 50 * rpx, 0, Math.PI * 2);
      ctx.save()
      ctx.clip();
      ctx.closePath()
      ctx.drawImage(shareImage, 600 * rpx, 240 * rpx, 100 * rpx, 100 * rpx)
      ctx.restore();

      // 绘制logo  
      ctx.beginPath();
      const logoImage = await drawImage.call(this, canvas, "https://img.skself.work/icon/logo/logo.png");
      ctx.drawImage(logoImage, 40 * rpx, 240 * rpx, 100 * rpx, 100 * rpx);
      ctx.font = `bolder ${25*rpx}px serif`;
      ctx.fillStyle = "#fce38a";
      ctx.fillText("太大丫丫", 160 * rpx, 300 * rpx);
      ctx.font = `bolder ${33*rpx}px cursive`;
      ctx.fillStyle = "#000";
      ctx.fillText("长按扫码", 420 * rpx, 280 * rpx);
      ctx.fillText("查看回复", 420 * rpx, 320 * rpx);

      // 绘制昵称和头像
      const imagePic = await drawImage.call(this, canvas, articleInfo.headPic)
      const radius = 15;
      ctx.fillStyle = "#000";
      ctx.font = `${15*rpx}px serif`;
      ctx.fillText(articleInfo.nickName, (70 + radius + 10) * rpx, 195 * rpx)
      ctx.beginPath();
      ctx.arc(70 * rpx, 190 * rpx, radius * rpx, 0, Math.PI * 2);
      ctx.clip();
      ctx.closePath()
      // 绘制头像
      ctx.drawImage(imagePic, (70 - radius) * rpx, (190 - radius) * rpx, radius * 2 * rpx, radius * 2 * rpx);
      hideLoading()
      canvasToImage(canvas)
    }
  },
  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})