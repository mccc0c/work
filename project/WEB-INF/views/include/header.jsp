<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" trimDirectiveWhitespaces="true" isELIgnored="false" %>
<%@ page import="com.easyrong.h5.jsptag.JspContext" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="sf" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions"  prefix="fn"%> 
<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta name="viewport"	content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">
		<meta name="format-detection" content="telephone=no" />
		<meta name=”renderer” content=”webkit|ie-comp|ie-stand” />  
		<meta name=”renderer” content=”webkit”>
		<meta http-equiv=”X-UA-Compatible” content=”IE=Edge,chrome=1″ >
    	<%
	        JspContext jspContext = new JspContext(request, response, out);
	        String ctxPath = request.getContextPath() + "/";
	        String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + ctxPath;
    	%>
    	<script type="text/javascript">
        	var domainBasePath = '<%=basePath%>';
    	</script>
	</head>
	<c:set var="basePath" value="<%=basePath%>"/>
	<body>