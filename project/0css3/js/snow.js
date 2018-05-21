window.requestAnimFrame = (function() {
	return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		function(callback) {
			window.setTimeout(callback, 1000 / 60);
		};
})();
var timer;
function snow(canvas,stop) {
	if (stop == true) {
		cancelAnimationFrame(timer);
		return;
	};
var myw1=$(window).width();
	var canvas = document.getElementById(canvas);
	var ctx = canvas.getContext("2d");
	var W = myw1;
	var H = window.innerHeight;
	canvas.width = myw1;
	canvas.height = H;
	var angle = 0;
	var mp = 20; //max particles
	var particles = [];
	for (var i = 0; i < mp; i++) {
		particles.push({
			x: Math.random() * W, //x-coordinate
			y: Math.random() * H, //y-coordinate
			r: Math.random() * 15 + 25, //radius
			d: Math.random() * mp //density
		})
	};
	var snow = [];
	var loadedCount = 0;

	for (var i = 0; i < 4; i++) {
		snow[i] = new Image();
		snow[i].src = 'images/snow' + (i + 1) + '.png';
	};
	draw();
	function draw() {
		timer=requestAnimFrame(draw);
		ctx.clearRect(0, 0, W, H);
		ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
		ctx.beginPath();
		for (var i = 0; i < mp - 10; i++) {
			var p = particles[i];
			ctx.moveTo(p.x, p.y);
			ctx.drawImage(snow[0], p.x, p.y, p.r, p.r * 60 / 45);
		};
		for (var i = mp - 10; i < mp - 7; i++) {
			var p = particles[i];
			ctx.moveTo(p.x, p.y);
			ctx.save();
			ctx.globalAlpha = 0.7;
			ctx.drawImage(snow[1], p.x, p.y, p.r, p.r * 59 / 56);
			ctx.restore();
		};
		for (var i = mp - 7; i < mp - 6; i++) {
			var p = particles[i];
			ctx.moveTo(p.x, p.y);
			ctx.drawImage(snow[2], p.x, p.y, p.r * 3, p.r * 3 * 144 / 151);
		};
		for (var i = mp - 6; i < mp - 4; i++) {
			var p = particles[i];
			ctx.moveTo(p.x, p.y);
			ctx.save();
			ctx.globalAlpha = 0.9;
			ctx.drawImage(snow[3], p.x, p.y, p.r * 2, p.r * 2 * 64 / 67);
			ctx.restore();
		};
		ctx.fill();
		update();
	};
	function update() {
		angle += 0.01;
		for (var i = 0; i < mp; i++) {
			var p = particles[i];
			p.y += Math.cos(angle + p.d) + 1 + p.r / 20;
			p.x += Math.sin(angle) * 0.4;
			if (p.x > W + 5 || p.x < -5 || p.y > H) {
				if (i % 3 > 0) //66.67% of the flakes
				{
					particles[i] = {
						x: Math.random() * W,
						y: -10,
						r: p.r,
						d: p.d
					};
				} else {
					if (Math.sin(angle) > 0) {
						//Enter from the left
						particles[i] = {
							x: -5,
							y: Math.random() * H,
							r: p.r,
							d: p.d
						};
					} else {
						particles[i] = {
							x: W + 5,
							y: Math.random() * H,
							r: p.r,
							d: p.d
						};
					}
				}
			}
		}
	}
}