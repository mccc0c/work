//城市跳转
function skip(areaId) {
	$('.indexarea, .formarea').hide();
	$('.quesArea').show();
	$('.cover, .popup').hide();
	$('input[name=areaId]').val(areaId);
	localStorage.setItem('setAreaId', areaId);
	localStorage.setItem('setIndex', 0);
}
//答题返回
function skipBack(index) {
	$('#quesDate>li').eq(index).hide();
	$('#quesDate>li').eq(index - 1).show();
}
//快速提交
function submit(target) {
	var el = $(target),
		wrapdiv = el.parents('.wrapper');

	if (!wrapdiv.find('.subject-content ul li').hasClass("cur")) {
		return false;
	}
	/*var realAns = [
	    [1],
	    [0, 1, 2, 3, 4, 5, 6, 7],
	    [1, 2, 3],
	    [0, 1, 2, 3],
	    [0, 1, 2],
	    [0, 1, 2],
	    [0],
	    [1]
	];
	var myAns = JSON.parse(localStorage.getItem('answer'));
	console.log(myAns);
	var count = 0;
	for (var i = 0; i < realAns.length; i++) {
	    var e = realAns[i];
	    for (var j = 0; j < e.length; j++) {
	        var s = myAns[i];
	        if (e[j] == s) {
	            count++;
	            break;

	        }
	    }
	}

	count = count / myAns.length * 100;
	console.log(count);*/
	$('.indexarea, .quesArea').hide();
	$('.formarea').show();
	localStorage.setItem('setIndex', "form");


}
//查看结果
function submit_2() {
	var f = $("#form1"),
		comName = $('#comName').val(),
		yourname = $('#yourname').val(),
		mobileval = $('#mobile').val(),
		areaid = f.find('input[name="areaId"]').val();
	answer = JSON.parse(f.find('input[name="selectQues"]').val());
	console.log(comName, yourname, mobileval, areaid, answer);
}
//验证手机号
function check_phone_num() {
	var phone_reg = /^1[3578][0-9]{9}$/;
	return phone_reg.test($('#mobile').val());
}
//重新加载
function reload() {
	var index = localStorage.getItem('setIndex') || "",
		answer = JSON.parse(localStorage.getItem('answer')) || [],
		areaid = localStorage.getItem('setAreaId') || "";
	// console.log(answer);
	$("#form1").find('input[name="areaId"]').val(areaid);
	$("#form1").find('input[name="selectQues"]').val(JSON.stringify(answer));
	var len = $("#quesDate>li").length;
	if (index == "") {
		$('.quesArea, .formarea, .cover, .popup').hide();
		$('.indexarea').show();
	} else if (index == "form") {
		$('.quesArea, .indexarea, .cover, .popup').hide();
		$('.formarea').show();
	} else if (index != "form") {
		$('.indexarea, .formarea, .cover, .popup').hide();
		$('.quesArea').show();
		$("#quesDate>li").eq(Number(index)).show().siblings('li').hide();
	}
	for (var i = 0; i < answer.length; i++) {
		var p = $("#quesDate>li").eq(i);
		// console.log(p,answer[i]);
		if (answer[i] !=="") {
			p.find('.quesul li').eq(answer[i]).addClass('cur');
			if ($("#resultOfView")[0]) {
				$("#resultOfView").show();
			}
		}

	}
}
//清除localStorage
function removeLocal() {
	localStorage.removeItem("answer");
	localStorage.removeItem("setIndex");
	localStorage.removeItem("setAreaId");
}
var getquesDate = {
	"question": [{
			"qname": "您的企业至2018年8月的成立年限（以工商注册时间为准）？",
			"choose": [{
					"cid": "A",
					"cname": "1年以内"
				},
				{
					"cid": "B",
					"cname": "1年以上"
				}
			]
		},
		{
			"qname": "您的企业产品（服务）属于以下哪个行业领域?",
			"choose": [{
					"cid": "A",
					"cname": "电子信息"
				},
				{
					"cid": "B",
					"cname": "生物与新医药"
				},
				{
					"cid": "C",
					"cname": "航空航天"
				},
				{
					"cid": "D",
					"cname": "新材料"
				},
				{
					"cid": "E",
					"cname": "高技术服务"
				},
				{
					"cid": "F",
					"cname": "新能源与节能"
				},
				{
					"cid": "G",
					"cname": "资源与环境"
				},
				{
					"cid": "H",
					"cname": "先进制造与自动化"
				},
				{
					"cid": "I",
					"cname": "以上都不是"
				}
			]
		},
		{
			"qname": "您的企业目前获得授权证书的知识产权数量（含专利、软件著作权、集成电路布图设计等）？",
			"choose": [{
					"cid": "A",
					"cname": "无"
				},
				{
					"cid": "B",
					"cname": "1-3项"
				},
				{
					"cid": "C",
					"cname": "4-6项"
				},
				{
					"cid": "D",
					"cname": "6项以上"
				}
			]
		},
		{
			"qname": "您的企业近三个年度的研发费总额占同期销售收入总额的比例是多少？",
			"choose": [{
					"cid": "A",
					"cname": "3%"
				},
				{
					"cid": "B",
					"cname": "4%"
				},
				{
					"cid": "C",
					"cname": "5%"
				},
				{
					"cid": "D",
					"cname": "≥6%"
				},
				{
					"cid": "E",
					"cname": "≤2%"
				}
			]
		},
		{
			"qname": "您的企业近一年高新技术产品（服务）收入占同期总收入的比例是多少？",
			"choose": [{
					"cid": "A",
					"cname": "≥80%"
				},
				{
					"cid": "B",
					"cname": "≥70%"
				},
				{
					"cid": "C",
					"cname": "≥60%"
				},
				{
					"cid": "D",
					"cname": "＜60%"
				}
			]
		},
		{
			"qname": "您的企业近三年的销售收入、净资产两项指标是否实现了连续增长？",
			"choose": [{
					"cid": "A",
					"cname": "两项指标均实现了增长"
				},
				{
					"cid": "B",
					"cname": "只有销售收入实现了增长"
				},
				{
					"cid": "C",
					"cname": "只有净资产实现了增长"
				},
				{
					"cid": "D",
					"cname": "无增长"
				},
				{
					"cid": "E",
					"cname": "负增长"
				}
			]
		},
		{
			"qname": "您的企业目前的征税方式为以下那种？",
			"choose": [{
					"cid": "A",
					"cname": "查账征收"
				},
				{
					"cid": "B",
					"cname": "核定征收"
				}
			]
		},
		{
			"qname": "您的企业前一年内是否存在重大安全、质量事故或严重环境违法行为？",
			"choose": [{
					"cid": "A",
					"cname": "是"
				},
				{
					"cid": "B",
					"cname": "否"
				}
			]
		}
	]
};
var getareaDate = {
	"area": [{
			"areaId": 1,
			"areaName": "青岛"
		},
		{
			"areaId": 2,
			"areaName": "舟山"
		},
		{
			"areaId": 3,
			"areaName": "台州"
		},
		{
			"areaId": 4,
			"areaName": "北京"
		}
	]
};
var quesArr = JSON.parse(localStorage.getItem('answer')) || [];

$(function() {
	if ($('#quesDate')[0]) {
		$('#quesDate').tmpl('ques_tmpl', getquesDate);
	}
	if ($('#popupArea')[0]) {
		$('#popupArea').tmpl('area_tmpl', getareaDate);
	}
	reload();
	$('.popup li').on('click', function() {
		$(this).addClass('cur');
		$(this).siblings('li').removeClass('cur');
	});
	$('.link2').on('click', function() {
		$('.cover, .popup').show();
	});
	$('.close-popup').click(function() {
		$('.cover, .popup').hide();
	})
	$('.subject-content ul li').each(function() {
		var h = $(this).children('p').height();
		if (h > 45) {
			$(this).children('p').css({ 'line-height': '24px', 'padding-top': '5px', 'padding-bottom': '5px' });
			var $h = $(this).children('p').height() + 10;
			var H = $h + 'px';
			$(this).children('b').height($h);
			$(this).children('b').css('line-height', H);

		} else {
			$(this).children('p').css('line-height', '45px');
			$(this).children('b').css('line-height', '45px');
			$(this).children('b').height(45);
			$(this).children('p').height(45);
		}
	});
	$(document).on('click', '.subject-content ul li', function() {
		var el = $(this),
			wrapdiv = el.parents('.wrapper'),
			parli = wrapdiv.parent('li');
		index = parli.index(),
			quesDateLen = $("#quesDate>li").length;
		if (el.hasClass('cur')) {
			$(this).removeClass('cur');
			if ($("#resultOfView")[0]) {
				$("#resultOfView").hide();
			}
			quesArr[index] = "";
			$('input[name=selectQues]').val(JSON.stringify(quesArr));
			localStorage.setItem('answer', JSON.stringify(quesArr));
			// $(this).children('input[type=hidden]').val('');
		} else {
			var selQues = el.data('id');
			$(this).addClass('cur').siblings('li').removeClass('cur');
			quesArr[index] = selQues;
			$('input[name=selectQues]').val(JSON.stringify(quesArr));
			localStorage.setItem('answer', JSON.stringify(quesArr));
			if (index + 1 < quesDateLen) {
				localStorage.setItem('setIndex', index + 1);
				setTimeout(function() {
					parli.hide();
					$("#quesDate>li").eq(index + 1).show();

				}, 100)
			} else {
				if (el.hasClass('cur')) {
					$("#resultOfView").show();
				} else {
					$("#resultOfView").hide();
				}

			}
		}
	})
	$('.message-input li input').on('focus', function() {
		$(this).siblings('p.error').hide();
	})
	$('#submit').on('click', function() {
		var comName = $('#comName').val(),
			yourname = $('#yourname').val(),
			mobileval = $('#mobile').val();
		var flag = false;
		if (comName == '') {
			$('#comName').siblings('.error').show();
			flag = true;
		}
		if (yourname == '') {
			$('#yourname').siblings('.error').show();
			flag = true;
		}
		if (mobileval == '') {
			$('#mobile').siblings('.error').text('不能为空').show();
			flag = true;
		} else if (!check_phone_num()) {
			$('#mobile').siblings('.error').text('手机号错误').show();
			flag = true;
		}

		if (flag) {
			return;
		}
		submit_2();

	});
	$(document).on('click', ".testagain", function() {
		removeLocal();
	})
})