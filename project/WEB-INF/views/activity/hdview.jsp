<!--引入的公共部分-->
<%@ page language="java" contentType="text/html;charset=UTF-8"
	pageEncoding="UTF-8" trimDirectiveWhitespaces="true"
	isELIgnored="false"%>
<%@ include file="../include/header.jsp"%>
<!--引入对应的css和js文件-->
<%
    jspContext.addCssRef("css/activity/common.css");
			jspContext.addCssRef("css/activity/download_yrb.css");
			jspContext.addCssRef("css/activity/activity_details_new.css");
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
	<c:if test="${commonInfo.isTitle == 0 && commonInfo.userType !=5}">
		<header id="header" class="header header_other">
			活动详情 <a href="javascript:history.go(-1)" class="return"> &lt; </a>
		</header>
		<!-- /header -->
	</c:if>
	<!-- app link 用到变量-->
	<c:set var="appLinkType" value="6002" />
	<c:set var="detailId" value="${detail.id}" />
	<c:set var="otherValue" value="-1" />

	<!-- App下载插件 -->
	<c:if test="${isShare == 1}">
		<%
		    jspContext.addCssRef("css/downplugin/downplugin.css");
						jspContext.addJSRef("js/frame/jquery.js");
						jspContext.addJSRef("js/downpage/app/downplugin.js");
		%>
		<c:if test="${detail.vtype == 4}">
			<%@ include file="../downplugin/entPlugin.jsp"%>
		</c:if>
		<c:if test="${detail.vtype == 5}">
			<%@ include file="../downplugin/invPlugin.jsp"%>
		</c:if>
	</c:if>

	<section>
		<div class="basic_img_opt">
			<img
				src="${basePath}${detail.appPic==null || detail.appPic.length() == 0 ? 'images/activity/example.jpg' : detail.appPic}"
				alt="" onerror='this.src="${basePath}images/activity/example.jpg"'>
			<div class="biaoqian">
				${detail.styleName}
				<div class="arrow"></div>
			</div>
		</div>
	</section>
	<section>
		<div class="basic_head_style_opt">
			<div class="basic_head_title_opt">${detail.title}</div>
			<div class="basic_head_list_opt">
				<div class="basic_head_left_opt">
					报名${detail.bmNum}人<span>&nbsp&nbsp</span>浏览${detail.click}次
				</div>
				<div class="basic_head_right_opt">报名截止到
					${detail.bmEndDisplayTime}</div>
			</div>
		</div>
	</section>
	<section>
		<div class="basic_mid_opt">
			<div class="basic_mid_top_opt">
				<div class="basic_mid_tile_opt">${detail.city2Name}<span>&nbsp</span>${detail.city3Name}</div>
				<div class="basic_mid_list_opt">${detail.hdAddr}</div>
			</div>
			<div class="basic_mid_bottom_opt">

				<div class="basic_mid_tile_opt">${detail.hdDisplayTime}</div>
				<c:if test="${detail.hdTime != null && detail.hdTime != ''}">
					<div class="basic_mid_list_opt">${detail.hdTime}</div>
				</c:if>
			</div>
		</div>
	</section>

	<!--活动详情-->
	<section class="common_label pt0 common_img"
		style="margin-bottom: 50px;">
		<div class="title">活动详情</div>
		<article>${detail.content}</article>
	</section>

	<c:if test="${commonInfo.userType != 6}">
		<!--报名环节-->
		<section class="common_label new_common"
			style="border-bottom: 0; margin-bottom: 0; position: fixed; bottom: 0; left: 0; width: 100%">
			<div class="opt_box">
				<c:choose>
					<c:when test="${detail.isBm == 1}">
						<div class="sign_box sign_finish">已报名</div>
					</c:when>
					<c:when test="${detail.ck == 2}">
						<c:if test="${appType == -1 || appType == 1 || appType == 3}">
							<div class="sign_box" style="background: #fc5656">报名尚未开始</div>
						</c:if>
						<c:if test="${appType == 2 || appType == 4}">
							<div class="sign_box" style="background: #ff6000">报名尚未开始</div>
						</c:if>
					</c:when>
					<c:when test="${detail.ck > 3}">
						<div class="sign_box sign_finish">报名已截止</div>
					</c:when>
					<%-- <c:when test="${commonInfo.isLogin == 0}">
					</c:when> --%>
					<c:otherwise>
						<c:if test="${appType == -1 || appType == 1 || appType == 3}">
							<div class="sign_box" style="background: #fc5656">
								<a href="${detail.bmUrl}${urlCommonInfo}&id=${detail.id}">我要报名</a>
							</div>
						</c:if>
						<c:if test="${appType == 2 || appType == 4}">
							<div class="sign_box" style="background: #ff6000">
								<a href="${detail.bmUrl}${urlCommonInfo}&id=${detail.id}">我要报名</a>
							</div>
						</c:if>
					</c:otherwise>
				</c:choose>

				<c:if test="${commonInfo.userType != 5}">
					<%-- <c:if test="${detail.isSc == 1}"> --%>
					<%-- <div class="collection spread_line already_concerned tap_concerned" onclick="sc(${detail.scId},${appVersion});"
							style="cousor: hand">
							<i class="collect_icon2"></i> 已关注
						</div> --%>
					<%-- </c:if> --%>
					<%-- <c:if test="${detail.isSc != 1}"> --%>
					<%-- <div class="collection spread_line concerned tap_concerned" onclick="sc(0,${appVersion});"
							style="cousor: hand">
							<i class="collect_icon"></i> 关注
						</div> --%>
					<%-- </c:if> --%>
					<c:choose>
						<c:when test="${appVersion>=1}">
						</c:when>
						<c:otherwise>
							<div class="share">
								<a
									href="/activity!@${detail.title}!@${pageScope.basePath}activity/detail?isLogin=0&userId=0&userType=5&userAcc=0&userMobile=0&city1=0&city2=0&city3&isTitle=0&id=${detail.id}!@${basePath}${detail.appPic==null || detail.appPic.length() == 0 ? 'images/activity/example.jpg' : detail.appPic}!@${detail.styleName}!@${detail.hdTime}"
									target="_blank"><i class="share_icon"></i>分享</a>

							</div>
						</c:otherwise>
					</c:choose>
				</c:if>
			</div>
		</section>
	</c:if>
</div>

<%@ include file="../include/statistical/footer.jsp"%>
</body>
<title>${detail.title}</title>
</html>
<script type="text/javascript" src="http://wechat.easyrong.com/js/mp/share.js" ></script>
<script>
	// 全局变量
	var scurl = '';
	// 初始化脚本
	$(function() {
		initView();
	})
	// 初始化函数
	function initView() {
		var x = "${detail.isSc}";
		if (x == 1) {
			$(".concerned").hide()
			$(".already_concerned").show();
		} else {
			$(".already_concerned").hide();
			$(".concerned").show()
		}
		scurl = "/activity/${detail.isSc == 0 ? 'follow' : 'follow/cancel'}${urlCommonInfo}&id=${detail.isSc == 0 ? detail.id : detail.scId}";
	}

	// 初始化函数
	function reInitView(detail) {
		var x = detail.isSc;
		if (x == 1) {
			$(".concerned").hide()
			$(".already_concerned").show();
		} else {
			$(".already_concerned").hide();
			$(".concerned").show()
		}
		var element = detail.isSc == 0 ? 'follow' : 'follow/cancel';
		var id = detail.isSc == 0 ? detail.id : detail.scId;
		scurl = "/activity/" + element + "${urlCommonInfo}&id=" + id;
	}

	//var scurl="/activity/${detail.isSc == 0 ? 'follow' : 'follow/cancel'}${urlCommonInfo}&id=${detail.isSc == 0 ? detail.id : detail.scId}";
	/* 	function sc(x,appVersion){
	 // var x="${detail.isSc}";
	 $.get(scurl,function(result){
	 text=(result=='删除成功！')?'取消关注成功！':((result=='删除失败！')?'取消关注失败！':result);
	 if (text=='用户ID错误或未登录,请先登录APP！'){
	 if (appVersion >= 1) {
	 easyrong.gotoview('1');
	 } else {
	 alert(text);
	 }
	 }else{
	 if($(".already_concerned").hasClass("init_concerned")){
	 $(".already_concerned").hide();
	 $(".concerned").show()
	 $(".already_concerned").removeClass("init_concerned");
	 $(".concerned").addClass("init_concerned");
	 }else{
	 $(".concerned").hide()
	 $(".already_concerned").show();
	 $(".concerned").removeClass("init_concerned");
	 $(".already_concerned").addClass("init_concerned");
	 } 
	 }
	 });
	 } */
	function sc(x, appVersion) {
		$
				.get(
						scurl,
						function(result) {
							text = (result == '删除成功！') ? '取消关注成功！'
									: ((result == '删除失败！') ? '取消关注失败！' : result);
							if (text == '用户ID错误或未登录,请先登录APP！') {
								if (appVersion >= 1) {
									easyrong.gotoview('1');
								} else {
									alert(text);
								}
							} else {
								$
										.ajax({
											type : "get",
											url : "/activity/detail/info?${urlCommonInfo}&id=${detail.id}",
											async : true,
											success : function(detail) {
												reInitView(detail);
												$(".look_num").html(
														detail.click);
											},
											error : function() {
												alert("调用请求失败");
											}

										})
							}
						});
	}
	 
	var shareInfo = {
		title : '${detail.title}', // 分享标题
		/*link : 'http://market.easyrong.com/api/bigShot/accountReceivable/detail', // 分享链接**/	
		imgUrl : "${basePath}${detail.appPic==null || detail.appPic.length() == 0 ? 'images/activity/example.jpg' : detail.appPic}",
		desc : '最热门的创业活动都在这里！', // 分享描述
		trigger : function(res) {
		},
		success : function(res) {
		},
		cancel : function(res) {
		},
		fail : function(res) {
			alert(JSON.stringify(res));
		}
	};
	$(function(){
		wxShare(shareInfo, false);
	});
</script>