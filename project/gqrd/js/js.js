if (/Android|Windows Phone|webOS|iPhone|iPod|BlackBerry|iPad|Opera/i.test(navigator.userAgent)) {
	$('*').css('cursor', 'pointer');
};
if (/Android/i.test(navigator.userAgent)) {
	$('body').addClass('android');
};
if (typeof console == "undefined" || typeof console.log == "undefined") var console = {
	log: function() {}
};
var w0 = $(window).width();
var h0 = $(window).height();
$(window).resize(function() {
	if ($(window).height() < h0 * 0.9) {
		$('body').addClass('keyup');
	} else {
		$('body').removeClass('keyup');
	}
});
$(function() {

	if (/Android|Windows Phone|webOS|iPhone|iPod|BlackBerry|iPad|Opera/i.test(navigator.userAgent)) {
		$('*').css('cursor', 'pointer');
	};
	var shareInfo = {
		title: '2018高企申报尊享服务3+3', // 分享标题
		/* link : window.location.href.replace('&source=APP', ''), // 分享链接 */
		imgUrl: 'http://market.easyrong.com/images/share.png',
		desc: '享3年免费政策咨询服务，享任意3项政府申报服务费9折', // 分享描述
		trigger: function(res) {},
		success: function(res) {},
		cancel: function(res) {},
		fail: function(res) {
			alert(JSON.stringify(res));
		}
	};
	$(function() {
		wxShare(shareInfo, false);
	});
	// 添加流量热点统计
	$('.traffic').on('click', function() {
		var tapId = $(this).attr("id");
		var category = "高企认定";
		var action = 'click';
		var label;
		var value = '';
		var nodeid = '';
		switch (tapId) {
			case 'tr1':
				label = "一测便知";
				break;
			case 'tr2':
				label = "在线咨询";
				break;
		}
		_czc.push(['_trackEvent', category, action, label, value, '']);
	})
/*1,上海
2,舟山
3,嘉兴
4,湖州
5,无锡
6,温州
7,武汉
8,常州
9,南昌
10,张家港
11,南京
12,合肥
13,长沙
14,杭州
15,广州
16,成都
17,北京
18,台州
19,青岛
20,绍兴
21,北美
22,宁波*/
});
