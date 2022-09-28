import {req} from '../../utils/Req.js';
import {imgStorage, getImgs} from '../../utils/imgStorage';
import {transformTime} from '../../utils/getTime';
import {showToast} from '../../utils/message/showToast'
Page({
    /**
     * 页面的初始数据
     */
    data: {
        type:'',
        cardList:[],
        head: '',
        isopen:false,
        name : '',
        icons:['https://skself.work/static/back/back3.jpg']
    },
    person:{
        isBottom: false,
        skip:0,
        openid: '',
        content: '',
        fiter(data){ // 用来过滤是否点赞
            let box;
            box = data.map( Element =>{
             Element.time = transformTime(Element.id);
             return Element;
            })
            return box;
        },
        render(that){
            that.data.cardList.push(this.fiter(this.content));
            that.setData({
                [`cardList[${this.skip}]`]: that.data.cardList[this.skip],
                head: that.data.head,
                name: that.data.name
            })
        },
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
    delete(val){
        const {indexff,index} = val.detail;
        this.data.cardList[indexff].splice(index,1)
        this.setData({ 
            [`cardList[${indexff}]`]:this.data.cardList[indexff]
        })
    },
    onLoad: async function (options) {
        getImgs.call(this,'iconPerson');
        let {openid, head, name,type } = options;
        this.data.head = head;
        this.data.name = name;
        this.person.openid = openid;
        this.setData({
            type
        })
        this.person.content = await req(`/getPerson?openid=${openid}&&skip=${this.person.skip}`, 'get');
        this.person.render(this);
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        imgStorage(this.data.icons, 'iconPerson');
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
    onReachBottom:async function () {
        if(this.person.isBottom){
            return showToast('到底了！')
        }
        // 发送请求获取数据
        this.person.skip += 1; 
        let {skip,openid} = this.person,data;
        data = await req(`/getPerson?openid=${openid}&&skip=${skip*5}`,'get');
        if(data.length == 0) {
            this.person.isBottom = true;  
            return showToast('到底了！')
        }
        this.person.content = data
        this.person.render(this);
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})