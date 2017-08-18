<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" trimDirectiveWhitespaces="true" isELIgnored="false" %>
<%@ include file="../include/header.jsp" %>
<%
	jspContext.addCssRef("css/yrf/invDetail.css");
	jspContext.addCssRef("css/yrf/invCommon.css");
	jspContext.addCssRef("css/common/textarea.css");
 %>
		<div class="wrapper">
			<!-- App下载插件 -->
			<c:if test="${isShare == 1}">
				<%
					jspContext.addCssRef("css/downplugin/downplugin.css");
					jspContext.addJSRef("js/frame/jquery.js");	
					jspContext.addJSRef("js/downpage/app/downplugin.js");
				%>
				<%@ include file="../downplugin/entPlugin.jsp" %>
			</c:if>
    		<!--投资人详情基本信息-->
    		<section class="daoshi_basic">
    			<div class="img_head">
                	<img src="${basePath}${inv.logo}" alt="">
    			</div>
    			<div class="head_message">
                	<h3>${inv.userName}</h3>
                	<p>${inv.company } | ${inv.job}</p>
    			</div>
    			<div class="basic_bottom">
    				<div class="basic_content1 basic_content spread_line">
                    	<i class="map_icon"></i>${inv.region}
    				</div>	
    				<div class="basic_content2 basic_content spread_line">
                    	<i class="yue_icon"></i>${inv.interview} 已约
    				</div>
    				<div class="basic_content2 basic_content">
                    	<i class="focus_icon"></i>${inv.attention} 关注
    				</div>
    			</div>
    		</section>

    		<!--通用板块 投资偏好-->
    		<section class="common_label">
    			<h3 class="title">投资偏好</h3>
    			<div class="common_content">
					<div class="hangye">
						<label>关注行业</label>
						<div class="hangye_content">
							<c:forEach items="${inv.industry}" var="industry" varStatus="status">
									<span>${industry}</span>
							</c:forEach>
						</div>
					</div>
					<div class="stage">
						<label>投资阶段</label>
						<div class="stage_content">
							<div class ="${inv.investmentStage[0] > 0? 'cur' : ''}"><p class="first">天使轮</p></div>
							<div class ="${inv.investmentStage[1] > 0? 'cur' : ''}"><p class="">A轮</p></div>
							<div class ="${inv.investmentStage[2] > 0? 'cur' : ''}"><p class="">B轮</p></div>
							<div class ="${inv.investmentStage[3] > 0? 'cur' : ''}"><p class="">C轮</p></div>
							<div class ="${inv.investmentStage[4] > 0? 'cur' : ''}"><p class="last">PE</p></div>
						</div>
					</div>
    			</div>
    		</section>

	    	<!--通用板块 机构介绍-->
	    	<section class="common_label">
	    		<h3 class="title">机构介绍</h3>
	            <div class="common_content jigou_intro">
	            	<!-- p标签在父元素没有格式的情况下可以添加此类： basic_textarea -->
					<textarea readonly>${inv.description}</textarea>
	            </div>
	    	</section>

	    	<!--通用板块 投资案例-->
	    	<c:if test="${inv.cases != null && inv.cases.size() > 0}">
		    	<section class="common_label">
					<h3 class="title">投资案例</h3>
					<div class="common_content">
						<ul class="case_list">
							<c:forEach  items="${inv.cases}" var="invcase" varStatus="status">
								<li>
									<i></i>
									<span class="time"><fmt:formatDate value="${invcase.time}" pattern="yyyy-MM-dd " /></span>
									<div class="case">
			                            <b>${invcase.name}</b>
			                            <textarea class="case_chlid" readonly>${invcase.description}</textarea>
									</div>
								</li>
							</c:forEach>
						</ul>
					</div>
		    	</section>
	        </c:if>
	    </div>
	<%@ include file="../include/statistical/footer.jsp" %>
	</body>
	<title>投资人详情</title>
</html>
<%
	jspContext.addJSRef("js/common/textarea.js");
 %>