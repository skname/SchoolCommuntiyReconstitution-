import {
  iconStorage,
  SEND_ICON,
  chooseImage
} from '../../utils/index.js'
Component({
  options: {
    addGlobalClass: true
  },
  properties: {
    imageBox: {
      type: Array,
      value: []
    },
    deleteable: {
      type: Boolean,
      value: true
    }
  },
  data: {
    icons: iconStorage.get(SEND_ICON)
  },
  methods: {
    handleChangeParentImage() {
      this.triggerEvent('reRenderImageBox', this.data.imageBox);
    },
    handleSelectImage() {
      const that = this;
      chooseImage({
        count: 9 - that.data.imageBox.length
      }, files => {
        const currImageBox = this.data.imageBox;
        const newImageBox = currImageBox.concat(files);
        that.setData({
          imageBox: newImageBox
        })
        // 同步父组件
        this.handleChangeParentImage();
      })
    },
    handlDelete(event) {
      let {
        index
      } = event.target.dataset
      const newImageBox = this.data.imageBox;
      newImageBox.splice(index, 1);
      this.setData({
        imageBox: newImageBox
      })
      // 同步父组件
      this.handleChangeParentImage();
    }
  }
})