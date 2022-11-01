import {
  getAction,
  STUDENTCLASS,
  showToast,
  setStorage,
  getStudentClass,
  getStudentInfo,
  ALLCLASSESNAME,
  getAllClassName,
  debounce,
  getOpenId,
  openGuide
}
from '../../utils/index.js'
import {
  Store
} from '../../store/index.js'
let colorList = ["#FFCC99", "#996699", "#99CC66", "#FF6666", "#FF9900", "#009999", "#FFCCCC", '#336699', "#99CC99"]

// 格式化
function handleClass(data) {
  let i = 0;
  const colorMap = new Map();
  return data.map(week => {
    return week.map(day => {
      if (day == 0) return 0
      let obj = {};
      const c = day
      const x = c.split('||');
      obj['teacher'] = x[3];
      obj['class'] = x[2];
      obj['classroom'] = x[1];
      obj['time'] = x[0]
      let color = colorMap.get(x[2]);
      if (!color) {
        color = colorList[i++];
        colorMap.set(x[2], color);
      }
      obj['color'] = color;
      return obj
    })
  })
}
// 初始化
export async function getClass(className, week) {
  const res = await getAction('/ct/className', {
    className,
    weekNum: week
  })
  if (res.code != 200) {
    return showToast({
      title: res.msg,
      icon: 'error'
    })
  }
  const table = handleClass(res.data.table)
  return table
}
// 初始化 
export async function init() {
  let week; // 获取时间
  let ClassInfo = getStudentClass();
  try {
    week = await getWhichWeek()
  } catch {
    week = ClassInfo.oldWeek
  }
  let allClasses = getAllClassName(),
    studentInfo = getStudentInfo();
  this.setData({
    isChecked: Store.status.isOpenClassEmit,
    class: studentInfo.classNo
  })
  // 判断是否有所有班级缓存
  if (!allClasses) {
    allClasses = await getAllClassInfo();
    if (allClasses) setStorage(ALLCLASSESNAME, allClasses)
  }

  // 如果没有缓存或者过期重新拿课表
  if (!ClassInfo || (ClassInfo.oldWeek !== week)) {
    const classTable = await getClass.call(this, getStudentInfo().classNo, week);
    ClassInfo = {
      classTable,
      oldWeek: week
    }
    setStorage(STUDENTCLASS, {
      oldWeek: week,
      classTable
    })
  }
  const {
    classTable,
    oldWeek
  } = ClassInfo;
  render.call(this, classTable, allClasses, oldWeek)
}

function render(table, allClasses, week) {
  this.setData({
    table,
    allClass: [allClasses, allClasses[0].classes],
    week
  })
}

// 获取所有班级
async function getAllClassInfo() {
  const res = await getAction('/ct/dep/classes')
  return handleAllClass(res.data)
}

function handleAllClass(data) {
  let depsList = []
  let len = data.length;
  for (let i = 0; i < len; i++) {
    const dep = data[i];
    const classList = [];
    dep.classes.forEach(item => {
      classList.push({
        name: item.name
      })
    })
    depsList.push({
      name: dep.name,
      classes: classList
    });
  }
  return depsList
}

export async function getWhichWeek() {
  const res = await getAction('/ct/week');
  if (res.code != 200) {
    return showToast({
      title: res.msg,
      icon: 'error'
    })
  }
  return res.data.week
}

export const handleClassEmit = debounce(function () {
  // 发起请求
  let currStatus = this.data.isChecked
  if (Store.status.isOpenClassEmit !== currStatus) {
    getAction('/mp/subscribe/api/set', {
      openId: getOpenId(),
      className: currStatus ? this.data.class : '0',
    }).then(res => {
      Store.commit('SET_CLASS_EMIT', currStatus);
    })
  }
}, 1500)