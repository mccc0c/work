<%@ page language="java" contentType="text/html;charset=UTF-8"	pageEncoding="UTF-8" trimDirectiveWhitespaces="true"  isELIgnored="false"%>
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
				<%@ include file="../downplugin/invPlugin.jsp" %>
			</c:if>
            <!--通用板块 具体信息-->
            <section class="common_label">
                <h4 class="project_title"> ${project.projectName} </h4>
                <div class="common_content">
                    <div class="label_message">
                    	<c:if test="${project.industry != null && project.industry.length() > 0 }">
                    		<div class="fl">行业： ${project.industry}</div>
                    	</c:if>
                    	<c:if test="${project.regionMid != null && project.regionMid.length() > 0 }">
                    		<div class="fr">地区：${project.regionMid}</div>
                    	</c:if>
                    </div>
                    <div class="quota">
                        <p class="quota_title">融资额度</p>
                        <p class="money">
                            <span> ${project.loansNum}</span>万
                        </p>    
                    </div>
                    <div class="daikuan_message">
                        <div>
                            <p class="message_title">融资期限</p>
                            <p class="message_content"><span> ${project.loadsDate}</span>个月</p>
                        </div>
                        <div>
                            <p class="message_title">主营收入</p>
                            <p class="message_content"><span>${project.sellIncome1}</span>万</p>
                        </div>
                        <div>
                            <p class="message_title">成立年限</p>
                            <p class="message_content"><span>${project.companyCreated}</span>年</p>
                        </div>
                    </div>
                </div>
            </section>

            <!--通用板块 融资信息-->
            <section class="common_label">
                <div class="common_content">
                    <ul class="essential_factor">
                        <c:if test="${project.guarantee != null && project.guarantee.length() > 0}">
                        	<li>
                                <label>担保方式</label>
                                <p>
                                	${project.guarantee}
                                </p>
                            </li>
                        </c:if>
                    </ul>
                    <c:if test="${project.dianping != null && project.dianping.length() > 0 }">
                    	<div class="comment_box">
                            <h3><i></i>一融点评:</h3>
                            <p>${project.dianping}</p>
                        </div>
                    </c:if>
                </div>
            </section>

            <!--通用板块 融资信息-->
        	<section class="common_label">
            	<h3 class="title">融资信息</h3>
            	<div class="common_content">
                	<ul class="essential_factor">
                    	<c:if test="${project.guaranteeExt != null && fn:length(project.guaranteeExt) > 0}">
                    		<c:forEach items="${project.guaranteeExt}" var="ext" varStatus="status">
                    			<li>
                    				<label>${ext.name}</label>
                    				<p>${ext.text}</p>
                    			</li>
                    		</c:forEach>
                    	</c:if>
                    	<c:if test="${project.loansUsage != null && project.loansUsage.length()>0}">
                    		<li>
                                <label>资金用途</label>
                                <p>${project.loansUsage}</p>
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
                            <p>${project.sellIncome1}万</p>
                        </li>
                        <li>
                            <label>上年净利润</label>
                            <p>${project.netProfit1}万</p>
                        </li>
                        <li>
                            <label>总资产</label>
                            <p>${project.totalAssets}万</p>
                        </li>
                        <li>
                            <label>总负债</label>
                            <p>${project.totalDebt}万</p>
                        </li>
                    </ul>
                </div>
            </section>
           
            <!--通用板块 企业资料-->
             <c:if test="${project.documentName != null && project.documentName.length() > 0 }">
                <section class="common_label">
                    <h3 class="title">企业资料</h3>
                    <div class="common_content">
                    	<ul class="essential_factor">
                    		<a href="${project.documentUrl != null && project.documentUrl.length() > 0 ? basePath + project.documentUrl : 'javascript:void(0)'}">
                        		<li>
                             		<label>${proejct.documentName}</label>
                             		<p>
                                		<i class="account_arrow"></i>
                                		<i class="business_license"></i>
                             		</p>
                        		</li>
                        	</a>
                        </ul>
                   	</div>
            	</section>
            </c:if>
            <!--通用板块 联系信息-->
            <c:if test="${project.userName != null && project.userName.length() > 0 }">
            	<section class="common_label">
                    <h3 class="title">联系信息</h3>
                    <div class="common_content">
                        <ul class="essential_factor">
                            <li>
                                <label>联系人</label>
                                <p>${project.userName }</p>
                            </li>
                            <li>
                                <label>联系电话</label>
                                <p><a href="tel:${project.userMobile}">${project.userMobile}</a></p>
                            </li>
                        </ul>
                    </div>
                </section>
            </c:if>
            <!--底部数字-->
            <section class="common_label">
                <div class="common_content">
                    <ul class="view_list">
                        <li class="spread_line view1">
                            浏览数 <span>${project.viewNum}</span>
                        </li>
                        <li class="view2">
                            邀约数 <span>${project.inviteNum}</span>
                        </li>
                    </ul>
                </div>
            </section>
        </div>
        <div class="cover">
            <img src="" alt=""> 
        </div>
	<%@ include file="../include/statistical/footer.jsp" %>
	</body>
	<title>债权项目详情</title>
</html>
<%
	jspContext.addJSRef("js/common/textarea.js");
 %>
<script type="text/javascript">
	$(function () {
	    $('.pic_list li a').click(function () {
	        var _src = $(this).siblings('img').attr('src');
	        $('.cover img').attr('src', _src);
	        $('.cover').show();
	    });
	
	    $('.cover').click(function () {
	        $(this).hide();
	    });
	})
</script>