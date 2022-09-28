import {req} from '../../utils/Req';
import {transformTime} from '../../utils/getTime';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    card:[],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  reRenderComment(val){
    const {info} = val.detail; 
    this.data.card[0].comment.push(info)
    this.setData({
        [`card[${0}].comment`]: this.data.card[0].comment
    })
},
  onLoad: async function (options) {
    let {id} = options,res = await req(`/getReplyArticle?id=${id}`,'get');
    res.time = transformTime(res.id);
    this.data.card.push(res)
    this.setData({
      card:this.data.card
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})