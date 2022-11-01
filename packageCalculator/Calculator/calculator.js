import {
  debounce,
  handleReset,
  filterFromOther,
  setStorage,
  showToast,
  navigate,
  transformTime,
  showLoading,
  hideLoading
} from '../index.js';

const handleComputed = function () {
  let data = this.otherData;
  data.render.call(this, data);
  data.computedScore.call(this, data, this.data.select.gender, this.data.select.grade)
}

const handleSave = function (key, data) {
  setStorage(key, data)
  hideLoading()
  showToast({
    title: '存档成功！',
    icon: 'success',
    duration: 1500
  });
}
const save = debounce(handleSave, 1000);
const computed = debounce(handleComputed, 1000);
Page({
  /**
   * 页面的初始数据
   */
  data: {
    gender: [{
        id: 0,
        name: '男生'
      },
      {
        id: 1,
        name: '女生'
      }
    ],
    grade: [{
        id: 0,
        name: '大一'
      },
      {
        id: 1,
        name: '大二'
      },
      {
        id: 2,
        name: '大三'
      },
      {
        id: 3,
        name: '大四'
      },
    ],
    totalScore: '0.0',
    bodyIndex: '0',
    status: {
      bodyIndex: '低体重',
      score: '不及格'
    },
    select: {
      gender: 0,
      grade: 0
    },
    height: '',
    weight: '',
    vitalCapacity: '', // 肺活量
    sitAneReach: '', // 坐位体前屈
    standingBroadJump: '', // 立定跳远
    firty: '', // 50米
    kilometer: '', //一千米
    pullUp: '', // 引体向上
    eightHundred: '',
    sitUp: '',
  },
  handleSelect(event) {
    const {
      grade,
      gender
    } = event.target.dataset;
    if (gender != undefined) {
      this.setData({
        ['select.gender']: gender
      })
    } else {
      this.setData({
        ['select.grade']: grade
      })
    }
    // 每次修改后重新计算成绩
    computed.call(this);
  },

  handleInput(event) {
    let data = this.otherData;
    data[event.target.dataset.type] = event.detail.value || '';
    computed.call(this);
  },
  reset() {
    let data = this.otherData;
    let keys = Object.keys(data);
    keys = filterFromOther(keys, ['render', 'computedScore', 'getGrade']);
    handleReset(data, keys, '');
    data.render.call(this, data, true);
  },
  routerTo: navigate,
  save() {
    const {
      select,
      grade,
      totalScore
    } = this.data;
    const key = grade[select.grade].name
    let date = new Date();
    showLoading()
    save(key, {
      name: key,
      totalScore,
      time: date.getFullYear() + ' ' + transformTime(date.getTime())
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.otherData = {
      getGrade: {
        getBodyIndex(weight = 0, height = 0) {
          if (height == 0) return 0
          height /= 100
          return Math.round(weight / (height * height));
        },
        getVitalCapacity(gender = 0, grade = 0, vitalCapacity) {
          if (vitalCapacity === '') return 0;
          let score = 0;
          if (gender === 0) {
            switch (true) {
              case grade <= 1 ? vitalCapacity < 2300:
                vitalCapacity < 2350:
                  score = 0
                break;
              case grade <= 1 ? vitalCapacity < 2460:
                vitalCapacity < 2520:
                  score = 10
                break;
              case grade <= 1 ? vitalCapacity < 2620:
                vitalCapacity < 2690:
                  score = 20
                break;
              case grade <= 1 ? vitalCapacity < 2780:
                vitalCapacity < 2860:
                  score = 30
                break;
              case grade <= 1 ? vitalCapacity < 2940:
                vitalCapacity < 3030:
                  score = 40
                break;
              case grade <= 1 ? vitalCapacity < 3100:
                vitalCapacity < 3200:
                  score = 50
                break;
              case grade <= 1 ? vitalCapacity < 3220:
                vitalCapacity < 3320:
                  score = 60
                break;
              case grade <= 1 ? vitalCapacity < 3340:
                vitalCapacity < 3440:
                  score = 62
                break;
              case grade <= 1 ? vitalCapacity < 3460:
                vitalCapacity < 3560:
                  score = 64
                break;
              case grade <= 1 ? vitalCapacity < 3580:
                vitalCapacity < 3680:
                  score = 66
                break;
              case grade <= 1 ? vitalCapacity < 3700:
                vitalCapacity < 3800:
                  score = 68
                break;
              case grade <= 1 ? vitalCapacity < 3820:
                vitalCapacity < 3920:
                  score = 70
                break;
              case grade <= 1 ? vitalCapacity < 3940:
                vitalCapacity < 4040:
                  score = 72
                break;
              case grade <= 1 ? vitalCapacity < 4060:
                vitalCapacity < 4160:
                  score = 74
                break;
              case grade <= 1 ? vitalCapacity < 4180:
                vitalCapacity < 4280:
                  score = 76
                break;
              case grade <= 1 ? vitalCapacity < 4300:
                vitalCapacity < 4400:
                  score = 78
                break;
              case grade <= 1 ? vitalCapacity < 4550:
                vitalCapacity < 4650:
                  score = 80
                break;
              case grade <= 1 ? vitalCapacity < 4800:
                vitalCapacity < 4900:
                  score = 85
                break;
              case grade <= 1 ? vitalCapacity < 4920:
                vitalCapacity < 5020:
                  score = 90
                break;
              case grade <= 1 ? vitalCapacity < 5040:
                vitalCapacity < 5140:
                  score = 95
                break;
              default:
                score = 100;
            }
          }
          if (gender === 1) {
            switch (true) {
              case grade <= 1 ? vitalCapacity < 1800:
                vitalCapacity < 1850:
                  score = 0
                break;
              case grade <= 1 ? vitalCapacity < 1840:
                vitalCapacity < 1890:
                  score = 10
                break;
              case grade <= 1 ? vitalCapacity < 1880:
                vitalCapacity < 1930:
                  score = 20
                break;
              case grade <= 1 ? vitalCapacity < 1920:
                vitalCapacity < 1970:
                  score = 30
                break;
              case grade <= 1 ? vitalCapacity < 1960:
                vitalCapacity < 2010:
                  score = 40
                break;
              case grade <= 1 ? vitalCapacity < 2000:
                vitalCapacity < 2050:
                  score = 50
                break;
              case grade <= 1 ? vitalCapacity < 2100:
                vitalCapacity < 2150:
                  score = 60
                break;
              case grade <= 1 ? vitalCapacity < 2200:
                vitalCapacity < 2250:
                  score = 62
                break;
              case grade <= 1 ? vitalCapacity < 2300:
                vitalCapacity < 2350:
                  score = 64
                break;
              case grade <= 1 ? vitalCapacity < 2400:
                vitalCapacity < 2400:
                  score = 66
                break;
              case grade <= 1 ? vitalCapacity < 2500:
                vitalCapacity < 2550:
                  score = 68
                break;
              case grade <= 1 ? vitalCapacity < 2600:
                vitalCapacity < 2650:
                  score = 70
                break;
              case grade <= 1 ? vitalCapacity < 2700:
                vitalCapacity < 2750:
                  score = 72
                break;
              case grade <= 1 ? vitalCapacity < 2800:
                vitalCapacity < 2850:
                  score = 74
                break;
              case grade <= 1 ? vitalCapacity < 2900:
                vitalCapacity < 2950:
                  score = 76
                break;
              case grade <= 1 ? vitalCapacity < 3000:
                vitalCapacity < 3050:
                  score = 78
                break;
              case grade <= 1 ? vitalCapacity < 3150:
                vitalCapacity < 3200:
                  score = 80
                break;
              case grade <= 1 ? vitalCapacity < 3300:
                vitalCapacity < 3350:
                  score = 85
                break;
              case grade <= 1 ? vitalCapacity < 3350:
                vitalCapacity < 3400:
                  score = 90
                break;
              case grade <= 1 ? vitalCapacity < 3400:
                vitalCapacity < 3450:
                  score = 95
                break;
              default:
                score = 100;
            }
          }
          return score * 0.15;
        },
        getSitAneReach(gender = 0, grade = 0, sitAneReach) {
          if (sitAneReach === '') return 0
          let score = 0;
          if (gender === 0) {
            switch (true) {
              case grade <= 1 ? sitAneReach < -1.3:
                sitAneReach < -0.8:
                  score = 0
                break;
              case grade <= 1 ? sitAneReach < -0.3:
                sitAneReach < 0.2:
                  score = 10
                break;
              case grade <= 1 ? sitAneReach < 0.7:
                sitAneReach < 1.2:
                  score = 20
                break;
              case grade <= 1 ? sitAneReach < 1.7:
                sitAneReach < 2.2:
                  score = 30
                break;
              case grade <= 1 ? sitAneReach < 2.7:
                sitAneReach < 3.2:
                  score = 40
                break;
              case grade <= 1 ? sitAneReach < 3.7:
                sitAneReach < 4.2:
                  score = 50
                break;
              case grade <= 1 ? sitAneReach < 5.1:
                sitAneReach < 5.6:
                  score = 60
                break;
              case grade <= 1 ? sitAneReach < 6.5:
                sitAneReach < 7:
                  score = 62
                break;
              case grade <= 1 ? sitAneReach < 7.9:
                sitAneReach < 8.4:
                  score = 64
                break;
              case grade <= 1 ? sitAneReach < 9.3:
                sitAneReach < 9.9:
                  score = 66
                break;
              case grade <= 1 ? sitAneReach < 10.7:
                sitAneReach < 11.2:
                  score = 68
                break;
              case grade <= 1 ? sitAneReach < 12.1:
                sitAneReach < 12.6:
                  score = 70
                break;
              case grade <= 1 ? sitAneReach < 13.5:
                sitAneReach < 14:
                  score = 72
                break;
              case grade <= 1 ? sitAneReach < 14.9:
                sitAneReach < 15.4:
                  score = 74
                break;
              case grade <= 1 ? sitAneReach < 16.3:
                sitAneReach < 16.8:
                  score = 76
                break;
              case grade <= 1 ? sitAneReach < 17.7:
                sitAneReach < 18.2:
                  score = 78
                break;
              case grade <= 1 ? sitAneReach < 19.5:
                sitAneReach < 19.9:
                  score = 80
                break;
              case grade <= 1 ? sitAneReach < 21.3:
                sitAneReach < 21.5:
                  score = 85
                break;
              case grade <= 1 ? sitAneReach < 23.1:
                sitAneReach < 23.3:
                  score = 90
                break;
              case grade <= 1 ? sitAneReach < 24.9:
                sitAneReach < 25.1:
                  score = 95
                break;
              default:
                score = 100;
            }
          }
          if (gender === 1) {
            switch (true) {
              case grade <= 1 ? sitAneReach < 2:
                sitAneReach < 2.5:
                  score = 0
                break;
              case grade <= 1 ? sitAneReach < 2.8:
                sitAneReach < 3.3:
                  score = 10
                break;
              case grade <= 1 ? sitAneReach < 3.6:
                sitAneReach < 4.1:
                  score = 20
                break;
              case grade <= 1 ? sitAneReach < 4.4:
                sitAneReach < 4.9:
                  score = 30
                break;
              case grade <= 1 ? sitAneReach < 5.2:
                sitAneReach < 5.7:
                  score = 40
                break;
              case grade <= 1 ? sitAneReach < 6:
                sitAneReach < 6.5:
                  score = 50
                break;
              case grade <= 1 ? sitAneReach < 7.3:
                sitAneReach < 7.8:
                  score = 60
                break;
              case grade <= 1 ? sitAneReach < 8.6:
                sitAneReach < 9.1:
                  score = 62
                break;
              case grade <= 1 ? sitAneReach < 9.9:
                sitAneReach < 10.4:
                  score = 64
                break;
              case grade <= 1 ? sitAneReach < 11.2:
                sitAneReach < 11.7:
                  score = 66
                break;
              case grade <= 1 ? sitAneReach < 12.5:
                sitAneReach < 13:
                  score = 68
                break;
              case grade <= 1 ? sitAneReach < 13.8:
                sitAneReach < 14.3:
                  score = 70
                break;
              case grade <= 1 ? sitAneReach < 15.1:
                sitAneReach < 15.6:
                  score = 72
                break;
              case grade <= 1 ? sitAneReach < 16.4:
                sitAneReach < 16.9:
                  score = 74
                break;
              case grade <= 1 ? sitAneReach < 17.7:
                sitAneReach < 18.2:
                  score = 76
                break;
              case grade <= 1 ? sitAneReach < 19:
                sitAneReach < 19.5:
                  score = 78
                break;
              case grade <= 1 ? sitAneReach < 20.6:
                sitAneReach < 21:
                  score = 80
                break;
              case grade <= 1 ? sitAneReach < 22.2:
                sitAneReach < 22.4:
                  score = 85
                break;
              case grade <= 1 ? sitAneReach < 24:
                sitAneReach < 24.4:
                  score = 90
                break;
              case grade <= 1 ? sitAneReach < 25.8:
                sitAneReach < 26.3:
                  score = 95
                break;
              default:
                score = 100;
            }
          }
          return score * 0.1
        },
        getStandingBroadJump(gender = 0, grade = 0, standingBroadJump) {
          if (standingBroadJump === '') return 0
          let score = 0;
          if (gender === 0) {
            switch (true) {
              case grade <= 1 ? standingBroadJump < 183:
                standingBroadJump < 185:
                  score = 0
                break;
              case grade <= 1 ? standingBroadJump < 188:
                standingBroadJump < 190:
                  score = 10
                break;
              case grade <= 1 ? standingBroadJump < 193:
                standingBroadJump < 195:
                  score = 20
                break;
              case grade <= 1 ? standingBroadJump < 198:
                standingBroadJump < 200:
                  score = 30
                break;
              case grade <= 1 ? standingBroadJump < 203:
                standingBroadJump < 205:
                  score = 40
                break;
              case grade <= 1 ? standingBroadJump < 208:
                standingBroadJump < 210:
                  score = 50
                break;
              case grade <= 1 ? standingBroadJump < 212:
                standingBroadJump < 214:
                  score = 60
                break;
              case grade <= 1 ? standingBroadJump < 216:
                standingBroadJump < 218:
                  score = 62
                break;
              case grade <= 1 ? standingBroadJump < 220:
                standingBroadJump < 222:
                  score = 64
                break;
              case grade <= 1 ? standingBroadJump < 224:
                standingBroadJump < 226:
                  score = 66
                break;
              case grade <= 1 ? standingBroadJump < 228:
                standingBroadJump < 230:
                  score = 68
                break;
              case grade <= 1 ? standingBroadJump < 232:
                standingBroadJump < 234:
                  score = 70
                break;
              case grade <= 1 ? standingBroadJump < 236:
                standingBroadJump < 238:
                  score = 72
                break;
              case grade <= 1 ? standingBroadJump < 240:
                standingBroadJump < 242:
                  score = 74
                break;
              case grade <= 1 ? standingBroadJump < 244:
                standingBroadJump < 246:
                  score = 76
                break;
              case grade <= 1 ? standingBroadJump < 248:
                standingBroadJump < 250:
                  score = 78
                break;
              case grade <= 1 ? standingBroadJump < 256:
                standingBroadJump < 258:
                  score = 80
                break;
              case grade <= 1 ? standingBroadJump < 263:
                standingBroadJump < 265:
                  score = 85
                break;
              case grade <= 1 ? standingBroadJump < 268:
                standingBroadJump < 270:
                  score = 90
                break;
              case grade <= 1 ? standingBroadJump < 273:
                standingBroadJump < 275:
                  score = 95
                break;
              default:
                score = 100;
            }
          }
          if (gender === 1) {
            switch (true) {
              case grade <= 1 ? standingBroadJump < 126:
                standingBroadJump < 127:
                  score = 0
                break;
              case grade <= 1 ? standingBroadJump < 131:
                standingBroadJump < 132:
                  score = 10
                break;
              case grade <= 1 ? standingBroadJump < 136:
                standingBroadJump < 137:
                  score = 20
                break;
              case grade <= 1 ? standingBroadJump < 141:
                standingBroadJump < 142:
                  score = 30
                break;
              case grade <= 1 ? standingBroadJump < 146:
                standingBroadJump < 147:
                  score = 40
                break;
              case grade <= 1 ? standingBroadJump < 151:
                standingBroadJump < 152:
                  score = 50
                break;
              case grade <= 1 ? standingBroadJump < 154:
                standingBroadJump < 155:
                  score = 60
                break;
              case grade <= 1 ? standingBroadJump < 157:
                standingBroadJump < 158:
                  score = 62
                break;
              case grade <= 1 ? standingBroadJump < 160:
                standingBroadJump < 161:
                  score = 64
                break;
              case grade <= 1 ? standingBroadJump < 163:
                standingBroadJump < 164:
                  score = 66
                break;
              case grade <= 1 ? standingBroadJump < 166:
                standingBroadJump < 167:
                  score = 68
                break;
              case grade <= 1 ? standingBroadJump < 169:
                standingBroadJump < 170:
                  score = 70
                break;
              case grade <= 1 ? standingBroadJump < 172:
                standingBroadJump < 173:
                  score = 72
                break;
              case grade <= 1 ? standingBroadJump < 175:
                standingBroadJump < 176:
                  score = 74
                break;
              case grade <= 1 ? standingBroadJump < 178:
                standingBroadJump < 179:
                  score = 76
                break;
              case grade <= 1 ? standingBroadJump < 181:
                standingBroadJump < 182:
                  score = 78
                break;
              case grade <= 1 ? standingBroadJump < 188:
                standingBroadJump < 189:
                  score = 80
                break;
              case grade <= 1 ? standingBroadJump < 195:
                standingBroadJump < 196:
                  score = 85
                break;
              case grade <= 1 ? standingBroadJump < 201:
                standingBroadJump < 202:
                  score = 90
                break;
              case grade <= 1 ? standingBroadJump < 207:
                standingBroadJump < 208:
                  score = 95
                break;
              default:
                score = 100;
            }
          }
          return score * 0.1
        },
        getFirty(gender = 0, grade = 0, firty) {
          if (firty === '') return 0
          let score = 0;
          if (gender === 0) {
            switch (true) {
              case grade <= 1 ? firty > 10.1:
                firty > 10:
                  score = 0
                break;
              case grade <= 1 ? firty > 9.9:
                firty > 9.8:
                  score = 10
                break;
              case grade <= 1 ? firty > 9.7:
                firty > 9.6:
                  score = 20
                break;
              case grade <= 1 ? firty > 9.5:
                firty > 9.4:
                  score = 30
                break;
              case grade <= 1 ? firty > 9.3:
                firty > 9.2:
                  score = 40
                break;
              case grade <= 1 ? firty > 9.1:
                firty > 9:
                  score = 50
                break;
              case grade <= 1 ? firty > 8.9:
                firty > 8.8:
                  score = 60
                break;
              case grade <= 1 ? firty > 8.7:
                firty > 8.6:
                  score = 62
                break;
              case grade <= 1 ? firty > 8.5:
                firty > 8.4:
                  score = 64
                break;
              case grade <= 1 ? firty > 8.3:
                firty > 8.2:
                  score = 66
                break;
              case grade <= 1 ? firty > 8.1:
                firty > 8:
                  score = 68
                break;
              case grade <= 1 ? firty > 7.9:
                firty > 7.8:
                  score = 70
                break;
              case grade <= 1 ? firty > 7.7:
                firty > 7.6:
                  score = 72
                break;
              case grade <= 1 ? firty > 7.5:
                firty > 7.4:
                  score = 74
                break;
              case grade <= 1 ? firty > 7.3:
                firty > 7.2:
                  score = 76
                break;
              case grade <= 1 ? firty > 7.1:
                firty > 7:
                  score = 78
                break;
              case grade <= 1 ? firty > 7:
                firty > 6.9:
                  score = 80
                break;
              case grade <= 1 ? firty > 6.9:
                firty > 6.8:
                  score = 85
                break;
              case grade <= 1 ? firty > 6.8:
                firty > 6.7:
                  score = 90
                break;
              case grade <= 1 ? firty > 6.7:
                firty > 6.6:
                  score = 95
                break;
              default:
                score = 100;
            }
          }
          if (gender === 1) {
            switch (true) {
              case grade <= 1 ? firty > 11.3:
                firty > 11.2:
                  score = 0
                break;
              case grade <= 1 ? firty > 11.1:
                firty > 11:
                  score = 10
                break;
              case grade <= 1 ? firty > 10.9:
                firty > 10.8:
                  score = 20
                break;
              case grade <= 1 ? firty > 10.7:
                firty > 10.6:
                  score = 30
                break;
              case grade <= 1 ? firty > 10.5:
                firty > 10.4:
                  score = 40
                break;
              case grade <= 1 ? firty > 10.3:
                firty > 10.2:
                  score = 50
                break;
              case grade <= 1 ? firty > 10.1:
                firty > 10:
                  score = 60
                break;
              case grade <= 1 ? firty > 9.9:
                firty > 9.8:
                  score = 62
                break;
              case grade <= 1 ? firty > 9.7:
                firty > 9.6:
                  score = 64
                break;
              case grade <= 1 ? firty > 9.5:
                firty > 9.4:
                  score = 66
                break;
              case grade <= 1 ? firty > 9.3:
                firty > 9.2:
                  score = 68
                break;
              case grade <= 1 ? firty > 9.1:
                firty > 9:
                  score = 70
                break;
              case grade <= 1 ? firty > 8.9:
                firty > 8.8:
                  score = 72
                break;
              case grade <= 1 ? firty > 8.7:
                firty > 8.6:
                  score = 74
                break;
              case grade <= 1 ? firty > 8.5:
                firty > 8.4:
                  score = 76
                break;
              case grade <= 1 ? firty > 8.3:
                firty > 8.2:
                  score = 78
                break;
              case grade <= 1 ? firty > 8:
                firty > 7.9:
                  score = 80
                break;
              case grade <= 1 ? firty > 7.7:
                firty > 7.6:
                  score = 85
                break;
              case grade <= 1 ? firty > 7.6:
                firty > 7.5:
                  score = 90
                break;
              case grade <= 1 ? firty > 7.5:
                firty > 7.4:
                  score = 95
                break;
              default:
                score = 100;
            }
          }
          return score * 0.2
        },
        getKilometer(grade = 0, kilometer) {
          if (kilometer == '') return 0;
          let score = 0;
          switch (true) {
            case grade <= 1 ? kilometer > 372:
              kilometer > 370:
                score = 0
              break;
            case grade <= 1 ? kilometer > 352:
              kilometer > 350:
                score = 10
              break;
            case grade <= 1 ? kilometer > 332:
              kilometer > 330:
                score = 20
              break;
            case grade <= 1 ? kilometer > 312:
              kilometer > 310:
                score = 30
              break;
            case grade <= 1 ? kilometer > 292:
              kilometer > 290:
                score = 40
              break;
            case grade <= 1 ? kilometer > 272:
              kilometer > 270:
                score = 50
              break;
            case grade <= 1 ? kilometer > 267:
              kilometer > 265:
                score = 60
              break;
            case grade <= 1 ? kilometer > 262:
              kilometer > 260:
                score = 62
              break;
            case grade <= 1 ? kilometer > 257:
              kilometer > 255:
                score = 64
              break;
            case grade <= 1 ? kilometer > 252:
              kilometer > 250:
                score = 66
              break;
            case grade <= 1 ? kilometer > 247:
              kilometer > 245:
                score = 68
              break;
            case grade <= 1 ? kilometer > 242:
              kilometer > 240:
                score = 70
              break;
            case grade <= 1 ? kilometer > 237:
              kilometer > 235:
                score = 72
              break;
            case grade <= 1 ? kilometer > 232:
              kilometer > 230:
                score = 74
              break;
            case grade <= 1 ? kilometer > 227:
              kilometer > 225:
                score = 76
              break;
            case grade <= 1 ? kilometer > 222:
              kilometer > 220:
                score = 78
              break;
            case grade <= 1 ? kilometer > 214:
              kilometer > 212:
                score = 80
              break;
            case grade <= 1 ? kilometer > 207:
              kilometer > 205:
                score = 85
              break;
            case grade <= 1 ? kilometer > 202:
              kilometer > 200:
                score = 90
              break;
            case grade <= 1 ? kilometer > 197:
              kilometer > 195:
                score = 95
              break;
            default:
              score = 100;
          }
          return score * 0.2
        },
        getPullUp(grade = 0, pullUp) {
          if (pullUp == '') return 0;
          let score = 0
          switch (true) {
            case grade <= 1 ? pullUp < 5:
              pullUp < 6:
                score = 0
              break;
            case grade <= 1 ? pullUp < 6:
              pullUp < 7:
                score = 10
              break;
            case grade <= 1 ? pullUp < 7:
              pullUp < 8:
                score = 20
              break;
            case grade <= 1 ? pullUp < 8:
              pullUp < 9:
                score = 30
              break;
            case grade <= 1 ? pullUp < 9:
              pullUp < 10:
                score = 40
              break;
            case grade <= 1 ? pullUp < 10:
              pullUp < 11:
                score = 50
              break;
            case grade <= 1 ? pullUp < 11:
              pullUp < 12:
                score = 60
              break;
            case grade <= 1 ? pullUp < 12:
              pullUp < 13:
                score = 64
              break;

            case grade <= 1 ? pullUp < 13:
              pullUp < 14:
                score = 68
              break;
            case grade <= 1 ? pullUp < 14:
              pullUp < 15:
                score = 72
              break;
            case grade <= 1 ? pullUp < 15:
              pullUp < 16:
                score = 76
              break;
            case grade <= 1 ? pullUp < 16:
              pullUp < 17:
                score = 80
              break;
            case grade <= 1 ? pullUp < 17:
              pullUp < 18:
                score = 85
              break;
            case grade <= 1 ? pullUp < 18:
              pullUp < 19:
                score = 90
              break;
            case grade <= 1 ? pullUp < 19:
              pullUp < 20:
                score = 95
              break;
            default:
              score = 100;
          }
          return score * 0.1
        },
        getEightHundred(grade = 0, eightHundred) {
          if (eightHundred == '') return 0
          let score = 0;
          switch (true) {
            case grade <= 1 ? eightHundred > 324:
              eightHundred > 322:
                score = 0
              break;
            case grade <= 1 ? eightHundred > 314:
              eightHundred > 312:
                score = 10
              break;
            case grade <= 1 ? eightHundred > 304:
              eightHundred > 302:
                score = 20
              break;
            case grade <= 1 ? eightHundred > 294:
              eightHundred > 292:
                score = 30
              break;
            case grade <= 1 ? eightHundred > 284:
              eightHundred > 282:
                score = 40
              break;
            case grade <= 1 ? eightHundred > 274:
              eightHundred > 272:
                score = 50
              break;
            case grade <= 1 ? eightHundred > 269:
              eightHundred > 267:
                score = 60
              break;
            case grade <= 1 ? eightHundred > 264:
              eightHundred > 262:
                score = 62
              break;
            case grade <= 1 ? eightHundred > 259:
              eightHundred > 257:
                score = 64
              break;
            case grade <= 1 ? eightHundred > 254:
              eightHundred > 252:
                score = 66
              break;
            case grade <= 1 ? eightHundred > 249:
              eightHundred > 247:
                score = 68
              break;
            case grade <= 1 ? eightHundred > 244:
              eightHundred > 242:
                score = 70
              break;
            case grade <= 1 ? eightHundred > 239:
              eightHundred > 237:
                score = 72
              break;
            case grade <= 1 ? eightHundred > 234:
              eightHundred > 232:
                score = 74
              break;
            case grade <= 1 ? eightHundred > 229:
              eightHundred > 227:
                score = 76
              break;
            case grade <= 1 ? eightHundred > 224:
              eightHundred > 222:
                score = 78
              break;
            case grade <= 1 ? eightHundred > 217:
              eightHundred > 215:
                score = 80
              break;
            case grade <= 1 ? eightHundred > 210:
              eightHundred > 208:
                score = 85
              break;
            case grade <= 1 ? eightHundred > 204:
              eightHundred > 202:
                score = 90
              break;
            case grade <= 1 ? eightHundred > 198:
              eightHundred > 196:
                score = 95
              break;
            default:
              score = 100;
          }
          return score * 0.2
        },
        getSitUp(grade = 0, sitUp) {
          if (sitUp == '') return 0
          let score = 0
          switch (true) {
            case grade <= 1 ? sitUp < 16:
              sitUp < 17:
                score = 0
              break;
            case grade <= 1 ? sitUp < 18:
              sitUp < 19:
                score = 10
              break;
            case grade <= 1 ? sitUp < 20:
              sitUp < 21:
                score = 20
              break;
            case grade <= 1 ? sitUp < 22:
              sitUp < 23:
                score = 30
              break;
            case grade <= 1 ? sitUp < 24:
              sitUp < 25:
                score = 40
              break;
            case grade <= 1 ? sitUp < 26:
              sitUp < 27:
                score = 50
              break;
            case grade <= 1 ? sitUp < 28:
              sitUp < 29:
                score = 60
              break;
            case grade <= 1 ? sitUp < 30:
              sitUp < 31:
                score = 64
              break;

            case grade <= 1 ? sitUp < 32:
              sitUp < 33:
                score = 68
              break;
            case grade <= 1 ? sitUp < 34:
              sitUp < 35:
                score = 72
              break;
            case grade <= 1 ? sitUp < 36:
              sitUp < 37:
                score = 76
              break;
            case grade <= 1 ? sitUp < 38:
              sitUp < 39:
                score = 80
              break;
            case grade <= 1 ? sitUp < 40:
              sitUp < 41:
                score = 85
              break;
            case grade <= 1 ? sitUp < 42:
              sitUp < 43:
                score = 90
              break;
            case grade <= 1 ? sitUp < 44:
              sitUp < 45:
                score = 95
              break;
            default:
              score = 100;
          }
          return score * 0.1
        },
        getBodyIndexScore(gender = 0, bodyIndex) {
          if (bodyIndex == '') return ['低体重', 0];
          let score = 0;
          let status = '低体重';
          switch (true) {
            case bodyIndex >= 28:
              score = 60, status = '肥胖';
              break;
            case bodyIndex >= 24:
              score = 80, status = "超重";
              break;
            case gender === 0 ? bodyIndex >= 17.9:
              bodyIndex >= 17.2:
                score = 100, status = "正常";
              break;
            default:
              score = 80, status = "低体重";
              break;
          }
          return [status, score * 0.15]
        },
        getStatus(score) {
          let status = '不及格';
          switch (true) {
            case score < 60:
              status = '不及格';
              break;
            case score < 79.9:
              status = "及格";
              break;
            case score < 89.9:
              status = "良好";
              break
            default:
              status = "优秀";
              break;
          }
          return status;
        }
      },
      height: '',
      weight: '',
      vitalCapacity: '', // 肺活量
      sitAneReach: '', // 坐位体前屈
      standingBroadJump: '', // 立定跳远
      firty: '', // 50米
      kilometer: '', //一千米
      pullUp: '', // 引体向上
      eightHundred: '',
      sitUp: '',
      computedScore(data, gender, grade) {
        let {
          height,
          weight,
          vitalCapacity,
          sitAneReach,
          standingBroadJump,
          firty,
          kilometer,
          pullUp,
          eightHundred,
          sitUp,
          getGrade
        } = data;

        let bodyIndex = getGrade.getBodyIndex(weight, height);

        const [statusBodyIndex, bodyIndexScore] = getGrade.getBodyIndexScore(gender, bodyIndex)

        let totalScore = bodyIndexScore + getGrade.getVitalCapacity(gender, grade, vitalCapacity) + getGrade.getSitAneReach(gender, grade, sitAneReach) + getGrade.getStandingBroadJump(gender, grade, standingBroadJump) + getGrade.getFirty(gender, grade, firty);

        if (gender === 0) {
          totalScore += (getGrade.getKilometer(grade, kilometer) + getGrade.getPullUp(grade, pullUp))
        }
        if (gender === 1) {
          totalScore += (getGrade.getEightHundred(grade, eightHundred) + getGrade.getSitUp(grade, sitUp))
        }

        totalScore = totalScore.toFixed(1)

        this.setData({
          ['status.bodyIndex']: statusBodyIndex,
          ['status.score']: getGrade.getStatus(totalScore),
          bodyIndex,
          totalScore
        })
      },
      render(data, isReset) {
        let {
          height,
          weight,
          vitalCapacity, // 肺活量
          sitAneReach, // 坐位体前屈
          standingBroadJump, // 立定跳远
          firty, // 50米
          kilometer, //一千米
          pullUp, // 引体向上
          eightHundred,
          sitUp
        } = data;
        if (isReset) {
          this.setData({
            bodyIndex: 0,
            totalScore: '0.0',
            ['status.bodyIndex']: '低体重',
            ['status.score']: '不及格'
          })
        }
        this.setData({
          height,
          weight,
          vitalCapacity, // 肺活量
          sitAneReach, // 坐位体前屈
          standingBroadJump, // 立定跳远
          firty, // 50米
          kilometer, //一千米
          pullUp, // 引体向上
          eightHundred,
          sitUp,
        })
      }
    }
  },

  onReady: function () {

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})