(function($) {
	$.fn.extend({
		bgparallax: function(options) {
			var defaults = {};
			var set = $.extend({}, defaults, options);
			return this.each(function() {
				var $t = $(this);
				window.addEventListener("deviceorientation", function(e) {
					var x = Math.abs(Math.round(e.gamma));
					var y = Math.abs(Math.round(e.beta));
					if (y > 85) {
						return;
					};
					$t.css({
						backgroundPosition: x * 0.5 + 'px ' + y * 0.5 + 'px'
					});
				}, false);
			});
		},
		demo: function(options) {
			var defaults = {};
			var set = $.extend({}, defaults, options);
			return this.each(function() {
				var $t = $(this);
			});
		},
		demo: function(options) {
			var defaults = {};
			var set = $.extend({}, defaults, options);
			return this.each(function() {
				var $t = $(this);
			});
		},
	});
})(jQuery);