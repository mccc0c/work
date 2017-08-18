<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" trimDirectiveWhitespaces="true" isELIgnored="false" %>
<%@ include file="../include/header.jsp" %>
<%
	jspContext.addCssRef("css/yrf/tutorDetail.css");
	jspContext.addCssRef("css/yrf/tutorCommon.css");
	jspContext.addCssRef("css/yrf/tutorCommon01.css");
	jspContext.addCssRef("css/common/textarea.css");
	jspContext.addJSRef("js/frame/jquery.js");
%>
		<div class="main">
			<!-- app link 用到变量-->
			<c:set var="appLinkType" value="6001" />
			<c:set var="detailId" value="${tutor.institutionId}"/>
			<c:set var="otherValue" value="${tutor.userId == null  ? -1 : tutor.userId}"/>
			<!-- APP下载提示 -->
			<c:if test="${isShare == 1}">
				<%
					jspContext.addCssRef("css/downplugin/downplugin.css");
					jspContext.addJSRef("js/frame/jquery.js");	
					jspContext.addJSRef("js/downpage/app/downplugin.js");
				%>
				<%@ include file="../downplugin/entPlugin.jsp" %>
			</c:if>
			
			<section name="" id="" class="daoshi_basic">
				<div class="img_head">
					<img src="${basePath}${tutor.logo}" max-height="100%" alt="">
				</div>
				<div class="head_message">
					<h3>${tutor.userName}</h3>
					<p>${tutor.company}&nbsp;|&nbsp;${tutor.job}</p>
				</div>
				<div class="basic_buttom">
					<!--已约-->
					<div class="basic_content1 basic_content2 spread_line_right">
						<i class="yue_icon"></i>${tutor.orderNum}&nbsp;已约
					</div>
					<!--关注-->
					<div class="basic_content basic_content2 ">
						<i class="focus_icon"></i>${tutor.attentionNum}&nbsp;关注
					</div>
				</div>
			</section>
        	<section>
            	<div class="basic_mid">
                	<div class="bais_mid_one">
                    	<p><b>收取费用</b>&nbsp;&nbsp; <span class="fontcolor1">￥</span><span class="fontcolor">${tutor.price}</span> <span class="fontsize">/次&nbsp;(约1小时)</span></p>
                </div>
                <div class="bais_mid_two">
                    <div class="mid_content_one"><b>问诊类型</b></div>
                    <div class="mid_content_two">
                       	<c:if test="${tutor.preferences != null}">
                       		<c:forEach items="${tutor.preferences}" var="per" varStatus="status">
                       			<p>${per}</p>
                       		</c:forEach>
                       	</c:if>
                    </div>
                </div>
            </div>
        	</section>
			<!-- 简介 -->
			<section class="common_label">
				<p class="title1"><b>简介</b></p>
				<div class="common_content">
					<div class="hangye">
						<div class="hangye_content fontsize">
	                        <textarea readonly>${tutor.description}</textarea>
						</div>
					</div>
				</div>
			</section>
	        <!-- 擅长问诊 -->
			<section class="common_label">
				<p class="title1"><b>擅长问诊</b></p>
				<div class="common_content">
					<div class="hangye">
						<div class="hangye_content fontsize">
							<!-- basic_textarea类暂时不用 -->
	                        <textarea readonly>${tutor.goodRange}</textarea>
						</div>
					</div>
				</div>
			</section>
	        <!-- 问诊案例 -->
	        <c:if test="${tutor.cases !=null && tutor.cases.size() > 0}">
		 		<section class="common_label">
					<p class="title1"><b>问诊案例</b></p>
					<div class="common_content">
						<ul class="case_list">
							<c:forEach items="${tutor.cases}" var="tucase" varStatus="status">
								<li>
									<i></i>
									<span class="time">${tucase.time}</span>
									<div class="case">
										<b>${tucase.typeName}</b>
										<textarea class="textarea_bgcolor" readonly>${tucase.content}</textarea>
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
	<title>${tutor.userName}-${tutor.company}-${tutor.job}</title>
</html>
<%
	jspContext.addJSRef("js/common/textarea.js");
 %>
 <script type="text/javascript" src="http://wechat.easyrong.com/js/mp/share.js" ></script>
<script>
	var shareInfo = {
		title : '${tutor.userName}-${tutor.company}-${tutor.job}', // 分享标题
		/*link : 'http://market.easyrong.com/api/bigShot/accountReceivable/detail', // 分享链接**/	
		imgUrl : '${basePath}${tutor.logo}',
		desc : '创业维艰，不如找个导师指指路。', // 分享描述
		trigger : function(res) {
		},
		success : function(res) {
		},
		cancel : function(res) {
		},
		fail : function(res) {
			alert(JSON.stringify(res));
		}
	};
	$(function(){
		wxShare(shareInfo, false);
	});
</script>