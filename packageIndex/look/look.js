// package/look/look.js
import {req} from '../../utils/Req';
import Loading from '../utils/Loading';
import {imgStorage, getImgs} from '../../utils/imgStorage';
import {transformTime} from '../../utils/getTime';
Page({
    /**
     * 页面的初始数据
     */ 
    data: {
        messageBox:[],
        icons:['https://skself.work/static/icon/headPhoto.png']
    },
    Message:{
        text: '',
        lock: true,
        async request(name, that) {
            let data = await req(`/getMessage?name=${name}`);
            Loading.hide();
            this.lock = true;
            if(data.length == 0){
                wx.showToast({
                  title: '找不到该用户！',
                  icon:'error'
                })
                return;
            }
            this.render(data, that);  
        },
        render(data, that){
            let res = data.map(e =>{
                 e.time = transformTime(e.time);
                 return e
            })
            that.setData({
                messageBox: res
            });
        }
    },
    // 获取名字
    getText(e) {
        this.Message.text = e.detail.value;
    },
    // 提交数据
    submit() {
        let name = this.Message.text,lock = this.Message.lock;
        if(!name) {
            return;
        }
        if(lock){
            this.Message.request(name, this);
            this.Message.lock = false;
            Loading.show('获取中...');
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad:async function () {
          getImgs.call(this,'iconHead');
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady:async function () {
        imgStorage(this.data.icons, 'iconHead');
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