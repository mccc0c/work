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
	/*function imgLoder(imgs, callback) {
		var loadedCount = 0;
		$.each(imgs, function(index, val) {
			var img = new Image();
			img.src = val;
			img.onload = function() {
				loadedCount++;
				if (loadedCount == imgs.length) {
					callback();
				}
			};
		})
	};
	imgLoder([
		'http://mat1.gtimg.com/sh/20150123/bg01.jpg',
		'http://mat1.gtimg.com/sh/20150123/t1.png',
		'http://mat1.gtimg.com/sh/20150123/t2.png'
	], function() {
		$('#loading').remove();
		$('.page0').addClass('on');
	});

		var replay=localStorage.getItem('replay');
	if(replay!==null){
		$('#loading').remove();
		$('.page1').hide();
		$('.game').show();		
		$('.page0').addClass('on');
		localStorage.clear();
	}
	//背景固定
	document.addEventListener("touchmove", function(evt) {
	evt.preventDefault();
	}, false);
	$('.dialog').on('touchmove', function(evt) {
		evt.stopPropagation();
	});
*/
	function addMusic(music) {
		var m = '<audio src="../images/' + music + '"></audio><div class="play"></div>'
		$('body').append(m);
		$('audio')[0].play();
		$(document).on('click', '.play', function() {
			if (!$(this).is('.off')) {
				$(this).addClass('off');
				$('audio')[0].pause();
			} else {
				$(this).removeClass('off');
				$('audio')[0].play();
			}
		})
	};

	if (/Android|Windows Phone|webOS|iPhone|iPod|BlackBerry|iPad|Opera/i.test(navigator.userAgent)) {
		$('*').css('cursor', 'pointer');
	};
	var loaded = localStorage.getItem('loaded');
	if (loaded) {
		loading();
	} else {
		var load = '<div class="loading_box"><div class="l1"><img src="http://mat1.gtimg.com/sh/00img/loading01.png" width="100%"></div><div class="l2"><img src="http://mat1.gtimg.com/sh/00img/loading02.png" width="100%"></div><div class="loading_text"> <img src="http://mat1.gtimg.com/sh/00img/loading_text.png" width="100%"></div><div class="loading_logo"> <img src="http://mat1.gtimg.com/sh/00img/dashenlogo_02.png" width="100%"></div></div>';
		$('#loading01').append(load);
		setTimeout(function() {
			loading();
		}, 2000);
	};

	function preventTouch(e) {
		e.preventDefault();
	};

	function loading() {
		$('#loading01').remove();
		$('.p0').addClass('on');
		document.removeEventListener('touchmove', preventTouch, false);
		localStorage.setItem('loaded', 1);
	};
	var mySwiper = new Swiper('.swiper-container', {
		direction: 'vertical',
		noSwiping: true,
		noSwipingClass: 'noswipe',
		onSlideChangeStart: function() {
			var a = mySwiper.activeIndex;
		}
	});
	//mySwiper.slideTo(1, 0, false);
	$(document).click(function() {
		$('.pop, .popbg').hide();
	});
	$(document).on('click', '.close', function() {
		return false;
	});

});
var appId = 'wx468f4e63c041af03';
var timestamp = '1493170596';
var nonceStr = 'fVydi4YIPaM4rXYZ';
var signature = 'bb252b0886fe3043dae82829ac3aa877cad9e890';
//分享标题
var shareTitle = '2017年政策红利大派送';
//分享的内容
var shareDesc = '2017年500亿政策红利大派送 快来测一测 我能拿多少';
//分享的连接地址
var shareLink = 'http://ent.h5.easyrong.com:80/fund/load?source=huodong';
//分享的图片地址
var shareImgUrl = 'http://ent.h5.easyrong.com:80/static/images/new/WX_pic2.png';
//朋友圈分享内容
var shareTimeLine = '500亿政策红利近在眼前，算一算能拿的还不少！';