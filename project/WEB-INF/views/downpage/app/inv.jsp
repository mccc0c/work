<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" trimDirectiveWhitespaces="true" isELIgnored="false" %>
<%@ include file="../../include/header.jsp" %>
<%
    jspContext.addCssRef("css/downpage/app/downpage.css");
	jspContext.addJSRef("js/frame/jquery.js");
	jspContext.addJSRef("js/downpage/app/downpage.js");
 %>
		<div class="sectiontzz_one">
        	<div class="tzz1">
            	<img src="../../../../images/downpage/app/inv02.png" />
            </div>
    	</div>
    	<div class="sectiontzz2">&nbsp;</div>
    	<div class="sectiontzz3">
        	<div class="s3a">
            	<img src="../../../../images/downpage/app/inv05.png" />
        	</div>
        	<div class="s3b">
            	<img src="../../../../images/downpage/app/inv09.png" />
        	</div>
        	<div class="s3c"  style="display:none" id="android_down">
        		<input type="hidden" id="appType" value="2">
            	<a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.easyrongfund">
                	<img src="../../../../images/downpage/app/android.png" />
                </a>
        	</div>
        	<div class="s3c"   style="display:none"  id ="ios_down">
            	<a href="#" onclick="goInv()">
                	<img src="../../../../images/downpage/app/ios.png" />
                </a>
        	</div>
    	</div>
    <%@ include file="../../include/statistical/footer.jsp" %>
	</body>
	<title>一融-投资者</title>
</html>
