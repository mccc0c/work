<%@ page language="java" contentType="text/html;charset=UTF-8"	pageEncoding="UTF-8" trimDirectiveWhitespaces="true"  isELIgnored="false"%>
<%@ include file="../include/header.jsp"%>
<%
    jspContext.addCssRef("css/yrd/goodsDetail.css");
	jspContext.addCssRef("css/yrd/goodsCommon.css");
	jspContext.addCssRef("css/common/textarea.css");
	jspContext.addJSRef("js/frame/jquery.js");
%>
		<div class="wrapper">
			<c:set var="appLinkType" value="6004" />
			<c:set var="detailId" value="${goods.id}"/>
			<c:set var="otherValue" value="${goods.version == null ? -1 : goods.version}"/>
			 <!-- App下载插件 -->
			<c:if test="${isShare == 1}">
				<%
					jspContext.addCssRef("css/downplugin/downplugin.css");
					jspContext.addJSRef("js/frame/jquery.js");	
					jspContext.addJSRef("js/downpage/app/downplugin.js");
				%>
				<%@ include file="../downplugin/entPlugin.jsp" %>
			</c:if>
			<!--商品详情-->
			<section class="p_detail">
				<div class="p_detail_top">
					<h3>${goods.goodsName}</h3>
					<c:if test="${goods.guarantee != null && goods.guarantee.length() > 0}">
						<div class="leibie">
							担保方式: ${goods.guarantee}
						</div>
					</c:if>
					<div class="money">
						<p>贷款额度</p>
						<p>
							<c:if test="${goods.loansStartNum == 0}">
								<b>${goods.loansNum}</b>&nbsp;万元以下
							</c:if>
							<c:if test="${goods.loansStartNum > 0}">
								<b>${goods.loansStartNum}</b>万 <b> - ${goods.loansNum}</b>万
							</c:if>
						<p>
					</div>
				</div>
				<div class="p_detail_message">
					<div class="p_detail_message_content p_detail_message_spread">
						<b>期限</b>
						<p>
							<c:if test="${goods.loansStartDate == 0}">
								<span>${goods.loansDate}</span>个月以下
							</c:if>
							<c:if test="${goods.loansStartDate > 0}">
								<span>${goods.loansStartDate}</span><span>-${goods.loansDate}</span>个月
							</c:if>
						</p>
					</div>
					<div class="p_detail_message_content p_detail_message_spread">
						<b>审批</b>
						<p><span>${goods.passDateValue}</span>天以内</p>
					</div>
					<div class="p_detail_message_content">
						<b>还款</b>
						<p><span>${goods. repaymentMethod}</span></p>
					</div>
				</div>
			</section>

			<!--机构信息-->
			<section class="common_label">
				<div class="common_content">
					<div class="jigou_show">
						<div class="jigou_show_content">
							<p>由 <span>${goods. institutionName}</span> 提供</p>
							<p>
								<c:forEach items="${goods.tags }" var="tag" varStatus="status">
									<em class="cur"><i></i>${tag}</em>
                              	</c:forEach>
							</p>
						</div>
						<c:if test="${goods.top == 1}">
							<div class="marker">
								<div class="marker_content">
									<i></i>
										<p>专享</p>
									</div>
								</div>
						</c:if>
					</div>
				<%-- 	<c:if test="${goods.region != null && fn:length(goods.region) > 0 }">
						<div class="map_box">
							<label>适用地区</label>
								<div class="map_box_content">
									<c:forEach items="${goods.region}" var="region" varStatus="status">
										<span>${region}市</span>
									</c:forEach>
									<c:if test="${fn:length(goods.region) > 3}">
										<a href="${basePath}loan/good?id=${goods.id}&version=${goods.version}&region=1">更多</a>
									</c:if>
								</div>
							</div>
					</c:if> --%>
					<c:if test="${goods.region != null && fn:length(goods.region) > 0 }">
						<div class="map_box">
							<label>适用地区</label>
								<div class="map_box_content box_content_select">
									<c:if test="${fn:length(goods.region) <= 3}">
										<c:forEach items="${goods.region}" var="region"  varStatus="status" >
										<span>${region}市</span>
										</c:forEach>
									</c:if>
									<c:if test="${fn:length(goods.region) > 3}">
										<c:forEach items="${goods.region}" var="region" begin="0" end="2" varStatus="status" >
										<span>${region}市</span>
										</c:forEach>
										<a id="content_show" href="javascript:void(0)">更多</a>
									</c:if>
								</div>
								<!-- 增加判断控制，如果点击更多就显示全部下面div信息 -->
								<div class="map_box_content box_content_all">
									<c:forEach items="${goods.region}" var="region" varStatus="status">
										<span>${region}市</span>
									</c:forEach>
									<a id="content_hide" href="javascript:void(0)">收起</a>
								</div>
						</div>
					</c:if>
					
				</div>
			</section>
			<!--通用板块 企业要素-->
	    	<section class="common_label">
	    		<h3 class="title">企业要素</h3>
	    		<div class="common_content">
	    			<ul class="essential_factor">
	    				<li>
	    					 <label>企业营业收入</label>
	    					 <p>${ goods.companyIncome}万元</p>
	    				</li>
	    				<li>
	    					 <label>企业总资产</label>
	    					 <p>${goods.companyAsset }万以上</p>
	    				</li>
	    				<li>
	    					 <label>企业成立年限</label>
	    					 <p>${goods.age }年以上</p>
	    				</li>
	    			</ul>
	    		</div>
	    	</section>
    		<!-- 产品特点-->    	
	        <c:if test="${goods.feature != null && goods.feature.length() > 0 }">
	            <section class="common_label">
	                    <h3 class="title">产品特点</h3>
	                    <div class="common_content intro">
	                            ${goods.feature}
	                    </div>
	            </section>
	        </c:if>

	    	<!--通用板块 申请条件-->
	        <c:if test="${goods.applyCondition != null && goods.applyCondition.length() > 0 }">
	            <section class="common_label">
	                    <h3 class="title">申请条件</h3>
	                    <div class="common_content intro">
	                            ${goods.applyCondition}
	                    </div>
	            </section>
	        </c:if>

    	<!--通用板块 所需材料-->
        <c:if test="${goods.document != null && fn:length(goods.document) > 0 }">
            <section class="common_label">
                    <h3 class="title">所需材料</h3>
                    <div class="common_content">
                            <ul class="need">
                            	<c:forEach items="${goods.document}" var ="doc"  varStatus="status">
                            		<c:if test="${doc.docTitle != null}">
                            			<li>
                            				${fn:substring(doc.docTitle, 0, 48)}
                            			</li>
                            		</c:if>
                            	</c:forEach>
                            </ul>
                    </div>
            	</section>
        	</c:if>
    	</div>
	<%@ include file="../include/statistical/footer.jsp" %>
	</body>
	<%
	jspContext.addJSRef("js/yrd/goods.js");
	%>
	<title>贷款项目详情</title>
</html>
<%
	jspContext.addJSRef("js/common/textarea.js");
 %>