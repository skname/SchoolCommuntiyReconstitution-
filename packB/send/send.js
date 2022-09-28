import {req} from '../../utils/Req';
import {upload} from '../utils/Upload';
import Loading from '../utils/Loading';
import {getStorage} from '../../utils/Storage';
import {compressed,load} from '../utils/Compress';
import config from '../../config';
import {imgStorage, getImgs} from '../../utils/imgStorage';
import {showToast} from '../../utils/message/showToast';
let openid;
Page({ 
    data: {
        imageBox:[],
        card:config.navigationList.slice(2),
        icons:['https://skself.work/static/icon/appendImg.png'],
        canvasCompress:{
            width: '',
            height: ''
        }
    },
    image: {
        lock:true,
        System : wx.getFileSystemManager(),
        imageBox:[],
        compressImages:[],
        imgURL:[],
        headPhoto:'',
        name: '', // 自己名字
        text: '',
        type: '',
        setSendTextType( type ) {
            this.type = type;
        },
        setText( text ) {
            this.text = text;
        }, 
        async chooseName( name ) {
            // 选择匿名
            if(name){
                this.name = name;
                this.headPhoto = 'sk'; // 匿名头像
                return;
            }
            let data = await getStorage('userInfo');
            let { nickName, avatarUrl} = data;
            this.name = nickName;
            this.headPhoto = avatarUrl;
        },
        choose(that) {
            let _this = this;
            wx.chooseImage({
              sizeType: ['original', 'compressed'],
              sourceType: ['album', 'camera'],
              count: 9,
              success: async res => {
                Loading.show('正在处理...');
                // 获取 Canvas
                let l = res.tempFilePaths.length;
                // 添加
                const query = that.createSelectorQuery();
                query.select('#canvas_compress')
                .fields({ node: true, size: true })
                .exec(async data => {
                for(let i = 0; i < l; i++){
                    let image = data[0].node.createImage();
                    // 开始压缩 
                    image.src = res.tempFilePaths[i];
                    let imaged = await load(image);
                    let result = await compressed.call(that,imaged,"canvas_compress");
                    _this.imageBox.push(result);
                }
                _this.render(that);
                Loading.hide();
                return;
                })
              }
            })
        },
        delete( that, index ) {
            this.imageBox.splice(index,1);
            this.render(that);
        },
        render(that){ 
            that.setData({
                imageBox: this.imageBox
            })
        },
        async uploadImages() {
            let imageBox = this.imageBox,imgs,last = '',url;
            for(let i = 0,l = imageBox.length; i < l ; i++) {
                if(i === l-1) {
                    last = 'true';
                }
                 url = imageBox[i];
                 imgs = await upload('/uploadImage',url,'file',{sessionID: openid,last});
            }
            this.imgURL = imgs.imageBox;
            this.imageBox = []; // 清空
        },
        isNull(...args) {
          for(let i = 0,l = args.length; i < l; i ++) {
              if(!args[i]) return true;  
          }
          return false;
        }
    },
    // 选择图片
    chooseImg(){
        this.image.choose(this);
    }, 
    // 删除单个图片
    deleteOne( e ) {
        this.image.delete(this, e.currentTarget.dataset.index);
    },
    // 选择身份
    chooseName( e ){
        this.image.chooseName( e.detail.value );
    },
    // 选择标签 
    selectCard (e) {
        this.image.setSendTextType( e.detail.value )
    }, 
    // 获取文字内容
    getText( e ) {
        this.image.setText(e.detail.value);
    },
    async submit() {
        if(this.image.lock){
            if(!openid) return showToast('请重新进入小程序！','error');
                // 发送表单内容
            let { name, type, text, imageBox,headPhoto } = this.image; 
            if(!this.image.isNull(name, type, text )){
                Loading.show('上传中...');
                this.image.lock = false;
                // 上传图片
                if(imageBox.length != 0) {
                   await this.image.uploadImages();
                }
                await req('/publicArticle','post',{headPhoto, openid, name, type, text,like:0,comment:[],imageBox:this.image.imgURL});
                 // 上传成功后退出
                Loading.hide();
                wx.navigateBack({
                    delta:1 
                })
                this.image.lock = true;
            }
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        getImgs.call(this,'iconSend');
        openid = wx.getStorageSync('openid')
        let data = await getStorage('userInfo');
        let { nickName, avatarUrl} = data;
        this.image.name = nickName;
        this.image.headPhoto = avatarUrl;
    }, 

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady:async function () {
        imgStorage(this.data.icons, 'iconSend');
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