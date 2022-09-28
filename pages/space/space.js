import {req} from '../../utils/Req';
import config from '../../config';
import {imgStorage, getImgs} from '../../utils/imgStorage';
import {transformTime} from '../../utils/getTime';
import {isStop, isLogin} from '../../utils/Status/index';
import { throttle} from '../../utils/throttle';
import { showToast } from '../../utils/message/showToast'
let title = function(){
    showToast('更新了5条圈子！');
}
let refush = throttle(1.5,title),openid;
Page({
    data: {
        selected: 'all',
        value:'',
        navigationList:config.navigationList,
        cardList: [],
        top:'', 
        icons:[
            'https://skself.work/static/icon/public.png',
            'https://skself.work/static/icon/top.png',
            'https://skself.work/static/icon/nim.jpg']
    },
    status: {
        isLogin: false,
        isStop: false
    },
    card: {
        skip:0,
        isBottom: false,
        content: {},
        renderType:[],
        fiter(data){// 用来过滤是否点赞
            let res,box;
            box = data.map( Element =>{
             Element.time = transformTime(Element.id);
             res = Element.isLike.find(element=>element == openid)
             if(res){
                 Element.islike = true
             }
             return Element;
            })
            return box;
        },
        render( that, type , click) {
            that.data.cardList.push(this.fiter(this.content[type]));
            if(click){
                that.setData({
                    selected: type,
                    cardList:that.data.cardList
                })
                return;
            }
            that.setData({
                selected: type,
                [`cardList[${this.skip}]`]: that.data.cardList[this.skip]
            })
        },
        toTabBar(){ 
            wx.switchTab({
              url: '/pages/info/info',
            })
            wx.showToast({
                title: '请先绑定！',
              })
        },
        toURL() {
            wx.navigateTo({
              url: '/packB/send/send',
            })
        },
    },
    // 点击渲染
    clickEvent( e ) { 
        this.card.isBottom = false
        this.card.skip = 0;
        this.data.cardList = [];
        this.card.render( this ,e.currentTarget.dataset.type,'click');
        title();
    },
    // 预览图片
    previewImg(e) {
        let event = e.currentTarget.dataset;
        wx.previewImage({ 
          current: event.type[event.index],
          urls: event.type
        })
    },
    // 点击跳转
    async toURL() {
        let { toTabBar, toURL } = this.card,{isLogin,isStop} = this.status;
        // 判断是否登录
        if(!isLogin){
            return toTabBar();
        }
        if(isStop) return;
        toURL();
    },
    // 点击打开公众号
    webView(e){
        let {src} = e.currentTarget.dataset
        wx.navigateTo({
         url: `/package/webView/web?src=${src}`,
        })
    },
    /** 
     * 生命周期函数--监听页面加载 
     */
    reRenderComment(val){
        const {index, indexFF, info} = val.detail
        this.data.cardList[indexFF][index].comment.push(info)
        this.setData({
            [`cardList[${indexFF}][${index}].comment`]: this.data.cardList[indexFF][index].comment
        })
    },
    reRenderLike(val){
        const {index, type, name, id, like} = val.detail;
        like.push("k"); // 占位
        this.setData({
            [`cardList[${index}][${type}].isLike`] : like,
            [`cardList[${index}][${type}].islike`] : true
        });
        const content = this.card.content[name];
        for(let i = 0, l= content.length;i<l;i++){
            if(content[i]._id == id){// name 是类型
                this.card.content[name][i].islike = true;
                break;
            }
        }
        if(this.data.selected != 'all'){
            let content = this.card.content.all;
            for(let i = 0, l= content.length;i<l;i++){
                if(content[i]._id == id){// name 是类型
                    this.card.content.all[i].islike = true;
                    this.card.content.all[i].isLike.push('s');
                    break;
                }
            }
        }
    },
    onLoad:async function () {
        getImgs.call(this,'iconSpace'); // 获取缓存图片
        openid = wx.getStorageSync('openid');
        this.status.isLogin = await isLogin();
        this.status.isStop = await isStop();
        // 发送请求
        req('/getTop','get').then(res=>{
            this.setData({top:res})
        });
        let data = await req('/getArticle','get');
        this.card.content = data;
        this.card.render(this, 'all');
        refush();
    },
    onReady:async function () {
        imgStorage(this.data.icons, 'iconSpace');
    },
    onShow:async function () {
        this.status.isLogin = await isLogin();
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
    onPullDownRefresh:async function () {
        if(!refush()) return showToast('请勿频繁刷新!', 'error');
        this.card.isBottom = false;
        this.data.cardList = [];
        this.card.skip = 0
        let data = await req('/getArticle','get');
        this.card.content = data;
        this.card.render( this, 'all');
        title();
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: async function () {
        if(this.card.isBottom){
            return showToast('到底了！', 'error')
        }
        // 发送请求获取数据
        let type = this.data.selected, box;
        this.card.skip += 1;
        let skip = this.card.skip,data = await req('/getLoadArticle','POST',{type,skip: skip *5});
        if(data.length == 0) {
            this.card.isBottom = true;  
            return showToast('到底了！','error')
        }
        box = this.card.fiter(data)
        this.data.cardList.push(box);
        this.setData({ 
            [`cardList[${skip}]`] : box
        })
    },
    /**  
     * 用户点击右上角分享
     */ 
    onShareAppMessage: function () {
        return{

        }
    }
}) 