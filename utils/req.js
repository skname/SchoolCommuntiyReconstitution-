import Config from "../config";
import {
  showToast,
  showLoading,
  hideLoading
} from "./message.js";
let {
  baseUrl
} = Config;
// GET 请求
let cookieBase = "";
export function getAction(url, data = null) {
  let str = "";
  if (data) {
    str = "?";
    const keys = Object.keys(data);
    let len = keys.length;
    for (let i = 0; i < len; i++) {
      const key = keys[i];
      str += `${key}=${data[key]}`;
      if (i != len - 1) {
        str += "&";
      }
    }
  }
  return new Promise((res, rej) => {
    wx.request({
      url: url.includes('http') ? `${url}${str}` : `${baseUrl}${url}${str}`,
      timeout: 5000,
      method: "GET",
      dataType: "json",
      header: {
        Cookie: cookieBase && cookieBase,
      },
      success: (data) => {
        cookieBase = "";
        if (data.cookies[0]) {
          cookieBase = data.cookies[0].split(";")[0];
        }
        if (data.data.code && data.data.code != 200) {
          data.data.msg && showToast({
            title: data.data.msg,
            icon: 'error'
          })
        }
        res(data.data);
      },
      fail: (err) => {
        showToast({
          title: "服务器异常!",
          icon: "error",
        });
        rej(err);
      },
    });
  });
}
// POST 请求
export function postAction(
  url,
  data = {},
  loadMessage = {
    title: "加载中...",
    mask: true,
  },
  isShowMessage = true
) {
  loadMessage && showLoading(loadMessage);
  return new Promise((res, rej) => {
    wx.request({
      url: url.includes('http') ? url : `${baseUrl}${url}`,
      method: "POST",
      data,
      dataType: "json",
      timeout: 5000,
      responseType: "text",
      success: (data) => {
        let result = data.data;
        const {
          code,
          msg
        } = result;
        if (code && code != 200) {
          isShowMessage &&
            showToast({
              title: msg || "",
              icon: "error",
            });
        }
        isShowMessage &&
          showToast({
            title: msg || "",
            icon: "success",
          });
        res(result.data || result);
      },
      fail: (err) => {
        showToast({
          title: "服务器异常",
          icon: "error",
        });
        rej(err);
      },
      complete() {
        loadMessage && hideLoading();
      }
    });
  });
}