import {
  getStorage,
  showToast,
  throttle,
  uploadByQiNiu,
  YOUTH_LENRN_PIC,
  STUDYINFO,
  getAction,
  showLoading,
  hideLoading,
  postAction,
  setStorage,
  back,
  getStudentInfo
} from "../../utils/index.js";

export const handleSubmitDebouce = throttle(async function () {
  const stuFaceIndex = this.data.select;
  let imageBox = this.data.imageBox;
  if (!imageBox.length) {
    return showToast({
      title: '图片不能为空！',
      icon: 'error'
    })
  }
  // 发送图片到七牛云
  try {
    const {
      department,
      classNo,
      name,
      id
    } = this.studentInfo;
    let oldPath = '';
    if (this.isUpdate) {
      // 处理上传图片
      let [old, newBox] = handleUpdateImage(this.oldPath, imageBox);
      imageBox = newBox;
      oldPath = old;
    }
    let picPath = ''
    if (imageBox.length > 0) {
      picPath = (await uploadByQiNiu(imageBox, YOUTH_LENRN_PIC(this.periodId, department, classNo)));
    }

    let uploadPath = ''
    if (oldPath && picPath) {
      uploadPath = oldPath + ',' + picPath
    } else if (oldPath) {
      uploadPath = oldPath;
    } else {
      uploadPath = picPath
    }
    // 发起请求 
    postAction(this.url, {
      stuName: name,
      stuNumber: id,
      stuFace: stuFaceIndex,
      className: classNo,
      systemName: department,
      infoPic: uploadPath
    }, {
      title: '上传中',
      mask: true
    }).then(res => {
      // 改变上传状态
      this.setData({
        isSubmited: true
      })

      // 保存政治面貌缓存
      setStorage(STUDYINFO, {
        index: stuFaceIndex
      });
      back()
    })


  } catch {}
}, 1500);


export async function getStudyInfo() {
  let select = 0;
  try {
    const {
      index
    } = await getStorage(STUDYINFO);
    select = index;
  } catch {}
  this.setData({
    select: select,
    studentNum: this.studentInfo.id
  })
}

export async function getStudyUploadInfo() {
  showLoading({
    title: '加载中',
    mask: true
  })
  try {
    const res = await getAction('/GreatLearning/getGreatLearningStatus', {
      stuNumber: this.studentInfo.id
    });
    const {
      greatLearningPic,
      periodId
    } = res.data;
    this.periodId = periodId;
    if (greatLearningPic) { // 更新
      this.isUpdate = true;
      this.oldPath = greatLearningPic;
      this.url = '/GreatLearning/update';
    } else {
      this.url = '/GreatLearning/upload';
    }

    this.setData({
      imageBox: greatLearningPic || [],
      isSubmited: greatLearningPic === null ? false : true
    })
    hideLoading();
  } catch {
    hideLoading()
    showToast({
      title: '服务器异常！',
      icon: 'error'
    })
  }
}


function handleUpdateImage(oldImageBox, newImageBox) {
  let oldPath = '',
    newPath = [];
  const len = newImageBox.length;
  for (let i = 0; i < len; i++) {
    const path = newImageBox[i];
    if (oldImageBox.includes(path)) {
      oldPath += `,${path}`;
    } else {
      newPath.push(path)
    }
  }
  oldPath = oldPath.slice(1)
  return [oldPath, newPath]
}


export function init() {
  const {
    classNo
  } = getStudentInfo();
  getAction('/GreatLearning/getClassStuInfos', {
    className: classNo
  }).then(res => {
    // 统计提交人数 sumbitedNum
    let sumbitedNum = 0,
      len = res.data.length,
      list = res.data;
    for (let i = 0; i < len; i++) {
      list[i].status && sumbitedNum++;
    } 
    this.setData({
      list,
      sumbitedNum,
      totalNum: len
    })
  })
}