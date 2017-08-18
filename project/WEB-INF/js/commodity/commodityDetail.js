// 增加计数器
function addone() {
	var x = document.getElementById("relectvalue").innerHTML;
	x = parseInt(x) + 1;
	document.getElementById("relectvalue").innerHTML = x;
}
function subtactone() {
	var x = document.getElementById("relectvalue").innerHTML;

	if (x > 1) {
		x = parseInt(x) - 1;
		document.getElementById("relectvalue").innerHTML = x;
	} else {
		document.getElementById("relectvalue").innerHTML = 1;
	}
}

// 地区选择后的操作
function chooseRegion() {
	var r1 = regionSelect.getRegion1Id();
	var r2 = regionSelect.getRegion2Id();
	$("#local").val(r2 == 0 ? r1 : r2);
	$("#dangqiandiq")
			.html(
					regionSelect.getRegion1Name() + " "
							+ regionSelect.getRegion2Name());
	$("#dangqiandiq").addClass("cityselected_yes")
	
	if (tag == 1) {
		//多地多价
		chooseOption(undefined, r1, r2, undefined)

	} else if (tag == 2) {
		var str = '';
		var array = priceAttributes ;
		var attrName;
		for (var i = 0; i < array.length; i++) {
			if (array[i].city1 == r1 && array[i].city2 == r2) {
				str += '<div onclick="chooseOption(' + array[i].id + ',' + r1
						+ ',' + r2 + ',this)">' + array[i].desc + '</div>';
				if(attrName==undefined)
					attrName=array[i].tag;
						
			}
		}
		if(attrName!=undefined)
			{
			$(".common_box_one.peixunkecheng_tap").html(attrName);
			$(".peix_header").html(attrName);
			}
		$(".peix_select").html(str);
		$("#qeixun_selected_yrb").addClass(
				"common_box_two jump_icon select_style_yrb");
		$("#qeixun_selected_yrb").html("请选择");
	}
}

// 标签选择操作 显示价格
function chooseOption(optionId, region1, region2, e) {
	
	var filter = {
		fwId : detail.id,
		local : region2 == 0 ? region1 : region2,
		order : 0,
		optId : 0
	};
	if (tag == 1) {
		//多地多价
		filter.optId =0;
		$('#tag').val(0);
		$('#order').val(0);
	} else if (tag == 2) {
		for (var i = 0; i < priceAttributes.length; i++) {
			if (priceAttributes[i].id == optionId) {
				filter.order = priceAttributes[i].order;
				break;
			}
		}
		$('#tag').val(0);
		$('#order').val(filter.order);
	}

	$.ajax({
		type : "POST",
		url : "/commodity/price",
		data : JSON.stringify(filter),
		contentType : "application/json",
		async : false,
		success : function(result) {
				var price = result;
				if (price.discount == false) {
					$(".fuwujiage > span").text(price.showPrice);
					$('#originalPrice').hide();
				} else {
					$(".fuwujiage > span").text(price.disCountPrice);
					// 设置原价
					$("#originalPrice").text(price.originPrice);
					$('#originalPrice').show();
				}
				$("#qeixun_selected_yrb").text($(e).text());
		}
	});

	$(".basedibu_tyb").scrollTop(Number.MAX_VALUE);
	if ($(e).hasClass("bg_peix_select")) {
		// 控制止灰层不能滑动
		$("body").removeClass("noscroll_cover");
		$(".cover").hide();
		$(".basic_peixunkc").hide();
		$(".nobug_qyxq").hide();
		return true;
	} else {
		// 控制止灰层不能滑动
		$("body").removeClass("noscroll_cover");
		$(".peix_select div").removeClass("bg_peix_select");
		$(e).addClass("bg_peix_select");
		var x = $(e).html();
		$(".cover").hide();
		$(".basic_peixunkc").hide();
		$(".nobug_qyxq").hide();
		$("#qeixun_selected_yrb").text(x);
	}
}

$(function(){
	
	// app不显示购买选项
	$("#buydiv").remove();
	$("#purchase").remove();
	
	// 地区选择器初始化
	/*regionSelect.init(detail.id);
	regionSelect.chooseFunction = chooseRegion;
	if(region1!='0'){
		regionSelect.setRegion(region1,region2);
	}*/
	$("#fuwujs").click(function() {
		if ($("#fuwujs").hasClass("tap_color")) {
			return true;
		} else {
			$("#changjwt").removeClass("tap_color");
			$("#changjwt_decri").hide();
			$("#fuwujs").addClass("tap_color");
			$("#fuwujs_decri").show();
		}
		;
	})
	$("#changjwt").click(function() {
		if ($("#changjwt").hasClass("tap_color")) {
			return true;
		} else {
			$("#fuwujs").removeClass("tap_color");
			$("#fuwujs_decri").hide();
			$("#changjwt").addClass("tap_color");
			$("#changjwt_decri").show();
		}
		;
	})
	// 标签选项点击
	$("#peixunkc_yrb").click(function() {
		if ($("#dangqiandiq").html() == "请选择") {
			// 控制止灰层不能滑动
			$("body").addClass("noscroll_cover")
			showDialog("请优先选择服务地区");
			return false;
		} else {
			// 控制止灰层不能滑动
			$("body").addClass("noscroll_cover")
			$("#qeixun_selected_yrb").removeClass("select_style_yrb");
			$(".cover").show();
			$(".basic_peixunkc").show();
			$(".nobug_qyxq").show();
		}
	})
	// 是否能增加数量判断
	if (detail.isMulti != true) {
		$("#subtactone").remove();
		$("#addone").remove();
		$("#relectvalue").removeClass("jishuqi_xq1");
		$("#relectvalue").addClass("jishuqi_xq11");
		$("#addone").removeAttr("onclick");
		$("#subtactone").removeAttr("onclick");
	}
	
	// 是否分享
	/*
	 * if (${isShare == 1}) { $("#shareDiv").removeClass("common_label2");
	 * $("#shareDiv").addClass("common_label3"); $("#purchase").css("display",
	 * "none"); }
	 */
	// 必输项控制
	$(".mustbug_qyxq").click(
			function() {
				if ($("#dangqiandiq").html().trim() == "请选择") {
					showDialog("请选择服务地区");
					return false;
				} else if (tag ==2
						&& $("#qeixun_selected_yrb").html().trim() == "请选择") {
					showDialog("请选择"
							+ $('.common_box_one.peixunkecheng_tap').html()
									.trim());
					return false;
				}

				$(".cover").click(function() {
					$(".cover").hide();
					$(".bishuxiangstyle").hide();
				})
				$(".head_bishuxiangstyle").click(function() {
					$(".cover").hide();
					$(".bishuxiangstyle").hide();
				});
				
				// 添加购物车
				$("#num").val($("#relectvalue").text());
				$("#city1").val(regionSelect.getRegion1Id());
				$("#city2").val(regionSelect.getRegion2Id());
				$("#addcartForm").submit();

			});

	// 点击关闭按钮关闭 判断是否选择，如果没有选择
	$(".nobug_qyxq").click(function() {
		var b = $("#qeixun_selected_yrb").text();
		var c = "请选择"
		if (b == c) {
			if (!($("#qeixun_selected_yrb").hasClass("select_style_yrb"))) {

				$("#qeixun_selected_yrb").addClass("select_style_yrb")
			}
		}
		;
		$(".cover").hide();
		$(".basic_peixunkc").hide();
		$(".nobug_qyxq").hide();
	})
	$(".cover").click(function() {
		var b = $("#qeixun_selected_yrb").text();
		var c = "请选择"
		if (b == c) {
			if (!($("#qeixun_selected_yrb").hasClass("select_style_yrb"))) {

				$("#qeixun_selected_yrb").addClass("select_style_yrb")
			}
		}
		;
		$(".cover").hide();
		$(".basic_peixunkc").hide();
		$(".nobug_qyxq").hide();
	})
})