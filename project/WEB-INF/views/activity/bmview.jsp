<!--引入的公共部分-->
<%@ page language="java" contentType="text/html;charset=UTF-8"
	pageEncoding="UTF-8" trimDirectiveWhitespaces="true"
	isELIgnored="false"%>
<%@ include file="../include/header.jsp"%>
<!--引入对应的css和js文件-->
<%
    jspContext.addCssRef("css/activity/common.css");
			jspContext.addCssRef("css/activity/sign.css");
			jspContext.addJSRef("js/activity/jquery-1.10.2.min.js");
			jspContext.addJSRef("js/activity/iscroll.js");
			jspContext.addJSRef("js/activity/code.min.js");
%>
<c:if test="${commonInfo.userType==2}">
	<link href="/css/activity/tao.css" rel="stylesheet">
</c:if>
<c:if test="${commonInfo.userType!=2}">
	<link href="/css/activity/tao2.css" rel="stylesheet">
</c:if>
<div class="wrapper">
	<section class="common_label common_new">
		<div class="account_box_basic">
			<div class="account_boxLeft lh30">姓名：</div>
			<div class="sign_right">
				<input  name="uname" id="uname" type="text" class="sign_right"
					value="请输入姓名" />
			</div>
		</div>
	</section>

	<section class="common_label common_new">
		<div class="account_box_basic">
			<div class="account_boxLeft">手机：</div>
			<div class="sign_right">
				<input name="mobi" id="mobi" type="text" class="sign_right"
					value="${commonInfo.userMobile > 0 ? commonInfo.userMobile : '请输入手机号码'}" />
			</div>
		</div>
	</section>

	<section class="common_label common_new">
		<div class="account_box_basic">
			<div class="account_boxLeft">验证码：</div>
			<div class="sign_right">
				<input name="auth" id="auth" type="text" class="sign_right"
					value="请输入验证码" /> <a href="javascript:void(0)" class="get_code"
					obj="60">获得</a>
			</div>
		</div>
	</section>

	<section class="common_label common_new">
		<div class="account_box_basic">
			<div class="account_boxLeft">类型：</div>
			<div class="sign_right">
				<label data-value="1" class="label_name"><i
					class="label_opt"></i><span>公司</span></label> <label data-value="2"
					class="label_name"><i class="label_opt"></i><span>机构</span></label>
				<label data-value="3" class="other"><i class="label_opt"></i><span>其他</span></label>
			</div>
		</div>
		<div id="label">
			<div class="account_box_basic">
				<div class="account_boxLeft">名称：</div>
				<div class="sign_right_company">
					<input name="com" id="com" type="text" class="sign_right"
						value="请输入名称" />
				</div>
			</div>
		</div>
	</section>
	<a href="javascript:void(0)" class="submit_btn">提交</a>
	<div class="fail_tip">
		<i></i>
		<p>请补全信息</p>
	</div>
	<!-- <div id="pindiv" style="display: none">
		<input name="pin" id="pin" type="hidden" />
	</div> -->
	<!-- 增加止灰层 -->
	<section>
		<div class="cover"></div>
	</section>
</div>
<%@ include file="../include/statistical/footer.jsp" %>
</body>
<title>活动报名</title>
</html>
<script type="text/javascript">
	//定义个全局变量存储获取的验证码
	var _userCode ="";
	$(function() {
		$('.sign_right label').click(function() {
			if ($(this).hasClass('label_name')) {
				$(this).addClass('cur');
				$(this).siblings().removeClass('cur');
				$('#label').show();
			} else {
				$(this).addClass('cur');
				$(this).siblings().removeClass('cur');
				$('#label').hide();
			}

		});
		$('.sign_right').each(function() {
			var v_default = this.value;
			$(this).focus(function() {
				if (this.value == v_default) {
					this.value = "";
				}
			}).blur(function() {
				if (this.value == "") {
					this.value = v_default;
				}
			});
		});
	})

	var bmokurl = "/activity/enroll/bmok${urlCommonInfo}&hdId=${id}";
	var bmurl = "/activity/enroll/submit${urlCommonInfo}&hdId=${id}";
	function bm() {
		var uname = ($('#uname').val() != '') ? $('#uname').val() : '0';
		var mobi = ($('#mobi').val() != '') ? $('#mobi').val() : '0';
		var utype = 1;
		$('.sign_right label').each(function() {
			if ($(this).hasClass('cur')) {
				utype = $(this).attr('data-value');
			}
		});
		var com = ($('#com').val() != '') ? $('#com').val() : '0';
		var auth = ($('#auth').val() != '') ? $('#auth').val() : '0';
		var str = bmurl + "&uname=" + uname + "&mobi=" + mobi + "&utype="
				+ utype + "&company=" + com + "&auth=" + auth;
		$.get(str, function(data) {
			if (data['status'] == 1) {
				window.location.href = bmokurl;
			} else {
				$('.fail_tip p').text(data['message']);
				$('.fail_tip').show();
				$(".cover").show();
				setInterval('Hid()', 3000);
			}
		});
	}
	$(function() {
		$('.get_code')
				.click(
						function() {
							if ($(this).hasClass('get_code_finish')) {
								return false;
							} else {
								//by Jemmy
								var partten = /^\d{10,13}$/;
								if (!partten.test($('#mobi').val())) {
									$('.fail_tip p').text('请输入正确的手机号码！');
									$('.fail_tip').show();
									$(".cover").show();
									setInterval('Hid()', 3000);
									return false;
								} else {
									var result = 0;
									var geturl = '/sms/pin?mobile='
											+ (($('#mobi').val() != '') ? $(
													'#mobi').val() : '0');
									$
											.get(
													geturl,
													function(data) {
														if (data['status'] == 1 && data['message'] == 'Success') {
															// document.getElementById('pin').value = (data['result'])["content"].replace('您好，您的验证码为：',""); 
															_userCode = (data['result'])["content"].replace('您好，您的验证码为：',"");
															$('.fail_tip p').text('验证码已发送！\n 请注意查收');
															$('.fail_tip').show();
															$(".cover").show();
															setInterval('Hid()',3000);
															getValidCode();
															$(this).addClass('get_code_finish');
														} else if (data == '2002') {
															$('.fail_tip p').text('1小时内只能发送2条验证码！');
															$('.fail_tip').show();
															$(".cover").show();
															setInterval('Hid()',3000);
															return false;
														} else if (data == '2003') {
															$('.fail_tip p').text('24小时内最多发送5条验证码！');
															$('.fail_tip').show();
															$(".cover").show();
															setInterval('Hid()',3000);
															return false;
														} else {
															$('.fail_tip p').text('短信发送失败，请稍后再试！');
															$('.fail_tip').show();
															$(".cover").show();
															setInterval(
																	'Hid()',
																	3000);
															return false;
														}
													});
								}
							}
						});

		$('.submit_btn').on("click",function() {
			var _userId = $('input[name=uname]').val();
			var _userMobile = $('input[name=mobi]').val();
			var _userName = $('input[name=com]').val();
			var _userAuth =$("input[name=auth]").val();
			var yzm=parseInt(_userCode);

			if (_userId == '' || _userId == '请输入姓名') {
				$('.fail_tip p').text('请输入姓名');
				$('.fail_tip').show();
				$(".cover").show();
				setInterval('Hid()', 3000);
				return false;
			}
			if (_userMobile == ''|| _userMobile == "请输入手机号码") {
				$('.fail_tip p').text('请输入手机号码');
				$('.fail_tip').show();
				$(".cover").show();
				setInterval('Hid()', 3000);
				return false;
			}
			// 验证码优化
			if(_userAuth==''|| _userAuth=="请输入验证码"){
				$('.fail_tip p').text('请输入验证码');
				$('.fail_tip').show();
				$(".cover").show();
				setInterval('Hid()', 3000);
				return false;
			}else if(yzm = "" || _userAuth != yzm){
				$('.fail_tip p').text('手机验证码不正确');
				$('.fail_tip').show();
				$(".cover").show();
				setInterval('Hid()', 3000);	
				return false;
			}
			if ($('.label_name').hasClass('cur')) {
				if (_userName == '' || _userName == '请输入名称') {
					$('.fail_tip p').text('请输入名称');
					$(".cover").show();
					$('.fail_tip').show();
					setInterval('Hid()', 3000);
					return false;
				} else {
					bm();
				}
			} else if ($('.other').hasClass('cur')) {
				bm();
			} else {
				$('.fail_tip p').text('请选择类型');
				$('.fail_tip').show();
				$(".cover").show();
				setInterval('Hid()', 3000);
				return false;
			}
		});

	})

	function Hid() {
		$('.fail_tip').hide();
		$(".cover").hide();
	}
	

	var timer1;

	function getValidCode() {
		timer1 = setInterval(ChangeTime, 1000);
	}

	function ChangeTime() {
		var second = parseInt($(".get_code").attr("obj"));
		;
		if (second > 0) {
			second = second - 1;
			$(".get_code").html('重发' + second + "(秒)");
			$(".get_code").attr("obj", second);
		}
		if (second == 0) {
			$(".get_code").text('获得');
			$(".get_code").attr("obj", 60);
			clearInterval(timer1);
		}
	}
	
	$(".fail_tip").click(function(){
		$('.fail_tip').hide();
		$(".cover").hide();
	});
	$(".cover").click(function(){
		$('.fail_tip').hide();
		$(".cover").hide();
	});
	
	
</script>