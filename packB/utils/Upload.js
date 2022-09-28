import config from '../../config'
let {host} = config;
export function upload (url, filePath, name, data) {
    return new Promise((res, rej)=>{
        wx.uploadFile({
          filePath,
          name,
          url: host+url,
          formData: data,
          success: data => {
            res( JSON.parse(data.data) );
          },
          fail: err => {
            console.log(err)
          }
        }) 
    })
}  