function initPos() {
	$('.s10').animate({
		left : '0',
		opacity : 1
	}, 1000, 'linear');
	$('.s11').animate({
		left : '100',
		opacity : 1
	}, 1000, 'linear');
	$('.s12').animate({
		left : '200',
		opacity : 1
	}, 1000, 'linear');
}

function callchart(callback) {
	callback();
}

function chart1() {

	$('.s3chart1').typer();
	// $('.s3chart1').stop(false, false);
	setTimeout(chart2, 2000);
}

function chart2() {
	$('.s3chart2').typer();
}

$(function() {
	initPos();

	//
	// $('#s3chart1').Typer('hi跟我说说你们的商业模式吧aa');

	// $('#s3chart2').Typer('先免费后收费再痛宰一顿');
	// textticker();

	//
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
						domainBasePath + 'images/downpage/pc/anniu_09.png');
			},
			function() {
				$(this).children().attr('src',
						domainBasePath + 'images/downpage/pc/anniu_03.png');
			});

	$('#anniu2').hover(
			function() {
				$(this).children().attr('src',
						domainBasePath + 'images/downpage/pc/anniu_10.png');
			},
			function() {
				$(this).children().attr('src',
						domainBasePath + 'images/downpage/pc/anniu_05.png');
			});
	$('.pagescroll').fullpage({
		'verticalCentered' : false,
		'css3' : true,
		'sectionsColor' : [ '#fff', '#fff', '#f4ffe8', '#f4ffe8' ],
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
				$('.s10').animate({
					left : '0',
					opacity : 1
				}, 1000, 'linear');
				$('.s11').animate({
					left : '100',
					opacity : 1
				}, 1000, 'linear');
				$('.s12').animate({
					left : '200',
					opacity : 1
				}, 1000, 'linear');
			}
			if (index == 2) {

				var animateList = [ function() {
					$('.s2map').animate({
						opacity : 1
					}, 1000, queueList);
				}, function() {
					$('.s2zb1').animate({
						top : '400',
						opacity : 1
					}, 500, queueList);
				}, function() {
					$('.s2ren').animate({
						top : '320',
						opacity : 1
					}, 500, queueList);
				}, function() {
					$('.s2zb2').animate({
						top : '440',
						opacity : 1
					}, 500, queueList);
				}, function() {
					$('.s2zb3').animate({
						top : '500',
						opacity : 1
					}, 500, queueList);
				}, function() {
					$('.s2txtCont').animate({
						left : '600',
						opacity : 1
					}, 500, queueList);
				} ];

				$(document).queue('_queueList', animateList);
				var queueList = function() {
					$(document).dequeue('_queueList');
				};
				queueList();

			}
			if (index == 3) {
				// $('.s3txtCont').addClass('animated fadeInLeft');
				$('.s3txtCont').animate({
					left : '0',
					opacity : 1
				}, 500);
				$('.s3xdt').animate({
					opacity : 1
				}, 1000, 'linear');
				$('.s3yuek').animate({
					top : '120',
					opacity : 1
				}, 1000, 'linear');
				$('.s3huida').animate({
					top : '520',
					opacity : 1
				}, 1000, 'linear');
				chart1();

				var animateList = [ function() {
					$('.s3panzi').animate({
						opacity : 1
					}, 500, 'linear', queueList);
				}, function() {
					$('.s3kafei').animate({
						opacity : 1
					}, 5000, 'linear', queueList);
				} ];

				$(document).queue('_queueList', animateList);
				var queueList = function() {
					$(document).dequeue('_queueList');
				};
				queueList();
			}
			if (index == 4) {

				$('.s4computer').animate({
					left : '40',
					opacity : 1
				}, 1000, 'linear');
				$('.s4huojian').animate({
					opacity : 1
				}, 1000, 'linear');
				$('.s4apple').animate({
					left : '280',
					opacity : 1
				}, 1000, 'linear');
				$('.s4caihong').animate({
					opacity : 1
				}, 1000, 'linear');
				$('.s4txtCont').animate({
					left : '630',
					opacity : 1
				}, 500);
			}
		},
		onLeave : function(index, direction) {
			if (index == 1) {
				$('.s10').animate({
					left : '-100',
					opacity : 1
				}, 1000, 'linear');
				$('.s11').animate({
					left : '-100',
					opacity : 1
				}, 1000, 'linear');
				$('.s12').animate({
					left : '400',
					opacity : 1
				}, 1000, 'linear');
			}
			if (index == 2) {
				var animateList = [ function() {
					$('.s2map').animate({
						opacity : 0
					}, 1000, queueList);
				}, function() {
					$('.s2zb1').animate({
						top : '100',
						opacity : 0
					}, 500, queueList);
				}, function() {
					$('.s2ren').animate({
						top : '100',
						opacity : 0
					}, 500, queueList);
				}, function() {
					$('.s2zb2').animate({
						top : '100',
						opacity : 0
					}, 500, queueList);
				}, function() {
					$('.s2zb3').animate({
						top : '100',
						opacity : 0
					}, 500, queueList);
				}, function() {
					$('.s2txtCont').animate({
						left : '1000',
						opacity : 0
					}, 500, queueList);
				} ];

				$(document).queue('_queueList', animateList);
				var queueList = function() {
					$(document).dequeue('_queueList');
				};
				queueList();
			}
			if (index == 3) {
				$('.s3txtCont').animate({
					left : '-200',
					opacity : 0
				}, 500, 'linear');
				// $('.s3txtCont').removeClass('animated fadeInLeft');
				$('.s3panzi').animate({
					opacity : 0
				}, 500, 'linear');
				$('.s3kafei').animate({
					opacity : 0
				}, 2000, 'linear');
				$('.s3xdt').animate({
					opacity : 0
				}, 1000, 'linear');
				$('.s3yuek').animate({
					top : '0',
					opacity : 0
				}, 1000, 'linear');
				$('.s3huida').animate({
					top : '500',
					opacity : 0
				}, 1000, 'linear');

				$('.s3chart1').html('');
				$('.s3chart2').html('');
				chart1();

			}
			if (index == 4) {
				$('.s4computer').animate({
					left : '0',
					opacity : 0
				}, 1000, 'linear');
				$('.s4huojian').animate({
					opacity : 0
				}, 1000, 'linear');
				$('.s4apple').animate({
					left : '400',
					opacity : 0
				}, 1000, 'linear');
				$('.s4caihong').animate({
					opacity : 0
				}, 1000, 'linear');
				$('.s4txtCont').animate({
					left : '830',
					opacity : 0
				}, 500, 'linear');
			}
		}
	});
});