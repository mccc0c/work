<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" trimDirectiveWhitespaces="true" isELIgnored="false" %>
<%@ include file="../include/header.jsp" %>
<%
	jspContext.addCssRef("css/competition/competition.css");
	jspContext.addJSRef("js/frame/jquery.js");
	jspContext.addJSRef("js/competition/competition.js");
 %>
		<div class="main">
			<section>
				<div class="baisc_bg_image">
					<img src="../../images/competition/main.jpg" alt="">
				</div>
			</section>
			<section>
				<form name="searchForm" action="${basePath}competition/search" method="post">
					<div class="basic_banner"> 
						<div class="banner_input">
							<input id="input_content" type="text"  name="keyword" placeholder="输入你的企业名称" />
							<input type="hidden"  name="source" value="Banner"/>
							<input id="search" type="submit" style="display:none;">
						</div>
						<div class="banner_select">
							<!--提交是用banner_content 类触发或者在下方标签中点击id 用id触发 -->
							<a id="competitionSearch">
								<div class="banner_content">
									立即查询
								</div>
							</a>
						</div>
					</div>
				</form>
			</section>
			<!-- 提示层 -->
			<section>
				<div class="cover"></div>
				<div class="prompted">
					<div class="points_content">
						请输入企业名称
					</div>
				</div>
			</section>
		</div>
	<%@ include file="../include/statistical/footer.jsp" %>
	</body>
	<title>2016上海创新创业大赛决赛优胜名单</title>
</html>