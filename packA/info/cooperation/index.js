import {imgStorage, getImgs} from '../../../utils/imgStorage';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        icons:['https://skself.work/static/back/coo1.jpg','https://skself.work/static/back/coo2.jpg','https://skself.work/static/back/coo3.jpg','https://skself.work/static/back/coo4.jpg']
    },
    /**
     * 生命周期函数--监听页面加载
     */
    previewImg( e ) {
        let Box = this.data.icons
        let event = e.currentTarget.dataset;
        wx.previewImage({
          current: Box[event.index],
          urls: Box
        })
    },
    onLoad:async function (options) {
      getImgs.call(this,'iconCoo');
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady:async function () {
      imgStorage(this.data.icons, 'iconCoo');
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