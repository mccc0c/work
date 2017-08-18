<%@ page language="java" contentType="text/html;charset=UTF-8"
	pageEncoding="UTF-8" trimDirectiveWhitespaces="true"
	isELIgnored="false"%>
<%@ include file="../include/header.jsp"%>
<%
    jspContext.addCssRef("css/inquiry/wenZhenDaoShi.css");
    jspContext.addCssRef("css/common/textarea.css");
    jspContext.addJSRef("js/frame/jquery.js");
%>
<div class="main">
		<!-- app link 用到变量-->
	<c:set var="appLinkType" value="6008" />
	<c:set var="detailId" value="-1"/>
	<c:set var="otherValue" value="-1"/>
	
	<section name="" id="" class="wenzds_basic">
		<div class="img_head">
			<img src="../../images/inquiry/image_head.jpg" max-height="35%"
				alt="">
		</div>
	</section>
	<!-- 服务价格 -->
	<section>
		<div class="basic_fuwujg">

			<p class="fuwujg">
				服务价格&nbsp; <span class="fuwujg1">￥</span><span class="fuwujg2">999</span>
			</p>
		</div>
	</section>
	<!-- 服务形式 -->
	<section>
		<div class="basic_fuwuxs">
			<div class="head_fuwuxs">服务形式</div>
			<div class="content_fuwuxs">专业诊断报告 + 1vs1 在线辅导 （1 小时）</div>
		</div>
	</section>
	<!-- 问诊可选类别 -->
	<section>
		<div class="basic_menzhenkxlb">
			<div class="head_menzhenkxlb">问诊可选类别</div>
			<div class="content_menzhenkxlb">
				<div class="buju_menzhenkxlb top_menzhenkxlb">
					<div>融资规划</div>
					<div>财税咨询</div>
					<div>企业发展</div>
				</div>
				<div class="buju_menzhenkxlb bottom_menzhenkxlb">
					<div>上市法律</div>
					<div>知识产权</div>
					<div>其他</div>
				</div>
			</div>
		</div>
	</section>
	<!-- 问诊导师 -->
	<section>
		<div class="basic_wenzhends">
			<div class="head_wenzhends">问诊导师</div>
			<div class="content_wenzhends">
				服务导师均来自各大知名投资机构，我们将根据你的问诊需求分配最合适的导师为您服务。</div>
		</div>
	</section>
	<!-- 导师来源 -->
	<section>
		<div class="basic_daoshily">
			<div class="head_daoshily">导师来源</div>
			<div class="content_daoshily">
				<img src="../../images/inquiry/fortune_icon.png" alt="加载中"> <img
					src="../../images/inquiry/fosun_icon.png" alt="加载中"> <img
					src="../../images/inquiry/eju_icon.png" alt="加载中"> <img
					src="../../images/inquiry/htzq_icon.png" alt="加载中"> <img
					src="../../images/inquiry/cosfne_icon.png" alt="加载中"> <img
					src="../../images/inquiry/ggv_icon.png" alt="加载中"> <img
					src="../../images/inquiry/citic_icon.png" alt="加载中"> <img
					src="../../images/inquiry/gengduo_icon.png" alt="加载中">
			</div>
		</div>
	</section>
	<!-- 服务流程 -->
	<section>
		<div class="basic_fuwulc">
			<div class="head_fuwulc">服务流程</div>
			<div class="fuwulc">
				<img src="../../images/inquiry/image_bottom.jpg" max-height="35%"
					alt="">
			</div>
		</div>
	</section>
</div>
<%@ include file="../include/statistical/footer.jsp" %>
</body>
<title>快速问诊</title>
</html>
<%
	jspContext.addJSRef("js/common/textarea.js");
 %>