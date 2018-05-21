$(function() {
	function preventTouch(e) {
		e.preventDefault();
	};
	document.addEventListener('touchmove', preventTouch, false);

	var speed = 0.7; // go speed
	var speed2 = 0.5; // line speed
	var speed3 = 0.8 // y spped

	var w = $(window).width();
	var h = $(window).height();
	var w1 = 0.1 * w;
	var w2 = 0.93 * w;
	var h1 = h * 0.93;
	var goh = 25;
	var gow = 50;
	$('.page, .auto').width(w);
	$('.page').height(h);
	var pxgo = parseInt($("#go").offset().left) - parseInt($("body").offset().left) + goh;

	function l(d) {
		return parseInt($(d).offset().left) - $('body').offset().left;;
	};

	function t(d) {
		return parseInt($(d).offset().top);
	};
	var point = [];
	for (var i = 0; i < $('.point').length; i++) {
		point[i] = [];
		point[i][0] = l('#point' + i);
		point[i][1] = t('#point' + i);
	};
	var start = point[0][1] + goh;
	var svg = [];
	for (var i = 0; i < point.length - 1; i++) {
		$('.svg').append('<svg class="s' + i + '"></svg>');
		svg[i] = Snap('.s' + i).path("M" + point[i][0] + "," + point[i][1] + "l" + (point[i + 1][0] - point[i][0]) + "," + (point[i + 1][1] - point[i][1]) + "");
		var offset = svg[i].getTotalLength();
		svg[i].attr({
			stroke: "#51dbff",
			strokeWidth: 2,
			fill: "none",
			strokeDasharray: offset,
			strokeDashoffset: offset
		});
	};

	$('.go').fadeOut();
	goline1();

	$(document).on('touchstart click', '.p1', function() {
		$('.go').fadeOut();
		goline1();
		return false;
	});

	var autoDiv = $(".auto");

	function goline1() {
		svg[0].animate({
			"stroke-dashoffset": 0,
		}, 1000 * speed2, mina.linear);
		var timer = setTimeout(function() {
			clearTimeout(timer);
			setTimeout(function() {
				$('.svgbox').addClass('on');
				goline2();
			}, 200 * speed3, "linear");
			$('#go').transition({
				opacity: 1,
				complete: function() {
					$(this).transition({
						y: point[1][1] - start,
						complete: function() {
							$(this).transition({
								x: point[2][0] - pxgo,
								complete: function() {
									$(this).transition({
										y: point[3][1] - start,
										complete: function() {
											var timer2 = setTimeout(function() {
												clearTimeout(timer2);
												$('.svgbox').addClass('done');
											}, 2000);
											var timer3 = setTimeout(function() {
												clearTimeout(timer3);
												goline4();
											}, 1500); //间隔
										}
									}, 2200 * speed, "linear"); //line 3
								}
							}, 1100 * speed, "linear"); //line 2
						}
					}, 1100 * speed, "linear"); //line 1
				}
			}, 500);
		}, 300);
	};

	function goline2() {
		svg[1].animate({
			"stroke-dashoffset": 0,
		}, 1000 * speed2, mina.linear);
		var timer4 = setTimeout(function() {
			clearTimeout(timer4);
			goline3();
		}, 600)
	};

	function goline3() {
		svg[2].animate({
			"stroke-dashoffset": 0,
		}, 1600 * speed2, mina.linear);
	};
	//p2
	/***************************************break************************************/
	function goline4() {
		svg[3].animate({
			"stroke-dashoffset": 0,
		}, 300 * speed2, mina.linear);
		var timer5 = setTimeout(function() {
			clearTimeout(timer5);
			goline5();
		}, 300);
		var timer6 = setTimeout(function() {
			clearTimeout(timer6);
			$('.p3').addClass('on');
			$('#go').transition({
				x: point[4][0] - pxgo,
				y: point[4][1] - start,
				complete: function() {
					$(this).transition({
						x: point[5][0] - pxgo,
						y: point[4][1] - start,
						complete: function() {
							//console.log('finished go');
						}
					}, 1300 * speed, "linear"); //line 5
				}
			}, 400 * speed, "linear"); //line 4
		}, 800);
	};

	function goline5() {
		svg[4].animate({
			"stroke-dashoffset": 0,
		}, 1200 * speed2, mina.linear);
		var timer8 = setTimeout(function() {
			clearTimeout(timer8);
			autoDiv.transition({
				y: "-=" + h * 0.85,
				complete: function() {}
			}, 1000 * speed3, "linear");
			//console.log('finished line');
		}, 1200);
	};

});