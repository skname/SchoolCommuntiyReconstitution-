import {
  init,
  getClass,
  handleClassEmit
} from './index.js'
import {
  openGuide
} from '../../utils/index.js'
import {
  Store
} from '../../store/index.js'
Page({
  data: {
    day: [{
        name: '周一'
      },
      {
        name: '周二'
      },
      {
        name: '周三'
      }, {
        name: '周四'
      },
      {
        name: '周五'
      }
    ],
    isChecked: Store.status.isOpenClassEmit,
    allClass: '',
    selectIndex: [0, 0],
    otherClass: '其它班级',
    week: 0,
    isMask: false,
    char_lt: "<",
    char_gt: ">",
  },
  handleSelect() {
    const currStatus = this.data.isChecked;
    let title = currStatus ? '关闭后将无法推送课表！' : '请先关注公众号哦！';
    openGuide.call(this, currStatus, title, () => {
      this.setData({
        isChecked: !currStatus
      })
      handleClassEmit.call(this) // 处理订阅课表状态
    })
  },
  handleColumn(eventhandle) {
    const {
      column,
      value
    } = eventhandle.detail
    let {
      selectIndex,
      allClass
    } = this.data;
    selectIndex[column] = value
    if (column == 0) {
      allClass[1] = allClass[0][value].classes;
    }
    this.setData({
      selectIndex,
      allClass
    })
  },
  async handleChange(event) {
    const {
      value
    } = event.detail
    const {
      allClass,
      week
    } = this.data;
    const Class = allClass[0][value[0]].classes[value[1]];

    // 发起请求重新渲染
    if (Class.name == this.data.otherClass) return;
    const table = await getClass(Class.name, week);
    this.setData({
      table,
      otherClass: Class.name,
      selectIndex: value
    })
  },
  handleClick(event) {
    const {
      teacher,
      classroom,
      time,
      classes
    } = event.currentTarget.dataset;
    this.setData({
      isMask: true,
      teacher,
      classroom,
      time,
      classes
    })
  },
  handleCloseMask() {
    this.setData({
      isMask: false
    })
  },
  handleStatic() { // 不做处理
  },

  async handleSelectWeek(e) {
    const {
      type
    } = e.currentTarget.dataset;
    let week = this.data.week
    const className = this.data.otherClass || this.data.class;
    if (type == 0 && week > 1) {
      // 向左
      week -= 1

    }
    if (type == 1 && week < 16) {
      // 向右
      week += 1
    }

    const table = await getClass(className, week);
    this.setData({
      table,
      week
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    init.call(this);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  }

})