export  function compressed(image, canvasId) {
    // 引用的组件传入的this作用域
    const _this = this 
    return new Promise((resolve, reject,config = {maxWidth: 750,maxHeight: 1334 }) => {
      // 获取图片原始宽高
      let width = image.width;
      let height = image.height;
      // 宽度 > 最大限宽 -> 重置尺寸
      if (width > config.maxWidth) {
        const ratio = width / config.maxWidth;
        width = config.maxWidth;
        height = height / ratio;
      }
      // 高度 > 最大限高度 -> 重置尺寸
      if (height > config.maxHeight) {
        const ratio = height / config.maxHeight;
        height = config.maxHeight;
        width = width / ratio;
      }
      // 设置canvas的css宽高
      _this.data.canvasCompress.width = width;
      _this.data.canvasCompress.height = height;
      const query = this.createSelectorQuery();
      query
        .select(`#${canvasId}`)
        .fields({ node: true, size: true })
        .exec(async res => {
          // 获取 canvas 实例
          const canvas = res[0].node
          // 获取 canvas 绘图上下文
          const ctx = canvas.getContext('2d');
          // 根据设备dpr处理尺寸
          const dpr = wx.getSystemInfoSync().pixelRatio;
          canvas.width = width * dpr;
          canvas.height = height * dpr;
          ctx.scale(dpr, dpr);
          // 将图片绘制到 canvas
          ctx.drawImage(image, 0, 0, width, height);
          // 将canvas图片上传到微信临时文件
          wx.canvasToTempFilePath({
            canvas,
            x: 0,
            y: 0,
            fileType: 'jpg',
            destWidth: width,
            destHeight: height,
            complete (res) {
              if (res.errMsg === 'canvasToTempFilePath:ok') {
                // 返回临时文件路径
                resolve(res.tempFilePath)
              }
            },
            fail(err) {
              reject(err)
            }
          })
        })
    })
  }

  export function load (image){
    return new Promise((res, rej)=>{
      image.onload = function(){
        res(image);
      }
    })
  }