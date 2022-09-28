export function down (url) {
    return new Promise((res, rej )=>{
        wx.downloadFile({
            url:url,
            success: data=>{
                res(data.tempFilePath)
            }
        }) 
    })
}