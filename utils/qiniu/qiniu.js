// 文章图片路径 格式 XXX/XXX/
export const ARTICLE_PIC = generateAritclePictureDir(); // 发表文章文件格式
export const YOUTH_LENRN_PIC = function (id, dep, className) {
  let path = generateYounthPicDir(id, dep, className)
  return path;
}; // 大学习发表格式
import {
  showToast
} from '../message.js';
import {
  getAction
} from '../req.js';
const config = {
  url: 'https://up-z1.qiniup.com', // 华北
  domain: 'https://img.skself.work' // 图片访问域名
};

function getYearAndMonthAndDay() {
  const data = new Date();
  const year = data.getFullYear();
  const month = data.getMonth() + 1;
  const day = data.getDate();
  return year + '/' + month + '/' + day;
}

function generateAritclePictureDir() {
  let path = `article-picture/${getYearAndMonthAndDay()}`;
  return path;
}
// 生成大学习路径
function generateYounthPicDir(id, dep, className) {
  let path = `study-picture/${id}/${dep}/${className}`;
  return path;
}

function generateFileName(fileDir, filePath) {
  return fileDir + filePath.split('tmp')[1];
}
export function qiniuUpload(fileUrl, token, fileName) {
  return new Promise((res, rej) => {
    wx.uploadFile({
      filePath: fileUrl,
      name: 'file',
      url: config.url, // 目标地址
      formData: {
        token,
        key: fileName
      },
      success(data) {
        const {
          key
        } = JSON.parse(data.data);
        res(config.domain + '/' + key)
      },
      fail(err) {
        console.warn('qiniu upLoad error')
        showToast({
          title: '上传失败！'
        })
      }
    })
  })
}
// 获取七牛云上传 token
async function getToken() {
  const {
    data
  } = await getAction('/artpic/getToken');
  return data.token
}
 
export async function uploadByQiNiu(filePaths, FileDir) {
  const token = await getToken()
  const promise = filePaths.map(item => {
    const filePath = generateFileName(FileDir, item)
    console.log(filePath)
    return qiniuUpload(item, token, filePath);
  })
  const result = await Promise.all(promise);
  return result.join(',');
}