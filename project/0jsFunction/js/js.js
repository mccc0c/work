$(function() {
	$('.tab').tab({
		event: 'click',
		auto: false,
		before: function() {
			console.log('before');
		},
		after: function() {
			console.log('after');
		}
	});
	$('.slide123').slide123();


	$('.fixmenu').fixmenu();
	$('.accordion').accordion({
		event: 'click'
	});
	$('.dropdown').dropdown();
	$('.scrollone').scrollone();
	$('.sidemenu').sidemenu();
	$('.textleft span').wordsleft({
		textarea: '.myform textarea'
	});
	$('.scrollline').scrollline();

	$('.dopen').modal({
		dialog: '.dialog',
		//auto: true
	});
	$('.slider').slider();
	$('.inout').inout();
	$('.delayshow').delayshow();
	$('#btnShow').tip({
		target: '#divTop'
	});
	/*goods_slide();
	productScan();
	$(".jqzoom").jqueryzoom({
		xzoom: 365,
		yzoom: 365,
		offset: 10,
		position: "right",
		preload: 1,
		lens: 1
	});*/
	$('.scrollbar').scrollbar();
	/*$(document).waterfall({
		callback: function() {
			$('body').append('<p>waterfall<br>waterfall<br>waterfall<br>waterfall<br>waterfall<br>waterfall<br>waterfall<br>waterfall<br>waterfall<br>waterfall<br>waterfall<br>waterfall<br>waterfall<br>waterfall<br>waterfall<br>waterfall<br>waterfall<br>waterfall<br>waterfall<br></p>');
		}
	});*/

	if (/Android|Windows Phone|webOS|iPhone|iPod|BlackBerry|iPad|Opera/i.test(navigator.userAgent)) {
		$('*').css('cursor', 'pointer');
	};

	$('#canvas').scratch({
		image: "images/scratch02.jpg", //false 灰色背景
		percent: 0.85,
		radius: 30
	});
	$(window).shake({
		threshold: 1500,
		waiting: 1500,
		timeout: 2000,
		music: 'images/shake.mp3',
		shaked: function() {
			$('body').append('shaked<br>');
		}
	});
});