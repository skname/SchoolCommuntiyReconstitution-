export function roundedRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x, y + radius);
  ctx.lineTo(x, y + height - radius);
  ctx.quadraticCurveTo(x, y + height, x + radius, y + height);
  ctx.lineTo(x + width - radius, y + height);
  ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
  ctx.lineTo(x + width, y + radius);
  ctx.quadraticCurveTo(x + width, y, x + width - radius, y);
  ctx.lineTo(x + radius, y);
  ctx.quadraticCurveTo(x, y, x, y + radius);
  ctx.fill();
}
// 将画布转为图片
export function canvasToImage(canvas) {
  const data = canvas.toDataURL();
  ImageToPhotosAlbum(data.slice(22), "base64")
}


// 将图片画到画布上
export function drawImage(canvas, path, isbase64 = false) {
  return new Promise((resolve, reject) => {
    const image = canvas.createImage();
    if (isbase64) {
      image.src = path;
      image.onload = function () {
        resolve(image);
      }
    }
    wx.getImageInfo({
      src: path,
      success(res) {
        image.src = res.path;
        image.onload = function () {
          resolve(image);
        }
      }
    })
  })
}


// 将图片保存到相册
function ImageToPhotosAlbum(data, encode) {
  const file = wx.getFileSystemManager()
  const temPath = `${wx.env.USER_DATA_PATH}/shareImg.png`
  file.writeFile({
    filePath: temPath,
    data,
    encoding: encode,
    success(res) {
      wx.saveImageToPhotosAlbum({
        filePath: temPath,
        success(res) {
          console.log("保存相册成功！")
        },
        fail(err) {
          console.log("保存相册失败！", err)
        }
      })
    },
    fail(err) {
      console.log(err, "文件保存失败！")
    }
  })
}

export function fillText(ctx, text, number, lineSize) { // number 一行几个字, lineSize // 几行
  text = text.trim()
  const rpx = this.rpx
  for (let i = 0; i < lineSize; i++) {
    const lineText = text.slice(i * number, (1 + i) * number);
    if (lineText.length === 0) {
      return;
    }
    ctx.fillText(lineText, 70 * rpx, (i + 1) * 70 * rpx);
  }
}