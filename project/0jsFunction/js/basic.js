if (/Android|Windows Phone|webOS|iPhone|iPod|BlackBerry|iPad|Opera/i.test(navigator.userAgent)) {
	$('*').css('cursor', 'pointer');
};

//获取url参数
function urlArgs(str) {
	var item = location.search.substring(1).split("&");
	for (var i = 0; i < item.length; i++) {
		var args = item[i].split("=");
		if (args[0] == str) return args[1];
	};
	return "";
};

//获取文件名称
function fileName(o) {
	var pos = o.lastIndexOf("\\");
	return o.substring(pos + 1);
}
//弹出层
function pop(open, dialog) {
	$(document).on('click', open, function() {
		$(dialog + ', .popbg').show();
		$('body').css('overflow', 'hidden');
		return false;
	});
	$(document).on('click', '.dclose', function() {
		$(dialog + ', .popbg').hide();
		$('body').css('overflow', 'auto');
		return false;
	})
}

//弹出层可拖动
function popDragable(open, dialog) {
	var dBox = $(dialog);
	var dHeight = dBox.height();
	var dWidth = dBox.width();
	var dragging = false;
	var iX, iY;
	dBox.hide();
	dboxCss(dWidth, dHeight);
	if (arguments[0] == 'auto') {
		dHeight = dBox.height();
		dWidth = dBox.width();
		dboxCss(dWidth, dHeight);
		dBox.fadeIn("slow");
		$(".popbg").fadeIn("fast");
	};
	$(document).on('click', open, function() {
		dHeight = dBox.height();
		dWidth = dBox.width();
		dboxCss(dWidth, dHeight);
		dBox.fadeIn("slow");
		$(".popbg").fadeIn("fast");
		return false;
	});

	function dboxCss(dWidth, dHeight) {
		dBox.css({
			"left": "50%",
			"top": "50%",
			"margin-left": -dWidth / 2 + "px",
			"margin-top": -dHeight / 2 + "px",
		});
	}
	$(document).on('click', ".dclose, .dokay, .dcancle", function() {
		dBox.fadeOut("fast");
		$(".popbg").fadeOut("fast");
		return false;
	})

	$(document).on('mousedown', ".dtitle", function(e) {
		dragging = true;
		iX = e.clientX - parseInt(dBox.css('left'));
		iY = e.clientY - parseInt(dBox.css('top'));
		return false;
	});
	$(document).mousemove(function(e) {
		if (dragging) {
			var e = e || window.event;
			var l = e.clientX - iX;
			var t = e.clientY - iY;
			var left = dBox.width() / 2;
			var top = dBox.height() / 2;
			var w = document.documentElement.clientWidth - left;
			var h = document.documentElement.clientHeight - top;
			if (l < left) {
				l = left
			} else if (l > w) {
				l = w
			};
			if (t < top) {
				t = top
			} else if (t > h) {
				t = h
			};
			dBox.css({
				"left": l + "px",
				"top": t + "px"
			});
			return false;
		}
	})
	$(document).mouseup(function(e) {
		dragging = false;
	});
};

//移动端判断
function isMobile() {
	if (/Android|Windows Phone|webOS|iPhone|iPod|BlackBerry|iPad|Opera/i.test(navigator.userAgent)) {
		return true;
	};
}

//添加音乐
function addMusic(music) {
	var m = '<audio src="' + music + '"></audio><div class="play"></div>'
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

//瀑布流
function waterfall(callback) {
	var window_h = $(window).height();
	var distanceTop = $('.b1').offset().top - window_h;
	$(window).scroll(function() {
		if ($(window).scrollTop() > distanceTop) {
			callback();
		}
	})
};


//滚动插件
function scrollTo(scrolldom, scrolltime) {
	$(scrolldom).click(function() {
		var scrolltodom = $(this).data("scroll");
		$(this).addClass("thisscroll").siblings().removeClass("thisscroll");
		$('html,body').animate({
			scrollTop: $(scrolltodom).offset().top
		}, scrolltime);
		return false;
	});
};

//jqzoom
(function($) {
	$.fn.jqueryzoom = function(options) {
		var settings = {
			xzoom: 400,
			yzoom: 400,
			offset: 10,
			position: "right",
			lens: 1,
			preload: 1
		};
		if (options) {
			$.extend(settings, options);
		}
		var noalt = '';
		$(this).hover(function() {
			var imageLeft = $(this).offset().left;
			var imageTop = $(this).offset().top;
			var imageWidth = $(this).children('img').get(0).offsetWidth;
			var imageHeight = $(this).children('img').get(0).offsetHeight;
			noalt = $(this).children("img").attr("alt");
			var bigimage = $(this).children("img").attr("src");
			$(this).children("img").attr("alt", '');
			if ($("div.zoomdiv").get().length == 0) {
				$(this).after("<div class='zoomdiv'><img class='bigimg' src='../images/" + bigimage + "'/></div>");
				$(this).append("<div class='jqZoomPup'> </div>");
			}
			if (settings.position == "right") {
				if (imageLeft + imageWidth + settings.offset + settings.xzoom > screen.width) {
					leftpos = imageLeft - settings.offset - settings.xzoom;
				} else {
					leftpos = imageLeft + imageWidth + settings.offset;
				}
			} else {
				leftpos = imageLeft - settings.xzoom - settings.offset;
				if (leftpos < 0) {
					leftpos = imageLeft + imageWidth + settings.offset;
				}
			}
			$("div.zoomdiv").css({
				top: imageTop,
				left: leftpos
			});
			$("div.zoomdiv").width(settings.xzoom);
			$("div.zoomdiv").height(settings.yzoom);
			$("div.zoomdiv").show();
			if (!settings.lens) {
				$(this).css('cursor', 'crosshair');
			}
			$(document.body).mousemove(function(e) {
				mouse = new MouseEvent(e);
				var bigwidth = $(".bigimg").get(0).offsetWidth;
				var bigheight = $(".bigimg").get(0).offsetHeight;
				var scaley = 'x';
				var scalex = 'y';
				if (isNaN(scalex) | isNaN(scaley)) {
					var scalex = (bigwidth / imageWidth);
					var scaley = (bigheight / imageHeight);
					$("div.jqZoomPup").width((settings.xzoom) / (scalex * 1));
					$("div.jqZoomPup").height((settings.yzoom) / (scaley * 1));
					if (settings.lens) {
						$("div.jqZoomPup").css('visibility', 'visible');
					}
				}
				xpos = mouse.x - $("div.jqZoomPup").width() / 2 - imageLeft;
				ypos = mouse.y - $("div.jqZoomPup").height() / 2 - imageTop;
				if (settings.lens) {
					xpos = (mouse.x - $("div.jqZoomPup").width() / 2 < imageLeft) ? 0 : (mouse.x + $("div.jqZoomPup").width() / 2 > imageWidth + imageLeft) ? (imageWidth - $("div.jqZoomPup").width() - 2) : xpos;
					ypos = (mouse.y - $("div.jqZoomPup").height() / 2 < imageTop) ? 0 : (mouse.y + $("div.jqZoomPup").height() / 2 > imageHeight + imageTop) ? (imageHeight - $("div.jqZoomPup").height() - 2) : ypos;
				}
				if (settings.lens) {
					$("div.jqZoomPup").css({
						top: ypos,
						left: xpos
					});
				}
				scrolly = ypos;
				$("div.zoomdiv").get(0).scrollTop = scrolly * scaley;
				scrollx = xpos;
				$("div.zoomdiv").get(0).scrollLeft = (scrollx) * scalex;
			});
		}, function() {
			$(this).children("img").attr("alt", noalt);
			$(document.body).unbind("mousemove");
			if (settings.lens) {
				$("div.jqZoomPup").remove();
			}
			$("div.zoomdiv").remove();
		});
		count = 0;
		if (settings.preload) {
			$('body').append("<div style='display:none;' class='jqPreload" + count + "'></div>");
			$(this).each(function() {
				var imagetopreload = $(this).children("img").attr("src");
				var content = jQuery('div.jqPreload' + count + '').html();
				jQuery('div.jqPreload' + count + '').html(content + '<img src=\"' + imagetopreload + '\">');
			});
		}
	}
})(jQuery);



//判断浏览器
function browser() {
	if (document.all) return 'IE'
	else if (window.opera) return 'Opera'
	else if (NavCheck('Chrome')) return 'Chrome'
	else if (NavCheck('iPod')) return 'iPod'
	else if (NavCheck('iPhone')) return 'iPhone'
	else if (NavCheck('iPad')) return 'iPad'
	else if (NavCheck('Android')) return 'Android'
	else if (NavCheck('Safari')) return 'Safari'
	else if (NavCheck('Gecko')) return 'Firefox'
	else return 'UNKNOWN'

	function NavCheck(check) {
		return navigator.userAgent.indexOf(check) != -1
	}
}

//数组中是否包含一个元素
function contains(arr, obj) {
	var i = arr.length;
	while (i--) {
		if (arr[i] === obj) {
			return true;
		}
	}
	return false;
}

// 自定义数组删除方法
Array.prototype.del = function(n) {
	if (n < 0) return this;
	return this.slice(0, n).concat(this.slice(n + 1, this.length));
}

//cookie
function setCookie(name, value, iDay) {
	var oDate = new Date();
	oDate.setDate(oDate.getDate() + iDay);
	document.cookie = name + '=' + value + '; expires=' + oDate;
}

function getCookie(name) {
	var arr = document.cookie.split('; ');
	for (var i = 0; i < arr.length; i++) {
		var arr2 = arr[i].split('=');
		if (arr2[0] == name) {
			return arr2[1];
		}
	}
	return '';
}

function removeCookie(name) {
	setCookie(name, 1, -1);
}

//图片加载
function imgLoder(imgs, callback) {
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
}

//collision detection
function collides(a, b) {
	return a.x < b.x + b.width &&
		a.x + a.width > b.x &&
		a.y < b.y + b.height &&
		a.y + a.height > b.y;
}

//Tab
function tab(tab) {
	$(tab).find('.content>ul').each(function() {
		$(this).children('li:not(:first)').hide();
	});
	$(tab).find('.nav li').hover(function() {
		$(this).addClass("current").siblings().removeClass("current");
		var index = $(this).index();
		$(this).parents(tab).find(".content>ul>li").eq(index).show().siblings().hide();
		return false;
	});
}

//自动Tab
function autotab(tab) {
	var timer, timer2;
	var len = $(tab).find('.nav li').length;
	var index = 0;
	$(tab).hover(function() {
		clearInterval(timer);
	}, function() {
		timer = setInterval(function() {
			if (index >= len - 1) {
				index = -1
			};
			index++;
			auto(index);
		}, 3600);
	}).trigger("mouseleave");

	$(tab).find('.nav li').hover(function() {
		index = $(".autotab .nav li").index(this);
		timer2 = setTimeout(function() {
			auto(index);
		}, 120);
	}, function() {
		clearTimeout(timer2);
	});

	function auto(index) {
		$(tab).find('.nav li').eq(index).addClass("current").siblings().removeClass("current");
		$(tab).find('.content>ul>li').eq(index).show().siblings().hide();
		return false;
	}
}

//fix menu
function fixmenu(menu) {
	var fixmenuTop = $(menu)[0] && $(menu).offset().top;
	$(window).scroll(function() {
		if ($(this).scrollTop() > fixmenuTop) {
			$(menu).css({
				position: "fixed",
				top: "0px"
			});
		} else {
			$(menu).css({
				position: "absolute",
				top: fixmenuTop + 'px'
			});
		}
	})
}

//自定义滚动条
function scrollBar(bar0, bar1, bar2, bar3) {
	var oDiv = $(bar1)[0];
	var oDiv2 = $(bar2)[0];
	var oDiv3 = $(bar3)[0];
	var oParent = $(bar0)[0];
	var disY = 0;

	oDiv.onmousedown = function(ev) {
		var oEvent = ev || event;
		disY = oEvent.clientY - oDiv.offsetTop;
		document.onmousemove = mouseMove;
		document.onmouseup = mouseUp;

		function mouseMove(ev) {
			if ($(oDiv3).height() > $(oDiv2).height()) {
				var oEvent = ev || event;
				var t = oEvent.clientY - disY;
				var h = oParent.offsetHeight - oDiv.offsetHeight
				if (t < 0) {
					t = 0
				} else if (t > h) {
					t = h
				};
				oDiv.style.top = t + 'px'
				var scale = t / h;
				oDiv3.style.top = -scale * (oDiv3.offsetHeight - oDiv2.offsetHeight) + 'px'
			}
		}

		function mouseUp() {
			this.onmousemove = null;
			this.onmouseup = null;
		};
		return false;
	};
};

//经过展开
$(function() {
	$(".hlist .list").hover(function() {
		$(this).addClass("current").children(".content").show().end().siblings().removeClass("current").children(".content").hide()
	});
});

//点击展开
$(function() {
	$(".clist .list").click(function() {
		$(this).addClass("current").children(".content").slideDown().end().siblings().removeClass("current").children(".content").slideUp()
	});
});

//faq
$(function() {
	$(".faq dt").click(function() {
		$(this).next().slideToggle();
	});
})

//只有一个
$(function() {
	$(".onlyone dt").click(function() {
		$(this).toggleClass("on");
		if ($(this).is('.on')) {
			$(this).siblings("dt").removeClass("on");
			$(this).next().slideDown().siblings('dd').slideUp();
		} else {
			$(this).next().slideUp().siblings('dd').slideUp();
		}
	});
})

//经过图片文字说明,主要为ie6
$(function() {
	$(".ilist").hover(function() {
		$(this).children(".title").slideToggle();
	})
});

//下拉菜单
$(function() {
	$(".menu ul li:has(ul)").hover(function() {
		$(this).children("ul").stop(true, true).slideDown(400);
	}, function() {
		$(this).children("ul").stop(true, true).slideUp("fast");
	});
})

//hover 123幻灯
$(function() {
	var timer;
	var len = $(".slide123 .num li").length;
	var index = 0;
	$(".slide123").hover(function() {
		clearInterval(timer);
	}, function() {
		timer = setInterval(function() {
			if (index >= len - 1) {
				index = -1
			};
			index++;
			auto(index);
		}, 3600);
	}).trigger("mouseleave");

	$(".slide123 .num li").mouseover(function() {
		index = $(".slide123 .num li").index(this);
		setTimeout(function() {
			auto(index);
		}, 200);
	});

	function auto(index) {
		$(".slide123 .num li").removeClass("on").eq(index).addClass("on");
		$(".slide123 .content ul").stop().animate({
			"left": -530 * index
		}, 500);
	}
})

//li向下滚动
$(function() {
	$(".dslide").each(function() {
		var b = $(this);
		setInterval(function() {
			var c = b.find("li:last-child");
			b.find("li:last-child").remove();
			b.find("ul").prepend(c.css({
				height: 0
			}));
			c.animate({
				height: "60px"
			})
		}, 8000)
	});
})

//右侧展开
$(function() {
	$(".rmenu").hover(function() {
		$(this).animate({
			'right': 0
		}, 'fast');
	}, function() {
		$(this).animate({
			'right': -80
		}, 'fast');
	});
})

//剩余字数
$(function() {
	$(document).keyup(function() {
		$(".myform .textleft var").text(110 - $(".myform textarea").val().length);
	});
})

//单行滚动
function autoScroll(obj) {
	$(obj).find("ul:first").animate({
		marginTop: "-25px"
	}, 500, function() {
		$(this).css({
			marginTop: "0px"
		}).find("li:first").appendTo(this);
	});
}
$(document).ready(function() {
	var myar = setInterval('autoScroll(".sline")', 1000)
	$(".sline").hover(function() {
		clearInterval(myar);
	}, function() {
		myar = setInterval('autoScroll(".sline")', 1000)
	}); //当鼠标放上去的时候，滚动停止，鼠标离开的时候滚动开始
});


//点击滚动
$(function() {
	lrslide('.lrslide1', '2', false, true);

	function lrslide(obj, num, isauto, isloop) {
		var i = 1;
		var slide = $(obj).find(".list ul");
		var liwidth = $(obj).find(".list li").outerWidth(true);
		if (isloop == true) {
			var lis = slide.html();
			slide.append(lis);
		};
		var total = $(obj).find(".list li").length;
		var display = Math.round($(obj).find(".list").outerWidth(true) / liwidth);
		var page = Math.ceil((total - display) / num);
		if (total <= display) {
			$(obj).find('.prev, .next').hide();
			$(obj).find('.list').addClass('lessimg');
		}
		if (isloop == false) {
			$(obj).find('.prev').addClass('disabled');
		}
		$(obj).find('.next').click(function() {
			console.log(i);
			if (slide.is(':animated')) {
				slide.stop(true, true);
			};
			if (isloop) {
				if (i >= page) {
					var moved = total / 2 - display;
					slide.css('margin-left', -liwidth * moved * num);
					move(-1);
					i = moved + 2;
				} else {
					move(-1);
					i++;
				}
			} else {
				if (i > page) {
					return;
				} else {
					$(obj).find(".prev").removeClass("disabled");
					$(this).removeClass("disabled");
					move(-1);
					i++;
					if (i > page) {
						$(this).addClass("disabled");
					}
					return false;
				}
			}
		});
		$(obj).find('.prev').click(function() {
			if (slide.is(':animated')) {
				slide.stop(true, true);
			};
			if (isloop) {
				if (i == 1) {
					slide.css('margin-left', -liwidth * total / 2 * num);
					move(1);
					i = total / 2;
				} else {
					move(1);
					i--;
				}
			} else {
				if (i == 1) {
					return;
				} else {
					$(obj).find(".prev").removeClass("disabled");
					$(this).removeClass("disabled");
					move(1);
					i--;
					if (i == 1) {
						$(this).addClass("disabled");
					}
					return false;
				}
			}
		});

		function move(a) {
			slide.animate({
				marginLeft: "+=" + liwidth * num * a
			}, 200);
		}
		setInterval(function() {
			if (isauto) {
				$(obj).find('.next').trigger('click');
			};
		}, 4000);
	}
});

//渐隐渐现	
$(function() {
		var timer, timer2;
		var len = $(".inout .num li").length;
		var index = 0;
		$(".inout .content li").first().show();
		$(".inout").hover(function() {
			clearInterval(timer);
		}, function() {
			timer = setInterval(function() {
				if (index >= len - 1) {
					index = -1
				};
				index++;
				auto(index);
			}, 3600);
		}).trigger("mouseleave");

		$(".inout .num li").hover(function() {
			index = $(".inout .num li").index(this);
			timer2 = setTimeout(function() {
				auto(index);
			}, 120);
		}, function() {
			clearTimeout(timer2);
		});

		function auto(index) {
			$(".inout .num li").eq(index).addClass("on").siblings().removeClass("on");
			$(".inout .content li").eq(index).fadeIn("200").siblings().fadeOut("200");
			return false;
		}
	})
	//延迟显示
$(function() {
		$(".delayshow .nav li").hover(function() {
			var index = $(".delayshow .nav li").index(this);
			timer = setTimeout(function() {
				$(".delayshow .nav li").removeClass("current").eq(index).addClass("current");
				$(".delayshow .content li").hide().eq(index).show();
			}, 200);
		}, function() {
			clearTimeout(timer);
		});
	})
	//电话验证
$(function() {

		$(".phone1").blur(function() {
			clearcontent();
			validation();
		});

		function validation() {
			var isMobile = /^0?(13[0-9]|15[012356789]|18[0236789]|14[57])[0-9]{8}$/;
			var isPhone = /^((0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/;
			var phone1 = $(".phone1").val();
			if (!isMobile.test(phone1) && !isPhone.test(phone1)) {
				$(".tipsphone1").text("请正确填写电话号码，例如:13415764179或0321-4816048");
			}
		}

		function clearcontent() {
			$(".tipsphone1").text("")
		}
	})
	//点击空白隐藏
$(function() {
	$('#btnShow').click(function(event) {
		event.stopPropagation();
		var offset = $(event.target).offset();
		$('#divTop').css({
			top: offset.top + $(event.target).height() + "px",
			left: offset.left
		});
		$('#divTop').toggle('slow');
	});
	$(document).click(function() {
		$('#divTop').slideUp('slow')
	});
	$('#divTop').click(function(event) {
		$(this).fadeOut(1000)
	});
})

/*经典首页渐隐渐现*/
$(function() {
	new dk_slideplayer("#pub_slideplay", {
		width: "500px",
		height: "240px",
		fontsize: "12px",
		time: "5000"
	});
});
var dk_slideplayer = function(object, config) {
	this.obj = object;
	this.n = 0;
	this.j = 0;
	var _this = this;
	var t;
	var defaults = {
		width: "300px",
		height: "200px",
		fontsize: "12px",
		right: "0px",
		bottom: "3px",
		time: "5000"
	};
	this.config = $.extend(defaults, config);
	this.count = $(this.obj + " li").size();

	if (this.config.fontsize == "14px") {
		this.size = "14px";
		this.height = "23px";
		this.right = "6px";
		this.bottom = "15px";
	} else {
		this.size = "12px";
		this.height = "21px";
		this.right = "6px";
		this.bottom = "10px";
	}

	this.factory = function() {
			//元素定位
			$(this.obj).css({
				position: "relative",
				zIndex: "0",
				margin: "0",
				padding: "0",
				width: this.config.width,
				height: this.config.height,
				overflow: "hidden"
			})
			$(this.obj).prepend("<div style='position:absolute;z-index:20;right:" + this.config.right + ";bottom:" + this.config.bottom + "'></div>");
			$(this.obj + " li").css({
				position: "absolute",
				top: "0",
				left: "0",
				width: "100%",
				height: "100%",
				overflow: "hidden"
			}).each(function(i) {
				$(_this.obj + " div").append("<a>" + (i + 1) + "</a>");
			});
			$(this.obj + " img").css({
				border: "none",
				width: "100%",
				height: "100%"
			})
			this.resetclass(this.obj + " div a", 0);
			//标题背景
			$(this.obj).prepend("<div class='dkTitleBg'></div>");
			$(this.obj + " .dkTitleBg").css({
					position: "absolute",
					margin: "0",
					padding: "0",
					zIndex: "1",
					bottom: "0",
					left: "0",
					width: "100%",
					height: _this.height,
					background: "#000",
					opacity: "0.4",
					overflow: "hidden"
				})
				//插入标题
			$(this.obj).prepend("<div class='dkTitle'></div>");
			$(this.obj + " p").each(function(i) {
				$(this).appendTo($(_this.obj + " .dkTitle")).css({
					position: "absolute",
					margin: "0",
					padding: "0",
					zIndex: "2",
					bottom: "0",
					left: "0",
					width: "100%",
					height: _this.height,
					lineHeight: _this.height,
					textIndent: "5px",
					textDecoration: "none",
					fontSize: _this.size,
					color: "#FFFFFF",
					background: "none",
					opacity: "1",
					overflow: "hidden"
				});
				if (i != 0) {
					$(this).hide()
				}
			});
			this.slide();
			this.addhover();
			t = setInterval(this.autoplay, this.config.time);
		}
		//图片渐影
	this.slide = function() {
			$(this.obj + " div a").mouseover(function() {
				_this.j = $(this).text() - 1;
				_this.n = _this.j;
				if (_this.j >= _this.count) {
					return;
				}
				$(_this.obj + " li:eq(" + _this.j + ")").fadeIn("200").siblings("li").fadeOut("200");
				$(_this.obj + " .dkTitle p:eq(" + _this.j + ")").show().siblings().hide();
				_this.resetclass(_this.obj + " div a", _this.j);
			});
		}
		//滑过停止
	this.addhover = function() {
			$(this.obj).hover(function() {
				clearInterval(t);
			}, function() {
				t = setInterval(_this.autoplay, _this.config.time)
			});
		}
		//自动播放 
	this.autoplay = function() {
			_this.n = _this.n >= (_this.count - 1) ? 0 : ++_this.n;
			$(_this.obj + " div a").eq(_this.n).triggerHandler('mouseover');
		}
		//翻页函数
	this.resetclass = function(obj, i) {
		$(obj).css({
			float: "left",
			marginRight: "3px",
			width: "15px",
			height: "14px",
			lineHeight: "15px",
			textAlign: "center",
			fontWeight: "800",
			fontSize: "12px",
			color: "#000",
			background: "#FFFFFF",
			cursor: "pointer"
		});
		$(obj).eq(i).css({
			color: "#FFFFFF",
			background: "#FF7D01",
			textDecoration: "none"
		});
	}
	this.factory();
}

//为指定name的radio设置选中值
$(function() {
	$(":radio[name=radio1][value='b']").attr("checked", "true");

	$("#btn").click(function() {
		var value = $(":radio[name='radio1']:checked").val();

		alert("单选值：" + value);
	});
});

//产品详情
$(function() {
	goods_slide();
	productScan();
	$(".jqzoom").jqueryzoom({
		xzoom: 365,
		yzoom: 365,
		offset: 10,
		position: "right",
		preload: 1,
		lens: 1
	});

})

function goods_slide() {
	var anum = $(".slidetrains ul li").length,
		awidth = $(".slidetrains ul li").outerWidth(true),
		mwidth = -(anum - 4) * awidth,
		aul = $(".slidetrains ul");
	aul.css("width", anum * awidth + "px");
	$("a#spec-backward").click(function(e) {
		if (!aul.is(":animated")) {
			var aleft = parseInt(aul.css("marginLeft"));
			if (anum > 4 && aleft > mwidth) {
				$('.spec-control').removeClass("disabled");
				aul.animate({
					marginLeft: "-=" + awidth + "px"
				}, 200);
			} else {
				$(this).addClass("disabled");
			}
		}
	});
	$("a#spec-forward").click(function(e) {
		if (!aul.is(":animated")) {
			var aleft = parseInt(aul.css("marginLeft"));
			if (aleft < 0 && anum > 4) {
				$('.spec-control').removeClass("disabled");
				aul.animate({
					marginLeft: "+=" + awidth + "px"
				}, 200);
			} else {
				$(this).addClass("disabled");
			}
		}
	})

}

function productScan() {
	$(".slidetrains li").each(function(index) {
		$(this).hover(function() {
			$('.goodsShow .thumbIMG li img').removeClass('on');
			var cSrc = $(this).children("img").attr("src")
			$(this).children("img").addClass('on');
			$(".mainpic").children("img").attr("src", cSrc);
			$(".mainpic").children("img").attr("jqimg", cSrc);
		})
	});
}



function MouseEvent(e) {
	this.x = e.pageX;
	this.y = e.pageY;
}

//全选
$(function() {
	$('[name=items]:checkbox').click(function() {
		var flag = true;
		$('[name=items]:checkbox').each(function() {
			if (!this.checked) {
				flag = false;
			}
		});
		$('#checkall').prop('checked', flag);
	})
	$('#checkall').click(function() {
		$('[name=items]:checkbox').prop('checked', this.checked);
	})
	$('#uncheckall').click(function() {
		$('[name=items]:checkbox').prop('checked', false);
	})
	$('#fan').click(function() {
		$('[name=items]:checkbox').each(function() {
			this.checked = !this.checked;
		})
	})
	$('#submit').click(function() {
		var str = '你选中的是：\r\n';
		$('[name=items]:checkbox:checked').each(function() {
			str += $(this).val() + '\r\n';
		});
		alert(str);
	})
})

//滚回顶部
$(function() {
	$(window).scroll(function() {
		if ($(window).scrollTop() > 700) {
			$('.anchor').show();
		} else {
			$('.anchor').hide();
		}
	})
	$('.anchor').click(function() {
		$('html, body').animate({
			scrollTop: 0 //$('.content').offset().top
		}, 240);
	})
})