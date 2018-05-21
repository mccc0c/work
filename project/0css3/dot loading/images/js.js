$(function() {
	var w1 = $(document).width() * 0.8;
	var h1 = $(document).height() * 0.4;
	$(".dragbox .item li:eq(0)").draggable({
		opacity: 0.6,
		drag: function(event, ui) {
			ui.position.top = Math.min(h1, ui.position.top);
			ui.position.top = Math.max(0, ui.position.top);
			ui.position.left = Math.max(0, ui.position.left);
			ui.position.left = Math.min(w1, ui.position.left);
		},
		start: function(event, ui) {
			$(this).addClass("on").siblings().removeClass('on').animate({
				'left': '0',
				'top': '0'
			});
		},
		stop: function() {
			var b = ".dragbox .box";
			var t = $(this).text();
			var r = collides(this, b);
			if (r === false) {
				$('.info').text(t + ' was draged out.');
			}
		}
	});
	$(".dragbox .item li:eq(1)").draggable({
		opacity: 0.6,
		drag: function(event, ui) {
			ui.position.top = Math.min(h1, ui.position.top);
			ui.position.top = Math.max(0, ui.position.top);
			ui.position.left = Math.max(-w1, ui.position.left);
			ui.position.left = Math.min(0, ui.position.left);
		},
		start: function(event, ui) {
			$(this).addClass("on").siblings().removeClass('on').animate({
				'left': '0',
				'top': '0'
			});
		},
		stop: function() {
			var b = ".dragbox .box";
			var t = $(this).text();
			var r = collides(this, b);
			if (r === false) {
				$('.info').text(t + ' was draged out.');
			}
		}
	});
	$(".dragbox .box").droppable({
		drop: function(event, ui) {
			var index = $('.dragbox .item li.on').index();
			$(this).addClass('on');
			var t = $('.dragbox .item li').eq(index).text();
			$('.info').text(t + ' was draged in.');
			setTimeout(function() {
				$(".dragbox .box").removeClass('on');
			}, 2000)
		}
	});
});

function collides(a, b) {
	var x1 = l(a);
	var x2 = l(b);
	var y1 = t(a);
	var y2 = t(b);
	var w1 = w(a);
	var w2 = h(a);
	var h1 = h(a);
	var h2 = h(b);
	return x1 < x2 + w2 &&
		x1 + w1 > x2 &&
		y1 < y2 + h2 &&
		y1 + h1 > y2;
}

function l(d) {
	return $(d).offset().left - $('body').offset().left;;
};

function t(d) {
	return $(d).offset().top;
};

function w(d) {
	return $(d).width();
}

function h(d) {
	return $(d).height();
}