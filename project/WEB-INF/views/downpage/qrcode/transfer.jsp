<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" trimDirectiveWhitespaces="true" isELIgnored="false" %>
<%@ include file="../../include/header.jsp" %>
<%
    jspContext.addCssRef("css/downpage/app/downpage.css");
	jspContext.addJSRef("js/frame/jquery.js");
	jspContext.addJSRef("js/downpage/app/downpage.js");
 %>
		<div class="main">
			<!-- app link 用到变量-->
			<c:set var="appLinkType" value="${detail.type}" />
			<c:set var="detailId" value="${detail.id}"/>
			<c:set var="otherValue" value="${detail.otherValue}"/>
			<!-- APP下载提示 -->
			<%
				jspContext.addCssRef("css/downplugin/downplugin.css");
				jspContext.addJSRef("js/frame/jquery.js");	
				jspContext.addJSRef("js/downpage/app/downplugin.js");
			%>
			<c:if test="${detail.transferType == 1}">
				<%@ include file="../../downplugin/entPlugin.jsp" %>
			</c:if>
			<c:if test="${detail.transferType == 2}">
				<%@ include file="../../downplugin/invPlugin.jsp" %>
			</c:if>
		</div>
	<%@ include file="../../include/statistical/footer.jsp" %>
	</body>
	<title>一融-创业者</title>
</html>
<script language="javascript" type="text/javascript">
	window.location.href = $(".basic_tap_right").attr("href");
</script> 
