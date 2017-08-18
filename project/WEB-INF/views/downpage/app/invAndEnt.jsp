<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" trimDirectiveWhitespaces="true" isELIgnored="false" %>
<%@ include file="../../include/header.jsp" %>
<%
    jspContext.addCssRef("css/downpage/app/downpageInvAndEnt.css");
	jspContext.addJSRef("js/downpage/app/downpage.js");
 %>
		<div class="main">
			<section>
				<div class="head_images">
					<img src="../../../../images/downpage/app/bgEnt.jpg" alt="">
				</div>
		</section>
		<section>
			<div class="basic_content_one">
				<div>
					<h3>一融创业者</h3>
				</div>
				<div class="content_yirong">
					<p>
						想要解决公司在融资上市等方面遇到的难题，快来下载一融创业者APP吧！<span class="fontstyle_one">&quot知名导师等你约谈&quot</span>
					</p>
				</div>
				<div class="content_images">
					<div class="flex_images_one">
						<a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.easyrongchuangye">
							<img src="../../../../images/downpage/app/android.jpg" alt="">
						</a>
					</div>
					<div class="flex_images_two">
						<a href="#" onclick="goEnt()">
							<img src="../../../../images/downpage/app/ios.jpg" alt="">
						</a>
					</div>
				</div>
			</div>
		</section>
		<section>
			<div class="head_images">
				<img src="../../../../images/downpage/app/bgInv.jpg" alt="">
			</div>
		</section>
		<section>
			<div class="basic_content_two">
				<div><h3>一融投资者</h3>	</div>
				<div class="content_yirong">
					<p>
						想要挑选出颇具潜力的优质项目，快来下载一融投资者APP吧！<span class="fontstyle_two">&quot海量项目等你挑选&quot</span>
					</p>
				</div>
				<div class="content_images">
					<div class="flex_images_one">
						<a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.easyrongfund ">
							<img src="../../../../images/downpage/app/android.jpg" alt="">
						</a>
					</div>
					<div class="flex_images_two">
						<a href="#" onclick="goInv()">
							<img src="../../../../images/downpage/app/ios.jpg" alt="">
						</a>
					</div>
				</div>
			</div>
		</section>
	</div>
	<%@ include file="../../include/statistical/footer.jsp" %>
	</body>
	<title>一融-App</title>
</html>