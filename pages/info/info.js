import {getStorage, setStorage, removeStorage} from '../../utils/Storage';
import {req} from '../../utils/Req';
import {imgStorage, getImgs} from '../../utils/imgStorage';
import { showToast } from '../../utils/message/showToast';
import { throttle } from '../../utils/throttle';
let throttleClick = throttle(2), openid = undefined;
Page({
    data: {
        isopen: false,
        isBind: false,
        userInfo:'',
        openid:wx.getStorageSync('openid'),
        head:'',
        reply:0,
        name: '',
        List:[
            {
                name: '合作联系',
                icon: '',
                url:'/packA/info/cooperation/index'
            },
            {
                name: '加入我们',
                icon: '',
                url:'/packA/info/joinus/index'
            }
        ],
        icons:['https://skself.work/static/icon/back.png']
    },
    user:{
        registe:false,
        sex:'',
        saved: false,
        async render(that, data){
            let reply  = await getStorage('reply');
            that.setData({
                isBind: true,
                userInfo: data,
                isopen:false,
                head: data.avatarUrl,
                name: data.nickName,
                reply
            })
        },
        req(gender){
            req('/saveUserInfo', 'POST', {openid:openid, gender});
        }, 
        getUser(gender, that){
            let _this = this; 
            wx.getUserProfile({
                desc: 'desc',
                success: data => {
                  let { nickName, avatarUrl } = data.userInfo;
                  if(gender){
                    _this.render(that, {nickName,gender, avatarUrl});
                    // 保存信息
                    setStorage('userInfo', {nickName, avatarUrl,gender});
                    return;
                  }
                  _this.render(that, {nickName,gender:_this.sex, avatarUrl});
                  // 保存信息
                  setStorage('userInfo', {nickName, avatarUrl,gender:_this.sex});
                  //  发起请求缓存 
                _this.req(_this.sex);
                }
              })
        }
    },
    // 选择性别
    selectSex(e){
        this.user.sex = e.detail.value;
    },
    close() {
        this.setData({
            isopen: false
        })
    },
    confirm() {
        if(this.user.sex) {
            this.user.gender = this.user.sex
            this.user.getUser('',this)
            return;
        }
        showToast('请选择性别！');
    },
    // 登录
    async getUserInfo(){
        if(!throttleClick()) return showToast('请勿频繁点击！', 'error');
        let openidd = openid || wx.getStorageSync('openid');
        if(!openid) return showToast('请关闭重进！','error');
        let gender = await req(`/getGender?openid=${openidd}`, 'get');
        if(!gender) {
            // 第一次绑定
            this.setData({
                isopen: true
            })
            return;
        }
        this.user.getUser(gender,this);
    },
    // 退出 
    async emitLogin(){
        await removeStorage('userInfo');
        this.setData({
            isBind: false,
            userInfo:''
        })
    },
    async clearReply(){
        this.setData({
            reply:0 
        }) 
    await setStorage('reply',0);
    }, 
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function () {
        getImgs.call(this,'iconBack');
        openid = wx.getStorageSync('openid')
        try{
             let data = await getStorage('userInfo');
             this.user.render(this, data);
        }catch(err){
            
        } 
    },
 
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady:async function () {
        imgStorage(this.data.icons,'iconBack');
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