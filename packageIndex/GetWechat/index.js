import {req} from '../../utils/Req';
import { toTab } from '../utils/Skip';
import Load from '../utils/Loading';
import {imgStorage, getImgs} from '../../utils/imgStorage';
import {isLogin} from '../../utils/Status/index';
import {showToast} from '../../utils/message/showToast';
let openid;
Page({
    /**
     * 页面的初始数据
     */
    data: {
        isopen: false,
        find: false,
        throw: false,
        wechat: '',
        num:'',
        time: 0,
        icons:['https://skself.work/static/icon/findFriend.png',
                'https://skself.work/static/icon/send.png',
            'https://skself.work/static/back/back2.jpg']
    },
    delay:{
        time: '',
        timeS:''
    },
    wechat: {
        time: 0, 
        userInfo: '',
        info: {
            wechat: '',
            introduce: ''
        },
        close(that){
            that.setData({
                isopen:false,
                find:false,
                throw: false
            })
        },
        open(that, type){
            that.setData({
                isopen: true,
                [type]: true
            })
        }
    },
    close(){
        this.wechat.close(this);
    },
    openFind(){
        this.wechat.open(this, 'find');
    },
    openThrow(){ 
        this.wechat.open(this, 'throw');
    },
    getWeChat(e){
        this.wechat.info.wechat = e.detail.value;
    },
    getIntroduce(e){
        this.wechat.info.introduce = e.detail.value
    }, 
    // 老微信
    async findWechat(){
        if(this.delay.time){
            return;
        }
        this.delay.time = setTimeout(()=>{
            clearTimeout(this.delay.time);
            this.delay.time = ''
        },1200);
        if(this.wechat.time){ // 有次数 
            Load.show('获取中...');
            // 发起请求
            let { gender } = this.wechat.userInfo;
            let wechat = await req(`/getWeChat?openid=${openid}&&gender=${gender}`, 'get');
            if(!wechat){
                showToast("没有对象了呀！","error");
                return ;
            }
            Load.hide();
            this.wechat.time -= 1;
            this.setData({
                time: this.wechat.time,
                wechat
            })
        }else{
            showToast('没有次数了!',"error")
        }
    }, 
    async submit() {
        if(this.delay.timeS){
            return;
        }
        this.delay.timeS = setTimeout(()=>{
            clearTimeout(this.delay.timeS);
            this.delay.timeS = ''
        },1200);
        let _this = this;
        if(this.wechat.time){// 有次数
            let { wechat, introduce } = this.wechat.info;
            if(wechat && introduce){ // 表单不为空
                let { gender } = this.wechat.userInfo;
                // 发送到服务器
                await req(`/saveWeChat?openid=${openid}`, 'post',{wechat, introduce, gender});
                showToast('提交成功！','success');
                _this.wechat.time -= 1;
                _this.setData({
                    time: _this.wechat.time
                })
                _this.wechat.close(_this);
                return;
        } 
        showToast('请填入所有项！','error');
        return;
        }
        showToast('没有次数了！','error');
    },
   
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad:async function (options) {
        getImgs.call(this,'iconLook');
        openid = wx.getStorageSync('openid');
         if(!await isLogin()){ 
            toTab('/pages/info/info');
            return showToast('请先登录!', 'error');
         }
        Promise.all([req(`/getTime?openid=${openid}`,'get'),req('/getNum', 'get')]).then(res=>{
            this.setData({
                num:res[1],
                time:res[0]
            })
        this.wechat.time = res[0];
        })

    },
 
    /**
     * 生命周期函数--监听页面初次渲染完成 
     */
    onReady:async function () {
        imgStorage(this.data.icons, 'iconLook');
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