<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" trimDirectiveWhitespaces="true"	isELIgnored="false"%>
<%@ include file="../include/header.jsp"%>
<%
    jspContext.addCssRef("css/yrd/goodsDetail.css");
	jspContext.addCssRef("css/yrd/goodsCommon.css");
	jspContext.addCssRef("css/common/textarea.css");
	jspContext.addJSRef("js/frame/jquery.js");
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
            <!--通用板块 具体信息-->
            <section class="common_label">
                <h4 class="project_title">${apply.goodsName }</h4>
                <div class="common_content">
                    <div class="label_message">
                    	<c:if test="${apply.industry != null && apply.industry.length() > 0}">
                    		<div class="fl">行业：${apply.industry}</div>
                    	</c:if>
                        <c:if test="${apply.regionMid != null && apply.regionMid.length() > 0}">
                            <div class="fr">地区：${apply.regionMid}</div>
                        </c:if>
                    </div>
                    <div class="quota">
                        <p class="quota_title">融资额度</p>
                        <p class="money">
                            <span>${apply.loansNum }</span>万
                        </p>	
                    </div>
                    <div class="daikuan_message">
                        <div>
                            <p class="message_title">融资期限</p>
                            <p class="message_content"><span>${apply.loadsDate }</span>个月</p>
                        </div>
                        <div>
                            <p class="message_title">主营收入</p>
                            <p class="message_content"><span>${apply.sellIncome1 }</span>万</p>
                        </div>
                        <div>
                            <p class="message_title">成立年限</p>
                            <p class="message_content"><span>${apply.companyCreated}</span>年</p>
                        </div>
                    </div>
                </div>
            </section>

            <!--通用板块 担保方式-->
            <section class="common_label">
                <div class="common_content">
                    <ul class="essential_factor">
                    	<c:if test="${apply.guarantee != null && apply.guarantee.length() > 0}">
                    		<li>
                                <label>担保方式</label>
                                <p>
                                	${apply.guarantee}
                                </p>
							</li>
						</c:if>                    
					</ul>
                </div>
            </section>

            <!--通用板块 融资信息-->
            <section class="common_label">
                <h3 class="title">融资信息</h3>
                <div class="common_content">
                    <ul class="essential_factor">
                    	<c:if test="${apply.guaranteeExt != null && fn:length(apply.guaranteeExt) > 0}">
                    		<c:forEach items="${apply.guaranteeExt}" var="ext" varStatus="status">
                    			<li>
                    				<label>${ext.name}</label>
                    				<p>${ext.text}</p>
                    			</li>
                    		</c:forEach>
                    	</c:if>
                    	<c:if test="${apply.loansUsage != null && apply.loansUsage.length()>0}">
                    		<li>
                                <label>资金用途</label>
                                <p>${apply.loansUsage}</p>
                            </li>
                    	</c:if>
                    </ul>
                </div>
            </section>

            <!--通用板块 经营信息-->
            <section class="common_label">
                <h3 class="title">经营信息</h3>
                <div class="common_content">
                    <ul class="essential_factor">
                        <li>
                            <label>上年主营收入</label>
                            <p>${apply.sellIncome1 }万</p>
                        </li>
                        <li>
                            <label>上年净利润</label>
                            <p>${apply.netProfit1 }万</p>
                        </li>
                        <li>
                            <label>总资产</label>
                            <p>${apply.totalAssets }万</p>
                        </li>
                        <li>
                            <label>总负债</label>
                            <p>${apply.totalDebt }万</p>
                        </li>
                    </ul>
                </div>
            </section>

            <!--通用板块 企业资料-->
            <c:if test="${apply.document != null && fn:length(apply.document) > 0 }">
                <section class="common_label">
                    <h3 class="title">企业资料</h3>
                    <div class="common_content">
                        <ul class="essential_factor">
                        	<c:forEach items="${apply.document}" var="doc" varStatus="status">
                        		<a href = "${doc.documentUrl != null  && doc.documentUrl.length() > 0 ? basePath + doc.documentUrl : 'javascript:void(0)'}">
                        			<li>	
                        				<label style="width:70%">
                        					${fn:substring(doc.documentName, 0, 48)}
                        				</label>
                        				<p style="width:30%">
                                            <i class="account_arrow"></i>
                                            <i class="business_license"></i>
                                        </p>
                        			</li>	
                        		</a>
                        	</c:forEach>
                    	</ul>
                	</div>
            	</section>
            </c:if>

            <!--通用板块 联系信息-->
            <section class="common_label">
                <h3 class="title">联系信息</h3>
                <div class="common_content">
                	<c:if test="${apply.userName != null && apply.userName.length() > 0}">
                		<ul class="essential_factor">
                            <li><label>联系人</label><p>${apply.userName}</p></li>
                            <li><label>联系电话</label><p><a href="tel:${apply.userMobile}">${apply.userMobile}</a></p></li>
                        </ul>
	                </c:if>
                </div>
            </section>
            <div class="cover">
                <img src="" alt="">	
            </div>
		</div>
	<%@ include file="../include/statistical/footer.jsp" %>
	</body>
	<title>贷款_申请详情</title>
</html>
<%
	jspContext.addJSRef("js/common/textarea.js");
 %>
<script type="text/javascript">
	$(function() {
		$('.pic_list li a').click(function() {
			var _src = $(this).siblings('img').attr('src');
			$('.cover img').attr('src', _src);
			$('.cover').show();
		});

		$('.cover').click(function() {
			$(this).hide();
		});
	})
</script>