import Config from '../config';
let {
    baseUrl
} = Config;
export function req(url, method, data) {
    return new Promise((res, rej) => {
        wx.request({
            url: baseUrl + url,
            method,
            data: data || null,
            timeout: 8000,
            dataType: "json",
            success: data => {
                res(data.data);
            },
            fail: err => {
                rej(err);
            }
        });
    })
}