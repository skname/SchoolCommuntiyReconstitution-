// package/webView/web.js
Page({
    data: {
        src:''
    },
    onLoad: function (options) {
        let {src} = options
        this.setData({
            src
        })
    },
})