let testUrl1 = 'http://192.168.1.9'; // 杨鹏
let testUrl2 = 'http://192.168.1.4'; //王彭
let workUrl = 'https://skself.work'; // 工作
export default {
  // 记得切换动态中的主机地址
  baseUrl: testUrl2,
  navigationList: [{
      id: 0,
      name: '广场',
      type: 'all'
    },
    {
      id: 1,
      name: '精选',
      type: 'handpick'
    },
    {
      id: 2,
      name: '今日',
      type: 'day'
    },
    {
      id: 3,
      name: '表白',
      type: 'confession'
    },
    {
      id: 4,
      name: '吐槽',
      type: 'disclose'
    },
    {
      id: 5,
      name: '二手',
      type: 'used'
    },
    {
      id: 6,
      name: '失物',
      type: 'lose'
    },
    {
      id: 7,
      name: '纳新',
      type: 'invite'
    }
  ]
}