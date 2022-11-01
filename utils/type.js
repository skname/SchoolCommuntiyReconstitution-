import {
  getStorageSync
} from './storage.js'
export const STUDENT_GRADE = 'studentGrade';
export const USERINFO = 'userInfo'
export const STUDENTINFO = 'studentInfo';
export const STUDENTCLASS = 'studentClass';
export const ALLCLASSESNAME = 'allClassName';
export const STUDYINFO = 'studyInfo'; // 青年大学习政治面貌
let OPENID = '',
  userInfo = '',
  studentInfo = '',
  studentClass = '',
  studentGrade = '',
  allClassName = '';

export function getAllClassName() {
  return allClassName || (allClassName = (getStorageSync(ALLCLASSESNAME)))
}

export function getOpenId() {
  return OPENID || (OPENID = (getStorageSync(USERINFO) && getStorageSync(USERINFO).openId))
}
export function getUserInfo() {
  return userInfo || (userInfo = getStorageSync(USERINFO));
}
export function getStudentInfo() {
  return studentInfo || (studentInfo = getStorageSync(STUDENTINFO))
}
export function getStudentClass() {
  return studentClass || (studentClass = getStorageSync(STUDENTCLASS))
}
export function getStudentGrade() {
  return studentGrade || (studentGrade = getStorageSync(STUDENT_GRADE))
}


export function clearData() {
  OPENID = '';
  userInfo = '';
  studentInfo = '';
  studentClass = '';
  studentGrade = '';
}

// 判断是否为空
export function isDef(value) {
  return value != '' && value != undefined && value != null && value.length != 0
}