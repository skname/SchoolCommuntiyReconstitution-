import {
  ICONS
} from './icons.js'

// const down = function (url) {
//   return new Promise((res, rej) => {
//     wx.downloadFile({
//       url: url,
//       success(data) {
//         const fs = wx.getFileSystemManager();
//         fs.saveFile({
//           tempFilePath: data.tempFilePath,
//           success(value) {
//             res(value.savedFilePath)
//           }
//         })
//       }
//     })
//   })
// }

export const iconStorage = {
  get(name) {
    return ICONS[name]
  }
}