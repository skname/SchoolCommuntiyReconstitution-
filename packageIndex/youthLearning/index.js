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
  setStorage
} from "../../utils/index.js";

export const handleSubmitDebouce = throttle(async function () {
  const stuFaceIndex = this.data.select;
  const imageBox = this.data.imageBox;
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
    let picPath = await uploadByQiNiu(imageBox, YOUTH_LENRN_PIC(this.periodId, department, classNo));
    // 发起请求
    postAction('/GreatLearning/upload', {
      stuName: name,
      stuNumber: id,
      stuFace: stuFaceIndex,
      className: classNo,
      systemName: department,
      infoPic: picPath
    }, {
      title: '上传中',
      mask: true
    }); // 发送请求

    // 改变上传状态
    this.setData({
      isSubmited: true
    })

    // 保存政治面貌缓存
    setStorage(STUDYINFO, {
      index: stuFaceIndex
    });
  } catch {

  }


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
    this.setData({ 
      imageBox: greatLearningPic || [],
      isSubmited: greatLearningPic === null ? false : true
    })
    hideLoading()
  } catch {
    hideLoading()
    showToast({
      title: '服务器异常！',
      icon: 'error'
    })
  }

}