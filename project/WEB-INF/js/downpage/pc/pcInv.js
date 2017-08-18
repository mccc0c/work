$(function() {
	$('#btn1').hover(function() {
		if (!$(this).hasClass('btntop'))
			$(this).addClass('ht0');
	}, function() {
		$(this).removeClass('ht0');
	});

	$('#btn1').click(function() {
		$(this).removeClass('ht0');
		$(this).removeClass('normal');
		$(this).addClass('btntop');
		$('#btn2').removeClass('btntop2');
		$('#btn2').removeClass('ht1');
		$('#btn2').addClass('normal');
	});

	$('#btn2').hover(function() {
		if (!$(this).hasClass('btntop2'))
			$(this).addClass('ht1');
	}, function() {
		$(this).removeClass('ht1');
	});

	$('#btn2').click(function() {
		$(this).removeClass('ht1');
		$(this).removeClass('normal');
		$(this).addClass('btntop2');

		$('#btn1').removeClass('btntop');
		$('#btn1').removeClass('ht0');
		$('#btn1').addClass('normal');
	});

	$('#anniu1').hover(
			function() {

				$(this).children().attr('src',
						domainBasePath + 'images/downpage/pc/anniu_tzr3.png');
			},
			function() {
				$(this).children().attr('src',
						domainBasePath + 'images/downpage/pc/anniu_tzr1.png');
			});

	$('#anniu2').hover(
			function() {
				$(this).children().attr('src',
						domainBasePath + 'images/downpage/pc/anniu_tzr4.png');
			},
			function() {
				$(this).children().attr('src',
						domainBasePath + 'images/downpage/pc/anniu_tzr2.png');
			});

	$('.pagescroll').fullpage({
		'verticalCentered' : false,
		'css3' : true,
		'sectionsColor' : [ '#ffc125', '#fff', '#f4ffe8', '#f4ffe8' ],
		anchors : [ '1', '2', '3', '4', '5' ],
		'navigation' : true,
		'navigationPosition' : 'right',
		'navigationTooltips' : [ '1', '2', '3', '4', '5' ],
		'scrollOverflow' : false,

		paddingTop : 0,
		paddingBottom : 0,
		// navigation: true,

		afterLoad : function(anchorLink, index) {
			$('.pagescroll-hd').slideUp('slow');
			if (index == 1) {
				$('.pagescroll-hd').slideDown('slow');

			}
			if (index == 2) {
				$('.s2txtCont').animate({
					left : '0',
					opacity : 1
				}, 500, 'linear');

				var animateList = [ function() {
					$('.s2weixin').find('img').stop(true).animate({
						width : '67',
						height : '67',
						left : '0'
					}, 400, 'easeOutBack', queueList).andSelf();
				}, function() {
					$('.s2line').find('img').stop(true).animate({
						width : '56',
						height : '56',
						left : '0'
					}, 400, 'easeOutBack', queueList).andSelf();
				}, function() {
					$('.s2map').find('img').stop(true).animate({
						width : '100',
						height : '100',
						left : '0'
					}, 400, 'easeOutBack', queueList).andSelf();
				}, function() {
					$('.s2zb1').find('img').stop(true).animate({
						width : '100',
						height : '100',
						left : '0'
					}, 400, 'easeOutBack', queueList).andSelf();
				}, function() {
					$('.s2zb2').find('img').stop(true).animate({
						width : '74',
						height : '74',
						left : '0'
					}, 400, 'easeOutBack', queueList).andSelf();
				}, function() {
					$('.s2zb3').find('img').stop(true).animate({
						width : '109',
						height : '109',
						left : '0'
					}, 400, 'easeOutBack', queueList).andSelf();
				} ];

				$(document).queue('_queueList', animateList);
				var queueList = function() {
					$(document).dequeue('_queueList');
				};
				queueList();
			}
			if (index == 3) {

				var animateList = [ function() {
					$('.superman').animate({
						left : '160',
						opacity : 1
					}, 1000, 'linear', queueList);
				}, function() {
					$('.s3xdt').animate({
						left : '100',
						opacity : 1
					}, 1000, 'linear', queueList);
				}, function() {
					$('.s3yuek').animate({
						left : '500',
						opacity : 1
					}, 1000, 'linear', queueList);
				}, function() {
					$('.s3txtCont').animate({
						left : '800',
						opacity : 1
					}, 500, queueList);
				} ];

				$(document).queue('_queueList', animateList);
				var queueList = function() {
					$(document).dequeue('_queueList');
				};
				queueList();
			}
			if (index == 4) {
				// s6light
				$('.s6txtCont').animate({
					left : '0',
					opacity : 1
				}, 500);
				$('.s6apple').animate({
					left : '0'
				}, 500);
				// $('.s6man').animate({ left: '400', opacity: 1 }, 1000,
				// 'linear');
				// $('.s6gui').animate({ left: '700', opacity: 1 }, 1000,
				// 'linear');
				// $('.s6light').animate({ left: '720', opacity: 1 }, 1000,
				// 'linear');

				var animateList = [ function() {
					$('.s6man').animate({
						left : '400',
						opacity : 1
					}, 1000, 'linear', queueList);
				}, function() {
					$('.s6gui').animate({
						left : '700',
						opacity : 1
					}, 1000, 'linear', queueList);
				}, function() {
					$('.s6light').animate({
						left : '720',
						opacity : 1
					}, 1000, 'linear', queueList);
				}, function() {
					$('.dot1').animate({
						opacity : '0.15'
					}, 400, 'linear', queueList).show();
				}, function() {
					$('.dot2').animate({
						opacity : '0.3'
					}, 400, 'linear', queueList).show();
				}, function() {
					$('.dot3').animate({
						opacity : '0.45'
					}, 400, 'linear', queueList).show();
				}, function() {
					$('.dot4').animate({
						opacity : '0.6'
					}, 400, 'linear', queueList).show();
				}, function() {
					$('.dot5').animate({
						opacity : '0.75'
					}, 400, 'linear', queueList).show();
				}, function() {
					$('.dot6').animate({
						opacity : '0.9'
					}, 400, 'linear', queueList).show();
				}, function() {
					$('.dot7').animate({
						opacity : '1'
					}, 400, 'linear', queueList).show();
				} ];

				$(document).queue('_queueList', animateList);
				var queueList = function() {
					$(document).dequeue('_queueList');
				};
				queueList();
			}
		},
		onLeave : function(index, direction) {
			if (index == 2) {
				$('.s2txtCont').animate({
					left : '-200',
					opacity : 0
				}, 1000, 'linear');

				var animateList = [

				function() {
					$('.s2weixin').find('img').stop(true).animate({
						width : '0',
						height : '0',
						left : '0'
					}, 400, 'easeOutBack', queueList).andSelf();
				}, function() {
					$('.s2line').find('img').stop(true).animate({
						width : '0',
						height : '0',
						left : '0'
					}, 400, 'easeOutBack', queueList).andSelf();
				}, function() {
					$('.s2map').find('img').stop(true).animate({
						width : '0',
						height : '0',
						left : '0'
					}, 400, 'easeOutBack', queueList).andSelf();
				}, function() {
					$('.s2zb1').find('img').stop(true).animate({
						width : '0',
						height : '0',
						left : '0'
					}, 400, 'easeOutBack', queueList).andSelf();
				}, function() {
					$('.s2zb2').find('img').stop(true).animate({
						width : '0',
						height : '0',
						left : '0'
					}, 400, 'easeOutBack', queueList).andSelf();
				}, function() {
					$('.s2zb3').find('img').stop(true).animate({
						width : '0',
						height : '0',
						left : '0'
					}, 400, 'easeOutBack', queueList).andSelf();
				} ];

				$(document).queue('_queueList', animateList);
				var queueList = function() {
					$(document).dequeue('_queueList');
				};
				queueList();
			}
			if (index == 3) {

				var animateList = [ function() {
					$('.superman').animate({
						left : '0',
						opacity : 0
					}, 1000, 'linear', queueList);
				}, function() {
					$('.s3xdt').animate({
						left : '0',
						opacity : 0
					}, 1000, 'linear', queueList);
				}, function() {
					$('.s3yuek').animate({
						left : '700',
						opacity : 0
					}, 1000, 'linear', queueList);
				}, function() {
					$('.s3txtCont').animate({
						left : '1000',
						opacity : 0
					}, 500, 'linear', queueList);
				} ];

				$(document).queue('_queueList', animateList);
				var queueList = function() {
					$(document).dequeue('_queueList');
				};
				queueList();
			}
			if (index == 4) {
				// $('.s10').animate({ left: '0', opacity: 1 }, 1000, 'linear');
				$('.s6txtCont').animate({
					left : '-200',
					opacity : 0
				}, 500);
				$('.s6apple').animate({
					left : '-200'
				}, 500);

				// $('.s6man').animate({ left: '600', opacity: 0 }, 1000,
				// 'linear');
				// $('.s6gui').animate({ left: '900', opacity: 0 }, 1000,
				// 'linear');
				// $('.s6light').animate({ left: '920', opacity: 0 }, 1000,
				// 'linear');

				var animateList = [ function() {
					$('.s6man').animate({
						left : '600',
						opacity : 0
					}, 1000, 'linear', queueList);
				}, function() {
					$('.s6gui').animate({
						left : '900',
						opacity : 0
					}, 1000, 'linear', queueList);
				}, function() {
					$('.s6light').animate({
						left : '920',
						opacity : 0
					}, 1000, 'linear', queueList);
				},

				function() {
					$('.dot1').animate({
						opacity : '0'
					}, 400, 'linear', queueList).hide();
				}, function() {
					$('.dot2').animate({
						opacity : '0'
					}, 400, 'linear', queueList).hide();
				}, function() {
					$('.dot3').animate({
						opacity : '0'
					}, 400, 'linear', queueList).hide();
				}, function() {
					$('.dot4').animate({
						opacity : '0'
					}, 400, 'linear', queueList).hide();
				}, function() {
					$('.dot5').animate({
						opacity : '0'
					}, 400, 'linear', queueList).hide();
				}, function() {
					$('.dot6').animate({
						opacity : '0'
					}, 400, 'linear', queueList).hide();
				}, function() {
					$('.dot7').animate({
						opacity : '0'
					}, 400, 'linear', queueList).show();
				} ];

				$(document).queue('_queueList', animateList);
				var queueList = function() {
					$(document).dequeue('_queueList');
				};
				queueList();
			}
		}
	}

	);
});