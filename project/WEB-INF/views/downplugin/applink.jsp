<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" trimDirectiveWhitespaces="true" isELIgnored="false" %>
<%@ include file="../include/header.jsp" %>
	<input type="hidden"  id="applink" value='${applink}'/>
	</body>
	<title>一融-创业者</title>
</html>

<script type="text/javascript">
	//alert(document.getElementById("applink").value);
	easyrong.getAppLink(document.getElementById("applink").value);
</script> 