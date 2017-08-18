<%@ page language="java" contentType="text/html;charset=UTF-8"
	pageEncoding="UTF-8" trimDirectiveWhitespaces="true"
	isELIgnored="false"%>
<%@ include file="../include/header.jsp"%>
<%
    jspContext.addCssRef("css/incubator/incubatorDetail.css");
    jspContext.addJSRef("js/frame/jquery.js");
    jspContext.addJSRef("js/frame/jquery.lazyload.js");
    jspContext.addJSRef("js/incubator/incubatorDetail.js");
%>
<div class="main">
	<!-- app link 用到变量-->
	<c:set var="appLinkType" value="6007" />
	<c:set var="detailId" value="${detail.id}"/>
	<c:set var="otherValue" value="-1"/>
	
	<section name="" id="" class="fhq_basic">
		<div class="basic_img_head_fhq">
			<div class="img_head_fhq">
				<img src="${detail.logoUrl}" max-height="100%" alt="">
				<%-- <img src="${basePath}/images/incubator/head.png" max-height="100%" alt=""> --%>
			</div>
		</div>
		<div class="baisc_head_content">
			<div class="head_message_fhq">
				<p>${detail.name}</p>
			</div>
			<div class="basic_buttom">
				<div class="basic_content basic_content1">
					<i class="map_icon icon_format"></i>
				</div>
				<div class="basic_content basic_content1">
					<!-- <p class="weizhi">&nbsp;上海&nbsp;闵行区</p> -->
					<p class="weizhi">&nbsp;${detail.displayRegion}</p>
				</div>
			</div>
		</div>
	</section>
	<section class="common_label">
		<div class="common_content">
			<div class="hangye font_format3">
				<div class="basic_content3">
					<i class="zhufcy_icon icon_format1"></i>
				</div>
				<div class="hangye_content3">
					<h4>主孵产业</h4>
					<p class="p_height">${detail.displayIndustries}</p>
				</div>
			</div>
		</div>
		<div class="common_content">
			<div class="hangye font_format">
				<div class="basic_content3">
					<i class="chenglsj_icon icon_format1"></i>
				</div>
				<div class="hangye_content3">
					<h4>成立时间</h4>
					<p class="p_height">${detail.createTime}</p>
				</div>
			</div>
		</div>
	</section>
	<section class="common_label">
		<div>
			<c:choose>
				<c:when test="${appVersion>=1}">
					<a onclick="easyrong.locate('${detail.address}')">
				</c:when>
				<c:otherwise>
					<a href="http://www.easyrong.com/?addr=${detail.address}">
				</c:otherwise>
			</c:choose>
			<!-- <a href="http://www.11111.com?addr='021-45632145'"> -->
				<div class="common_content">
					<div class="hangye">
						<div class="basic_content3">
							<i class="map_icon1 icon_format"></i>
						</div>
						<div class="hangye_content3 jumpBgIcon">
							<h4>地址</h4>
							<p class="p_height">${detail.address}</p>
						</div>
					</div>
				</div>
			</a>
		</div>
		<div>
			<c:choose>
				<c:when test="${appVersion>=1}">
					<a onclick="easyrong.call('${detail.tellphoneNumber}')">
				</c:when>
				<c:otherwise>
					<a href="http://www.easyrong.com/?phone=${detail.tellphoneNumber}">
				</c:otherwise>
			</c:choose>
			<!-- <a href="http://www.11111.com?addr='021-45632145'"> -->
				<div class="common_content2">
					<div class="hangye font_format">
						<div class="basic_content3">
							<i class="phone_icon icon_format1"></i>
						</div>
						<div class="hangye_content3 jumpBgIcon">
							<h4>联系电话</h4>
							<p class="p_height">${detail.tellphoneNumber}</p>
						</div>
					</div>
				</div>
			</a>
		</div>
	</section>
	<section class="common_label section_bottom">
		<h4 class="title">孵化器简介</h4>
		<div class="common_content3">${detail.introduction}</div>
		<!-- <div class="common_content3 tapTouchImage">
				<img  src="../static/yirong/images/a.jpg" alt="图片加载中" >
				后台上传的图片
			</div> -->
	</section>
	<section class="common_label section_bottom">
		<h4 class="title">孵化器设施</h4>
		<!-- <textarea readonly> -->
		<div class="common_content3">${detail.facility}</div>
		<!-- <div class="common_content3 tapTouchImage" >
					<img src="../static/yirong/images/b.jpg" alt="图片加载中" >
					后台上传的图片
				</div> -->
		<!-- </textarea> -->
	</section>
	<section class="common_label">
		<h4 class="title">入驻规则</h4>
		<div class="common_content3">${detail.condition}</div>
		<!-- <div class="common_content3 tapTouchImage">
				<img src="../static/yirong/images/c.jpg" alt="图片加载中" >
				后台上传的图片
			</div> -->
	</section>
	<!-- 增加浮动层 -->
	<section>
		<div class="cover"></div>
	</section>
</div>
<!-- App下载插件 -->
<c:if test="${isShare == 1}">
	<%
	    jspContext.addCssRef("css/downplugin/downplugin.css");
		jspContext.addJSRef("js/frame/jquery.js");	
		jspContext.addJSRef("js/downpage/app/downplugin.js");
	%>
	<%@ include file="../downplugin/invAndEntPlugin.jsp"%>
</c:if>