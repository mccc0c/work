<%@ page language="java" contentType="text/html;charset=UTF-8"
	pageEncoding="UTF-8" trimDirectiveWhitespaces="true"
	isELIgnored="false"%>
<%@ include file="../include/header.jsp"%>
<%
    jspContext.addCssRef("css/inquiry/common.css");
	jspContext.addCssRef("css/inquiry/wenzapplay.css");
	jspContext.addCssRef("css/common/textarea.css");
	jspContext.addJSRef("js/frame/jquery.js");
%>
<div class="main">
	<!-- app link 用到变量-->
	<c:set var="appLinkType" value="6009" />
	<c:set var="detailId" value="${detail.id}"/>
	<c:set var="otherValue" value="-1"/>
	
	<section name="" id="" class="paysuc_basic spread_line">
		<div class="basic_buttom spread_line_buttom1">
			<div class="basic_content basic_content1">问诊费用</div>

			<div class="basic_content basic_content2">
				<p class="fontstyle">${detail.amount}元</p>
			</div>
		</div>
		<div class="basic_buttom">
			<div class="basic_content basic_content1">问诊类型</div>

			<div class="basic_content basic_content2">
				<p class="fontstyle1">${detail.questionType}</p>
			</div>
		</div>
	</section>
	<section name="" id="" class="paysuc_basic spread_line">
		<div class="basic_buttom spread_line_buttom1">
			<div class="basic_content basic_content1">企业介绍</div>
		</div>
		<p class="basic_textarea">
			<textarea readonly>${detail.introduction}</textarea>
		</p>
	</section>
	<section name="" id="" class="paysuc_basic spread_line">
		<div class="basic_buttom spread_line_buttom1">
			<div class="basic_content basic_content1">问诊内容</div>
		</div>
		<p class="basic_textarea">
			<textarea readonly>${detail.questionContent}</textarea>
		</p>
	</section>
</div>
<%@ include file="../include/statistical/footer.jsp" %>
</body>
<title>问诊详情</title>
</html>
<%
	jspContext.addJSRef("js/common/textarea.js");
 %>