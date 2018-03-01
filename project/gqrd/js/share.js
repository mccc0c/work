var jsApiList = [
    'checkJsApi',
    'onMenuShareTimeline',
    'onMenuShareAppMessage',
    'onMenuShareQQ',
    'onMenuShareWeibo',
    'onMenuShareQZone',
    //'hideMenuItems',
    //'showMenuItems',
    //'hideAllNonBaseMenuItem',
    //'showAllNonBaseMenuItem',
    //'translateVoice',
    //'startRecord',
    //'stopRecord',
    //'onVoiceRecordEnd',
    //'playVoice',
    //'onVoicePlayEnd',
    //'pauseVoice',
    //'stopVoice',
    //'uploadVoice',
    //'downloadVoice',
    //'chooseImage',
    //'previewImage',
    //'uploadImage',
    //'downloadImage',
    //'getNetworkType',
    //'openLocation',
    //'getLocation',
    //'hideOptionMenu',
    //'showOptionMenu',
    //'closeWindow',
    //'scanQRCode',
    //'chooseWXPay',
    //'openProductSpecificView',
    //'addCard',
    //'chooseCard',
    //'openCard'
];
wx.config({
    debug: false,
    appId: appId,
    timestamp: timestamp,
    nonceStr: nonceStr,
    signature: signature,
    jsApiList: jsApiList
});
wx.ready(function () {
    wx.checkJsApi({
        jsApiList: jsApiList
    });
    //分享给微信好友
    wx.onMenuShareAppMessage({
        title: shareTitle,
        desc: shareDesc,
        link: shareLink,
        imgUrl: shareImgUrl,
        trigger: function (res) {
            //alert('用户点击发送给朋友');
        },
        success: function (res) {
            alert('已分享');
        },
        cancel: function (res) {
            alert('已取消');
        },
        fail: function (res) {
            alert(JSON.stringify(res));
        }
    });
    //分享到朋友圈
    wx.onMenuShareTimeline({
        title: shareTimeLine,
        link: shareLink,
        imgUrl: shareImgUrl,
        trigger: function (res) {
            //alert('用户点击分享到朋友圈');
        },
        success: function (res) {
            //alert('已分享');
        },
        cancel: function (res) {
            //alert('已取消');
        },
        fail: function (res) {
            alert(JSON.stringify(res));
        }
    });
    //分享到QQ
    wx.onMenuShareQQ({
        title: shareTitle,
        desc: shareDesc,
        link: shareLink,
        imgUrl: shareImgUrl,
        trigger: function (res) {
            //alert('用户点击分享到QQ');
        },
        complete: function (res) {
            //alert(JSON.stringify(res));
        },
        success: function (res) {
            //alert('已分享');
        },
        cancel: function (res) {
            //alert('已取消');
        },
        fail: function (res) {
            alert(JSON.stringify(res));
        }
    });
    //分享到QZone
    wx.onMenuShareQZone({
        title: shareTitle,
        desc: shareDesc,
        link: shareLink,
        imgUrl: shareImgUrl,
        trigger: function (res) {
            //alert('用户点击分享到QZone');
        },
        complete: function (res) {
            //alert(JSON.stringify(res));
        },
        success: function (res) {
            //alert('已分享');
        },
        cancel: function (res) {
            //alert('已取消');
        },
        fail: function (res) {
            alert(JSON.stringify(res));
        }
    });
});
wx.error(function (res) {
    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
    //alert(JSON.stringify(res));
});