export function ToApp(appId){
    wx.navigateToMiniProgram({
      appId,
      success: ()=>{

      },
      fail: ()=>{
          
      }
    })
} 