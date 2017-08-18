<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" trimDirectiveWhitespaces="true" isELIgnored="false" %>
<%@ include file="../../include/header.jsp" %>
<%
    jspContext.addCssRef("css/downpage/app/downpage.css");
	jspContext.addJSRef("js/frame/jquery.js");
	jspContext.addJSRef("js/downpage/app/downpage.js");
 %>
		<div class="section1">
	        <div class="s10">
	            <img src="../../../../images/downpage/app/ent_download.png" />
	        </div>
    	</div>
    	<div class="section2"></div>
    	<div class="section3">
        	<div class="s3a">
            	<img src="../../../../images/downpage/app/ent11.png" />
        	</div>
        	<div class="s3b">
            	<img src="../../../../images/downpage/app/ent15.png" />
        	</div>
        	<div class="s3c" style="display:none" id="android_down">
        	<input type="hidden" id="appType" value="1">
           		<a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.easyrongchuangye">
               		<img src="../../../../images/downpage/app/android.png" />
               	</a>
        	</div>
        	<div class="s3c" style="display:none"  id ="ios_down">
            	<a href="#" onclick="goEnt()"> 
            		<img src="../../../../images/downpage/app/ios.png" />
            	</a>  
        	</div>
    	</div>
    <%@ include file="../../include/statistical/footer.jsp" %>
	</body>
	<title>一融-创业者</title>
</html>
