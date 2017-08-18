<!--引入的公共部分-->
<%@ page language="java" contentType="text/html;charset=UTF-8"
	pageEncoding="UTF-8" trimDirectiveWhitespaces="true"
	isELIgnored="false"%>
<%@ include file="../include/header.jsp"%>
<!--引入对应的css和js文件-->
<%
    jspContext.addCssRef("css/activity/common.css");
    jspContext.addCssRef("css/activity/sign.css");
%>
<div class="wrapper">
	<section>
		<div class="sign_success">
			<i class="success_icon"></i>
			<h3 class="sign_h3">您已成功申请活动</h3>
			<p class="sign_p">请等待审核</p>
			<div class="warm_tip">
				<h3>温馨提示</h3>
				<p>活动报名进度，可以在【助理】-【待办】以及【会员中心】-【我的活动】中进行查看</p>
			</div>
		</div>
	</section>
</div>
<%@ include file="../include/statistical/footer.jsp" %>
</body>
<title>提交成功</title>
</html>