//切换
$(function() {
	$('.tab').tab({
		event: 'click',
		auto: false,
		before: function() {},
		after: function() {}
	});
});

function getDay(d, n) {
	d = new Date(d);
	d = +d + 1000 * 60 * 60 * 24 * n;
	d = new Date(d);
	return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
}
