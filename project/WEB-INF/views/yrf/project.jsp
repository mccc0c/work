<%@ page language="java" contentType="text/html;charset=UTF-8"	pageEncoding="UTF-8" trimDirectiveWhitespaces="true"  isELIgnored="false"%>
<%@ include file="../include/header.jsp"%>
<%
    jspContext.addCssRef("css/yrf/projectDetail.css");
	jspContext.addCssRef("css/yrf/projectCommon.css");
	jspContext.addCssRef("css/common/textarea.css");
	jspContext.addJSRef("js/frame/jquery.js");
%>
		<div class="wrapper">
			<!-- app link 用到变量-->
			<c:set var="appLinkType" value="6003" />
			<c:set var="detailId" value="${project.id}"/>
			<c:set var="otherValue" value="${project.userId == null ? -1 : project.userId}"/>
			<!-- App下载插件 -->
			<c:if test="${isShare == 1}">
				<%
					jspContext.addCssRef("css/downplugin/downplugin.css");
					jspContext.addJSRef("js/frame/jquery.js");	
					jspContext.addJSRef("js/downpage/app/downplugin.js");
				%>
				<%@ include file="../downplugin/invPlugin.jsp" %>
			</c:if>
            <!--项目信息-->
            <section class="project_label">
                <div class="project_img">
                    <img src="${basePath}${project.img}" alt="${project.name }">
                    <div class="project_opacity">
                        <div class="spread_line view_icon">${project.views } 查看</div>
                        <div class="focus_icon">${project.attention } 关注</div>
                    </div>	
                </div>
                <div class="project_message">
                    <div class="project_message_top">
                        <h3>${project.name }</h3>
                        <p>${project.description }</p>
                        <em>融资额度<b>${project.finance }</b>万</em>
                    </div>
                    <div class="biaoqian_box">
                        <div>
                            <i class="industry_icon"></i>
                            <p>题材行业</p>
                            ${project.projectIndustry}
                        </div>
                        <div>
                            <i class="stage_icon"></i>
                            <p>所属阶段</p>
                            ${project.projectStage}
                        </div>
                        <div>
                            <i class="area_icon"></i>
                            <p>所属地区</p>
                            ${project.region}
                        </div>
                        <div>
                            <i class="marketing_icon"></i>
                            <p>资本市场</p>
                             ${project.capital}
                        </div>
                    </div>
                </div>	
            </section>
			
			<!-- 已登录 -->
			<c:if test="${isLogin > 0}">
				<!-- 已认证 -->
				<c:if test="${isAuth > 0}">
					<!--项目简介-->
            		<section class="common_label intro_label">
                		<h3 class="title">项目简介</h3>
                		<div class="common_content">
                    		<article class="intro">
                    			<p class="basic_textarea_project">
								<textarea readonly>${project.content}</textarea>
                    		</article>
                		</div>
                		<c:if test="${project.content.length() > 80}">
                			<a href="javascript:void(0)" class="more">查看更多</a>			
                		</c:if>
            		</section>
            		<!-- 投资案例-->
            		<c:if test="${project.financingHistory != null && project.financingHistory.size() > 0}">
            			<section class="common_label">
	                		<h3 class="title">投资案例</h3>
	                		<div class="common_content">
	                    		<ul class="case_list">
	                    			<c:forEach items="${project.financingHistory}" var="fh"  varStatus="status">
			                    		<li>
			                            	<i></i>
			                            	<span class="time">${fh.time}</span>
			                            	<div class="case">
			                                	<b>融资阶段：${fh.stage}</b>
			                                	<p>融资金额：${fh.money}</p>
			                                	<p>估值：${fh.valuation} 万 ${fh.valuationCurrency}</p>
			                                	<p>投资方：${fh.investor}</p>
			                            	</div>
			                        	</li>	
	                    			</c:forEach>
	                    		</ul>
	                		</div>
            			</section>
            		</c:if>
				</c:if>
				<!-- 未认证 -->
				<c:if test="${isAuth == 0}">
					<section class="common_label authentication_label">
                		<div class="common_content">
	                    	<p>认证成为<a href="">投资人</a>,可查看更多详情</p>
	                    	<!-- 分享 -->
	                        <c:if test="${isShare==1 }">
	                        	<a href="${basePath}downpage/app/inv" class="authentication_btn">请认证</a>
	                        </c:if>
                    		<c:if test="${isShare!=1 }">
                    			<c:choose>
	                        		<c:when test="${appVersion>=1}">
	                        			<a onclick="easyrong.gotoview('3')" class="authentication_btn">请认证</a>
	                        		</c:when>
	                        		<c:otherwise>
	                        			<a href="member/yr_auth/investor_auth" class="authentication_btn">请认证</a>
	                        		</c:otherwise>
                        		</c:choose>	 
                    		</c:if>
                		</div>
            		</section>
				</c:if>
			</c:if>
			<!-- 未登录 -->
			<c:if test="${isLogin==0}">
				<section class="common_label authentication_label">
                    <div class="common_content">
                        <p>认证成为<a href="">投资人</a>,可查看更多详情</p>
                        <!-- 分享 -->
                        <c:if test="${isShare==1 }">
                        	<a href="${basePath}downpage/app/inv" class="authentication_btn">请登录</a>
                        </c:if>
                        <c:if test="${isShare!=1 }">
                        	<c:choose>
                        		<c:when test="${appVersion>=1}">
                        			<a onclick="easyrong.gotoview('1')" class="authentication_btn">请登录</a>
                        		</c:when>
                        		<c:otherwise>
                        			<a href="yr_login/login" class="authentication_btn">请登录</a>
                        		</c:otherwise>
                        	</c:choose>	
                     	</c:if>
                    </div>
                </section>
			</c:if>
		</div>
	<%@ include file="../include/statistical/footer.jsp" %>
	</body>
	<title>${project.name}</title>
</html>
<%
	jspContext.addJSRef("js/common/textarea.js");
 %>
 <script type="text/javascript" src="http://wechat.easyrong.com/js/mp/share.js" ></script>
<script type="text/javascript">
	$(function() {
		var ih = $('.intro').height();
		if (ih < 110) {
			$('.more').hide();
			$('.intro').height('auto');
		} else {
			$('.more').show();
			$('.intro').height('110');
		}
		$('.more').click(function() {
			var $this = $(this);
			var _t = $(this).text();
			if (_t == '查看更多') {
				$('.intro').height('auto');
				$this.text('收起');
			} else {
				$('.intro').height('110');
				$this.text('查看更多');
			}
		});
	});
	
	var shareInfo = {
		title : '${project.name}', // 分享标题
		/*link : 'http://market.easyrong.com/api/bigShot/accountReceivable/detail', // 分享链接**/	
		imgUrl : '${basePath}${project.img}',
		desc : '一融指路，投好项目！', // 分享描述
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