// 导航栏
import {
  articleListMinix
} from '../../minix/articleListMinix.js'
import {
  getAction,
  getOpenId,
  throttle,
  isDef,
  showToast
} from '../../utils/index.js'

const handleSearch = function () {
  if (!isDef(this.data.search.searchContent)) {
    return showToast({
      title: '请输入搜索内容',
      icon: 'error'
    })
  }
  this.clear = true
  this.initPage()
  this.init()
}
export const handleSearchThrottle = throttle(handleSearch, 2000);

export function initProxy() {
  this.url = '/article/list';
  this.isInit = false; // 控制是否刷新并滚动到顶端
  articleListMinix.call(this)
}

export const navigationList = [{
    id: 0,
    name: '广场',
    color: '#2c2c2c'
  },
  {
    id: 1,
    name: '热门',
    type: 'handpick',
    color: '#FF7B15'
  },
  {
    id: 2,
    name: '男神女神墙',
    type: 'confession',
    color: '#d4237a'
  },
  {
    id: 3,
    name: '扩列',
    color: '#13227a'
  },
  {
    id: 4,
    name: '二手',
    color: '#9428F8'
  },
  {
    id: 5,
    name: '失物',
    color: '#1296db'
  },
  {
    id: 6,
    name: '吐槽',
    color: '#d81e06'
  },
  {
    id: 7,
    name: '游戏',
    color: '#87CEEB'
  },
  {
    id: 8,
    name: '招新',
    color: '#1afa29'
  },
  {
    id: 9,
    name: '置顶',
    color: '#cca8e9'
  }
]

export function getTopList(type, fn) {
  const openId = getOpenId();
  getAction('/getTopList', {
    openId,
    type
  }).then(res => {
    fn(res.data)
  })
}