$(function() {
	$('.api a').on('click', function() {
		$('.api a').removeClass('on');
		$(this).addClass('on');
	});
	$('pre').on('mouseenter', function() {
		var $t = $(this);
		console.log($t.find('code'));
		$(this).prepend('<div class="copy"></div>');
		var clipboard = new Clipboard('.copy', {
			target: function() {
				return $t.find('code')[0];
			}
		});
	});
	$('pre').on('mouseleave', function() {
		$('.copy').remove();
	});
});
hljs.initHighlightingOnLoad();