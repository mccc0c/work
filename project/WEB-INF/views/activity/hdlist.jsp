<!--引入的公共部分-->
<%@ page language="java" contentType="text/html;charset=UTF-8"
	pageEncoding="UTF-8" trimDirectiveWhitespaces="true"
	isELIgnored="false"%>
<%@ include file="../include/header.jsp"%>
<!--引入对应的css和js文件-->
<%
    jspContext.addCssRef("css/activity/common.css");
			jspContext.addJSRef("js/activity/jquery.min.js");
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
	<c:if test="${commonInfo.isTitle == 0}">
		<header id="header" class="header">
			一融活动 <a href="javascript:history.go(-1)" class="return"> &lt; </a>
		</header>
	</c:if>
	<section class="common_label new_common">
		<div class="activity_number">
			<div class="activity_number_left">全部活动共 ${count} 条</div>
			<div class="activity_number_right" data-id="1">
				<p>
					<i></i>
				</p>
				<c:set var="mainValue" value="中国"></c:set>
				<c:out
					value="${cityName2 !=null && cityName2 !='' && cityName2 != mainValue ? cityName2 : '全国'}"></c:out>
			</div>
		</div>
	</section>
	<!--本地推荐-->
	<c:if test="${count > 0}">
		<section class="common_label">
			<div class="">
				<div>
					<ul class="tao_recommend" id="thelist">
						<c:forEach items="${list}" var="item">
							<c:choose>
								<c:when test="${item.ck == 3}">
									<c:set var="css" value="ing"></c:set>
								</c:when>
								<c:when test="${item.ck == 5}">
									<c:set var="css" value="act_ing"></c:set>
								</c:when>
								<c:otherwise>
									<c:set var="css" value="finish"></c:set>
								</c:otherwise>
							</c:choose>
							<li><a
								href="${item.detailUrl}${urlCommonInfo}&id=${item.id}"><img
									src="${basePath}${item.appPic==null || item.appPic.length() == 0 ? 'images/activity/example.jpg' : item.appPic}" alt=""></a>
								<div class="biaoqian">${item.styleName}
									<div class="arrow"></div>
								</div>
								<p class="activity_adress">
									<i></i>${item.city2Name}</p>
								<h3>
									<a href="${item.detailUrl}${urlCommonInfo}&id=${item.id}">${item.title}</a>
								</h3>
								<div class="activity_message">
									<div class="activity_message_left">
										<p>活动时间： ${item.hdDisplayTime}</p>
										<em>报名人数： <c:out value="${item.bmNum}"></c:out> <c:if
												test="${item.isBm == 1 }">
												<span>已报名</span>
											</c:if>
										</em>
										<p class="${css}">
											<c:out value="${item.ckName}"></c:out>
										</p>
									</div>
								</div></li>
						</c:forEach>
					</ul>
					<div id="pullUp"></div>
				</div>
			</div>
		</section>
	</c:if>
</div>

<!--全国-->

<div class="area" id="J_area">
	<div class="location">
		<i class="icon-location"></i>当前地区：<span id="J_city_name">上海</span>
	</div>
	<div class="area-wrapper">
		<div class="area-prov">
			<div class="scroll-outer" id="J_scroll_outer">
				<ul class="scroll-inner" id="J_scroll_inner">
				</ul>
			</div>
		</div>
		<div class="area-city">
			<div class="scroll-outer" id="J_scroll_outer_2">
				<ul class="scroll-inner" id="J_scroll_inner_2">
				</ul>
			</div>
		</div>
	</div>
</div>
<%@ include file="../include/statistical/footer.jsp" %>
</body>
</html>
<script type="text/javascript">
	(function() {
		var city_url = "/region/search";
		var iTop = $('#header').height() + $('#J_common').outerHeight(), iHeight = $(
				window).height()
				- $('.nav').outerHeight() - iTop, options = {}, options2 = {}, scrollWrap = document
				.getElementById('J_scroll_outer'), scrollElem = document
				.getElementById('J_scroll_inner'), scrollWrap2 = document
				.getElementById('J_scroll_outer_2'), scrollElem2 = document
				.getElementById('J_scroll_inner_2'), n = 1;

		var tourl = '/activity/list${urlCommonInfo}';

		$('.activity_number_right')
				.on(
						'click',
						function() {
							// ajax by jemmy
							var str = '';
							$
									.getJSON(
											city_url + '?regionId=1',
											function(jsonData) {
												for ( var o in jsonData) {
													if (jsonData[o].name == '北京') {
														str += '<li class="active" data-id="'
															+ jsonData[o].id
															+ '">'
																+ jsonData[o].name
																+ '</li>';
													} else {
														str += '<li data-id="'
															+ jsonData[o].id
															+ '">'
																+ jsonData[o].name
																+ '</li>';
													}
												}
												$('#J_scroll_inner').html('')
														.html(str);

												$('#J_scroll_inner li')
														.on(
																'click',
																function() {
																	var _id = $(
																			this)
																			.attr(
																					'data-id'), sURL = city_url
																			+ '?regionId='
																			+ _id
																			+ '', dom = '';

																	$(this)
																			.addClass(
																					'active')
																			.siblings()
																			.removeClass(
																					'active');
																	$(
																			'#J_city_name')
																			.html(
																					$(
																							this)
																							.html());

																	$
																			.getJSON(
																					sURL,
																					function(
																							data) {
																						for ( var attr in data) {
																							dom += '<li><a href="'
																								+ tourl
																								+ '&c1='
																								+ _id
																								+ '&c2='
																								+ data[attr].id
																								+ '&c3=0">'
																									+ data[attr].name
																									+ '</a></li>';
																						}
																						$(
																								'#J_scroll_inner_2')
																								.html(
																										'')
																								.html(
																										dom);
																					});
																}).eq(0)
														.trigger('click');
											});
							var scroll, scroll2;

							$('#J_area').show();
							$('#J_area').css({
								top : iTop,
								height : iHeight
							});

							scroll = new anima_ctrl.scrollview(scrollWrap,
									options);
							scroll2 = new anima_ctrl.scrollview(scrollWrap2,
									options2);

							scroll.init();
							scroll2.init();
						});
	}());
</script>