import {req} from '../../utils/Req';
import {imgStorage, getImgs} from '../../utils/imgStorage';
Page({
    /**
     * 页面的初始数据
     */
    data: {
        bottom: '100%',
        icons: ['https://skself.work/static/icon/time.png',
            'https://skself.work/static/icon/look.png',
            'https://skself.work/static/icon/pecil.png'        ]
    },
    form: {
        name:'', 
        value: '',
        query:wx.createSelectorQuery(),
        request(name, value) {
        req('/publicMessage', 'post',{name, message:value});
        },
        // 弹窗 
        openForm(that) {
            that.setData({
                bottom: '-100%'
            })
        },
        closeForm(that) {
            that.setData({
                bottom: '100%'
            })
        }
    },
    // 弹出表单
    writeMessage() {
        this.form.openForm(this);
    },
    close() {
        this.form.closeForm(this)
    },
    // 获取发送者名字
    getName(e) {
        this.form.name = e.detail.value;
    },
    // 获取表单内容
    getMessage(e){
        this.form.value = e.detail.value;
    },
    // 提交表单
    submit() {
        let { name, value} = this.form;
        if(!(name&&value)) {
            wx.showToast({
              title: '内容不能为空！',
              icon:'error'
            })
            return;
        }
        this.form.request(name, value);
        wx.showToast({
          title: '留言成功！',
        })
        this.form.closeForm(this);
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad:async function (options) {
        getImgs.call(this,'iconMessage');
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady:async function () {
        imgStorage(this.data.icons, 'iconMessage');
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
        
        return{

        }
    },
    onShareTimeline(){
        return{

        }
    }
})