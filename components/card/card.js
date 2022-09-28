import {isStop, isLogin} from '../../utils/Status/index';
import {req} from '../../utils/Req';
import { getStorage } from '../../utils/Storage';
import {showToast} from '../../utils/message/showToast'
const cardID = { 
    openid: '', 
    _id: '',
    toname:'',
    name: '',
    index: '',
    indexFF:'',
    value:'',
    comment(that){
      const _this = this;
      const info = {
          name: this.name,
          toname: this.toname,
          text: this.value,
          openid:this.openid,
          myopenid:wx.getStorageSync('openid')
      }
      // 发送数据到服务器
      req('/updataComment','PUT',{ info, _id : _this._id });
      const index = this.index, indexFF = this.indexFF;
      that.triggerEvent('reRenderComment', {index, indexFF,info});
      this.value = ''; 
  },
  toTabBar(){ 
    wx.switchTab({
      url: '/pages/info/info',
    })
    showToast('请先绑定！','error')
},
  }
Component({
  /** 
   * 组件的属性列表
   */
  properties: {
    name: {
      type: String,
      value: (wx.getStorageSync('userInfo')).nickName
    },
    head: {
      type:String,
      value: (wx.getStorageSync('userInfo')).avatarUrl
    },
    type: {
      type: String,
      value: 'default' 
    },
    cardList:{
      type:Array,
      value: [],
    },
    icon:{
      type:String,
      value: ''
    },
    indexFF:{
      type:Number,
      value:''
    },
    myname: {
      type: String,
      value: ''
    },
    cancelLike:{
      type:String,
      value: true
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    isopen: false,
    placeholder:'',
    icons:['https://skself.work/static/icon/comment.png','https://skself.work/static/icon/like.png','https://skself.work/static/icon/isLike.png',]
  },
  /**
   * 组件的方法列表
   */
  methods: {
        // 预览图片
      previewImg(e) {
          let event = e.currentTarget.dataset;
          let Box = event.type.map(item =>'https://skself.work/static/imgs/' + item);
          wx.previewImage({
            current: Box[event.index],
            urls: Box
          })
      },
      async giveLike(e) {
        if(!await isLogin()) {
            cardID.toTabBar();
            return; 
        }
        let event = e.currentTarget.dataset,{index, type,id,like, name} = event;
        this.triggerEvent('reRenderLike', {index, type, id, like, name});
        req('/updateLike', 'PUT', {openid:wx.getStorageSync('openid'),id});
    },
        // 打开留言窗口
      async giveComment(e){
          if(await isStop()) return;
          if(!await isLogin()){
            return cardID.toTabBar();
          }
          let event = e.currentTarget.dataset;
          cardID._id = event.id;
          cardID.toname = event.name || null;
          cardID.index = event.index;
          cardID.indexFF = event.indexff;
          cardID.openid = event.openid
          cardID.name = (await getStorage('userInfo')).nickName;
          this.setData({
              isopen: true,
              placeholder:cardID.toname || ''
          })
      },
      // 获取评论
      getComment(e){
          cardID.value = e.detail.value;
      },
      // 提交评论
      submit(){
          if(!cardID.value){
              return;
          }
          // 提交评论并渲染
          cardID.comment(this);
      },
      // 关闭窗口
      closeComment() {
          this.setData({
              isopen:false
          })
      },
      // 打开个人空间
      async openPerson(e){
      if(await isStop()) return;
      if(!await isLogin()){ 
          return cardID.toTabBar();
      }
      let {head, openid, name} = e.currentTarget.dataset;
      wx.navigateTo({
        url: `/packB/Person/index?openid=${openid}&&head=${head}&&name=${name}&&type=other`,
      })
    },
      delete(e){
        const {id,index,indexff} = e.currentTarget.dataset;
        wx.showModal({
            title:'确认删除？',
          cancelColor: 'cancelColor',
          success: ({confirm,cancel})=>{
              if(confirm){
                this.triggerEvent('reRenderDelete', {index,indexff});
                    // 渲染页面丢失
                req(`/delete?_id=${id}`,'get');
              }
              if(cancel){
                return
              }
          }
        })
        
    }
  }
})
