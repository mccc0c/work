<%@ page language="java" contentType="text/html;charset=UTF-8"
	isELIgnored="false"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ include file="../include/header.jsp"%>
<%
    jspContext.addCssRef("css/commodity/commodityDetai_2_3_4.css");
    jspContext.addJSRef("js/frame/jquery.js");
    jspContext.addJSRef("js/commodity/commodityDetai_2_3_4.js");
%>

<div class="main">
	<!-- app link 用到变量-->
	<c:set var="appLinkType" value="6005" />
	<c:set var="detailId" value="${detail.id}" />
	<c:set var="otherValue" value="-1" />
	<!-- App下载插件 -->
	<c:if test="${isShare == 1}">
		<%
		    jspContext.addCssRef("css/downplugin/downplugin.css");
		        jspContext.addJSRef("js/frame/jquery.js");
		        jspContext.addJSRef("js/downpage/app/downplugin.js");
		%>
		<%@ include file="../downplugin/entPlugin.jsp"%>
	</c:if>

	<%-- <c:if test="${appType eq -1}">
		<section>
			<div class="basic_head_fixed">
				<a href="#basic_head_img">
					<div class="icon_head_fixed">详情</div>
				</a> <a href="#basic_QA">
					<div>Q&A</div>
				</a>
			</div>
		</section>
	</c:if> --%>
	<section>
		<%-- <c:if test="${appType eq -1}">
		<div id="basic_head_img" class="basic_head_img">
		</c:if> --%>
		<%-- <c:if test="${appType ne -1}"> --%>
		<div id="basic_head_img" class="basic_head_img_2">
		<%-- </c:if> --%>
			<img src="${detail.coverpic}" alt=""
				onerror='this.src="/images/commodity/commodity_default.png"'>
		</div>
		<div id="basic_head_content"  class="basic_head_content">
			<div class="head_content_one">${detail.title}</div>
			<c:if test="${not empty detail.jianjie}">
				<div class="head_content_two">
					<p>${detail.jianjie}</p>
				</div>
			</c:if>


			<%--一次性支付--%>
			<c:if test="${detail.payType==1}">
				<div class="head_content_four head_content_three">
				服务价格<c:if test="${!price.discount}">
						<span>${price.showPrice}</span>
					</c:if>
					<c:if test="${price.discount }">
						<span id="showPrice">${price.showPrice}</span>
						<em>${price.originPrice}</em>
					</c:if>
				</div>
			</c:if>
			<%--定金+尾款--%>
			<c:if test="${detail.payType==2}">
				<div class="head_content_three">
					首付订金<span>${price.showPrice}</span>
				</div>
				<div class="head_content_four">
					服务价格<c:choose>
							<c:when test="${not empty price.disCountPrice}">
								<span>${price.disCountPrice}</span>
								<em>${price.originPrice}</em>
							</c:when>
							<c:otherwise>
								<span>${price.originPrice}</span>
							</c:otherwise>
						</c:choose>
				</div>
			</c:if>
			<%--面议--%>
			<c:if test="${detail.payType==3}">
				<div class="head_content_four head_content_three">
					服务价格<span>${price.showPrice}</span>
				</div>
			</c:if>
		</div>
	</section>
	<!-- 详情 -->
	<section>
		<div id="basic_detail" class="basic_detail">
			<div class="basic_detail_title">详情</div>
			<div class="detail_desicribe">
				${not empty detail.contentMobile ? detail.contentMobile : detail.content}
			</div>
		</div>
	</section>
	<!-- QA -->
	<section>
		<div id="basic_QA" class="basic_QA">
			<c:if test="${baseKnowledgeList != null && baseKnowledgeList.size() > 0}">
				<div class="basic_QA_title">Q&A</div>
			</c:if>
			<c:forEach items="${baseKnowledgeList}" var="knowledgeInfo">
				<div id="basic_QA_content" class="basic_QA_content">
					<div class="ask_content">${knowledgeInfo.title}</div>
					<div class="answer_content">${knowledgeInfo.content}</div>
				</div>
			</c:forEach>
		</div>
	</section>
	<!-- <section>
		<div class="basic_fixed_bottom">
			<a class="fixed_bottom_left" href="tel:18511178920"> <img
				src="/images/commodity/customer_tele.png" alt="">
			</a>
			<div class="fixed_bottom_right">
				<a href="javascript:switchTab('qa')">
					<div class="fixed_bottom_right_content">立即购买</div>
				</a>
			</div>
			<div class="fixed_bottom_right">
				<a href="javascript:switchTab('detail')">
					<div class="fixed_bottom_right_content">立即购买</div>
				</a>
			</div>
		</div>
	</section> -->
</div>
<%@ include file="../include/statistical/footer.jsp"%>
</body>
<title>${detail.title}</title>
</html>
<script type="text/javascript" src="http://wechat.easyrong.com/js/mp/share.js" ></script>
<script>
	function switchTab(tab) {
		switch (tab) {
		case "qa":
			window.location.href = "#basic_QA";
			break;
		case "detail":
			window.location.href = "#basic_head_img";
			break;
		default:
			break;
		}
	}
	function hasQaTab() {
		try {
			easyrong.hasQaTab(jugeQaTab());
		} catch(e) {
			// console.log(jugeQaTab());
		}
		return jugeQaTab();
	}
	function jugeQaTab() {
		return $("#basic_QA_content").length > 0 ? "1" : "0";
	}
	var tab = "detail";
	var shareInfo = {
		title : '${detail.title}', // 分享标题
		/*link : 'http://market.easyrong.com/api/bigShot/accountReceivable/detail', // 分享链接**/	
		imgUrl : '${detail.coverpic}',
		desc : '${detail.jianjie}', // 分享描述
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
	// 页面加载完成后通知app是否存在qaTab
	window.onload=function(){
		try {
			easyrong.hasQaTab(jugeQaTab());
		} catch(e) {
			// console.log(jugeQaTab());
		}
	}
</script>