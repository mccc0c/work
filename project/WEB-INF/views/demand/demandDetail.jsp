<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" trimDirectiveWhitespaces="true" isELIgnored="false" %>
<%@ include file="../include/header.jsp" %>
<%
    jspContext.addCssRef("css/demand/demand.css");
	jspContext.addCssRef("css/common/textarea.css");
	jspContext.addJSRef("js/frame/jquery.js");
 %>
		<div class="wrapper">
			<!-- app link 用到变量-->
			<c:set var="appLinkType" value="6006" />
			<c:set var="detailId" value="${detail.demandId}"/>
			<c:set var="otherValue" value="-1"/>
			<!-- App下载插件 -->
			<c:if test="${isShare == 1}">
				<%
					jspContext.addCssRef("css/downplugin/downplugin.css");
					jspContext.addJSRef("js/frame/jquery.js");	
					jspContext.addJSRef("js/downpage/app/downplugin.js");
				%>
				<%@ include file="../downplugin/invPlugin.jsp" %>
			</c:if>
			<!--项目-->
			<section class="p_detail">
				<h3>${detail.demandName}</h3>
				<div class="money">
					<p>融资额度</p>
					<p><b>${detail.investmentAmount}</b><!-- 万以上 --></p>
					<p class="submit_time">发布时间：${detail.releaseTime}</p>
				</div>
				<div class="project_opacity">
					<div class="spread_line view_icon">${detail.seeNum} 查看</div>
					<div class="response_icon">${detail.responseNum} 响应</div>
				</div>
			</section>
			<!--阶段-->
			<section class="common_label">
				<div class="common_content">
					<ul class="investment_list">
						<li>
							<i class="industry_icon"></i>
							<div>
								<h3>投资行业</h3>
								<p>${detail.investmentIndustries}</p>
							</div>
						</li>
						<li>
							<i class="stage_icon"></i>
							<div>
								<h3>投资阶段</h3>
								<p>${detail.investmentStages}</p>
							</div>
						</li>
						<li>
							<i class="area_icon"></i>
							<div>
								<h3>投资地区</h3>
								<p>${detail.investmentAreas}</p>
							</div>
						</li>
					</ul>
				</div>
			</section>
			<!--需求描述-->
			<section class="common_label need_label">
				<h3 class="title">需求描述</h3>
				<p class="basic_textarea">
					<textarea readonly>${detail.demandIntroduce}</textarea>
				</p>
			</section>
			<!--退回-->
			<c:if test="${demandMode==1 || demandMode==3 || demandMode==4}">
				<section class="res_return" id="demandSts">${detail.demandStatus}</section>
			</c:if>
		</div>
	<%@ include file="../include/statistical/footer.jsp" %>
	</body>
	<title>${detail.demandName}</title>
</html>
<%
	jspContext.addJSRef("js/common/textarea.js");
 %>
<script type="text/javascript" src="http://wechat.easyrong.com/js/mp/share.js" ></script>
<script>
	var shareInfo = {
		title : '${detail.demandName}', // 分享标题
		/*link : 'http://market.easyrong.com/api/bigShot/accountReceivable/detail', // 分享链接**/	
		imgUrl : '${basePath}' + 'images/demand/bgDetail.png',
		desc : '${detail.demandIntroduce}', // 分享描述
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