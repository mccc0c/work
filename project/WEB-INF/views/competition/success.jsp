<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" trimDirectiveWhitespaces="true" isELIgnored="false" %>
<%@ include file="../include/header.jsp" %>
<%
	jspContext.addCssRef("css/competition/searchResult.css");
 %>
		<div class="main">
			<section>
				<div class="baisc_bg_image">
					<img src="../../images/competition/success.jpg" alt="">
				</div>
			</section>
			<section>
				<form action="">
					<div class="basic_banner"> 
						<div class="banner_select">
							<a href="http://ent.h5.easyrong.com/fund/guide">
								<div class="banner_content">
									立即测试
								</div>
							</a>
						</div>
					</div>
				</form>
			</section>
			<!-- 上previous_image.png一页图标 -->
		    <section>
		      <div class="previous_image">
		        <a href="${basePath}competition/view"><img src="../images/competition/back.png" alt=""></a>
		      </div>
		    </section>
		</div>
	<%@ include file="../include/statistical/footer.jsp" %>
	</body>
	<title>恭喜贵公司入围</title>
</html>