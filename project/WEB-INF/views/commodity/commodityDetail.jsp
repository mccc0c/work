<%@ page language="java" contentType="text/html;charset=UTF-8"
	isELIgnored="false"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ include file="../include/header.jsp"%>
<%
    jspContext.addCssRef("css/commodity/commodityDetail.css");
			jspContext.addCssRef("css/common/dialog.css");
			jspContext.addCssRef("css/signup/tao.css");
			jspContext.addJSRef("js/frame/jquery.js");
%>

<form action="/order/commodity/addcart" method="post" id="addcartForm">
	<!-- 数量 -->
	<input type="hidden" name="num" id="num">
	<!-- 服务ID -->
	<input type="hidden" name="fwId" value="${detail.id}">
	<!-- 省 -->
	<input type="hidden" name="city1" id="city1">
	<!-- 市 -->
	<input type="hidden" name="city2" id="city2"> <input
		type="hidden" name="local" id="local">
	<!-- 标签 -->
	<input type="hidden" name="tag" id="tag">
	<!-- 属性id -->
	<input type="hidden" name="order" id="order">
</form>

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

	<!-- 封面 -->
	<section name="" id="">
		<div class="img_head">
			<img src="${detail.coverpic}" alt=""
				onerror='this.src="/images/commodity/commodityDefault.png"'>
		</div>
		<c:if test="${not empty detail.cxTitle}">
			<div class="qyxq_basic">
				<p>${detail.cxTitle}</p>
			</div>
		</c:if>
	</section>
	<!-- 价格显示 -->
	<section class="shouqufy spread_line_buttom">
		<h4>${detail.title}</h4>

		<p class="fontstyle">${detail.jianjie}</p>
		<%--一次性支付--%>
		<c:if test="${detail.payType==1}">
			<p>
				<b>服务价格</b> <span class="fuwujiage"> <c:if
						test="${!price.discount}">
						<span style="color: red;" id="showPrice">${price.showPrice}</span>
					</c:if> <c:if test="${price.discount }">
						<span style="color: red;" id="showPrice">${price.showPrice}</span>
						<del id="originalPrice">${price.originPrice}</del>
					</c:if>
				</span>
			</p>
		</c:if>
		<%--定金+尾款--%>
		<c:if test="${detail.payType==2}">
			<p>
				<b>首付订金</b> <span class="shoufujin" style="color: red;"> <span>${price.showPrice}</span>
				</span>
			</p>

			<p>
				<b>服务价格</b>
				<c:choose>
					<c:when test="${not empty price.disCountPrice}">
						<span class="fuwujiage"> ${price.disCountPrice} </span>
						<del id="originalPrice">${price.originPrice}</del>
					</c:when>
					<c:otherwise>
						<span class="fuwujiage"> ${price.originPrice} </span>
					</c:otherwise>
				</c:choose>
			</p>
		</c:if>
		<%--面议--%>
		<c:if test="${detail.payType==3}">
			<p>
				<b>服务价格</b> <span class="fuwujiage" style="color: red;">${price.showPrice}</span>
			</p>
		</c:if>
	</section>

	<!-- 服务地区 -->
	<%-- <section id="buydiv" class="shouqufy2 spread_line_top spread_line_buttom">
		<div class="common_box location_tap spread_line_buttom">
			<div class="common_box_one">服务地区</div>
			<div id="dangqiandiq"
				class="common_box_two jump_icon select_style_yrb">请选择</div>
		</div>
		<!-- 为了获取对应的值 -->
		<input type="hidden" id="dangqiandiq_id" readOnly="true"
			placeholder="省市区选择" type="text">

		<c:choose>
			<c:when test="${ tag==2}">
				<div id="peixunkc_yrb" class="common_box spread_line_buttom">
					<div class="common_box_one peixunkecheng_tap">
						<c:if test="${ tag==1}">${detail.sysTagName}</c:if>
						<c:if test="${ tag==2}">服务属性</c:if>
					</div>
					<div id="qeixun_selected_yrb"
						class="common_box_two jump_icon select_style_yrb">请选择</div>
				</div>
			</c:when>
			<c:otherwise>

			</c:otherwise>
		</c:choose>

		<div class="common_box">
			<div class="common_box_five">数量</div>
			<div class="common_box_four">
				<!-- 增加一个计数器 -->
				<div class="basic_jishuqi space">
					<div id="subtactone" onclick="subtactone()" contenteditable="false"
						class="jishuqi_xq spread_right_yrb">—</div>
					<div id="relectvalue" contenteditable="false" class="jishuqi_xq1"
						type="number">1</div>
					<div id="addone" onclick="addone()" contenteditable="false"
						class="jishuqi_xq spread_left_yrb">+</div>
				</div>
			</div>
		</div>
	</section> --%>
	<div class="img_head" style="padding-bottom:12px;">
	<a onclick="hrefFund();"><img src="/images/commodity/lALOlCEILsygzQLu_750_160.png" /> </a>
	</div>

	<!-- 服务介绍和常见问题 -->
	<section id="shareDiv" class="common_label2">
		<div class="title1">
			<h3 id="fuwujs" class="tap_color">服务介绍</h3>

			<h3 id="changjwt" class="">常见问题</h3>
		</div>
		<div class="common_decription fontsize">
			<!-- 服务介绍 -->
			<div id="fuwujs_decri">
				<p>${detail.content}</p>
			</div>
			<!-- 常见问题 需要重新分组设计-->
			<div id="changjwt_decri">
				<c:forEach items="${baseKnowledgeList}" var="knowledgeInfo">
					<div class="basic_wenda">
						<div class="tiwen1_yrb">Q</div>
						<!-- <div class="tiwen1_icon_yrb"></div> -->
						<div class="tiwen2_yrb">${knowledgeInfo.title}</div>
					</div>
					<div class="basic_wenda1">
						<div class="huida2_yrb">${knowledgeInfo.content}</div>
						<div class="huida1_yrb">A</div>
					</div>
				</c:forEach>
			</div>
		</div>
	</section>

	<!-- 立即购买 -->
	<%-- <section id="purchase">
		<div class="mustbug_qyxq">
			<div class="common_box_one mustbug_icon"></div>
			<div class="common_box_one">
				<c:choose>
					<c:when test="${detail.payType==3}">
                        立即申请
                    </c:when>
					<c:otherwise>
                        立即购买
                    </c:otherwise>
				</c:choose>
			</div>
		</div>
	</section> --%>

	<!-- 服务商品选项 -->
	<section class="basedibu_tyb">
		<!-- 止灰图层 -->
		<div class="cover"></div>
		<!-- 选项详细信息 -->
		<div class="basic_peixunkc">
			<div class="peix_header">
				<%-- 				<c:if test="${tag==1}">
                    ${detail.sysTagName}
                </c:if> --%>
				<c:if test="${tag==2}">
                    	服务属性
                </c:if>
			</div>

			<div class="peix_select">
				<%--<c:if test="${productInfo.cyc==true}">--%>
				<%--<c:forEach items="${cycInfoList}" var="cycInfo">--%>
				<%--<div onclick="cycCountPrice(${cycInfo.id}, ${cycInfo.price}, ${cycInfo.specialPrice})">${cycInfo.title}</div>--%>
				<%--</c:forEach>--%>
				<%--</c:if>--%>
				<%--<c:if test="${productInfo.tag==true}">--%>
				<%--<c:forEach items="${tagInfoList}" var="tagInfo">--%>
				<%--<div onclick="tagCountPrice(${tagInfo.optId}, ${tagInfo.price})">${tagInfo.opt}</div>--%>
				<%--</c:forEach>--%>
				<%--</c:if>--%>
			</div>
			<!-- 取消按钮 -->
			<div class="nobug_qyxq">
				<p>取消</p>
			</div>
		</div>
	</section>


	<!-- 地区选择 -->
	<%@ include file="../include/common/commodityRegion.jsp"%>

	<!-- 必输项控制 -->
	<section>
		<!-- 止灰层 -->
		<div class="cover"></div>
	</section>
	<!-- 	提示内容 -->
	<section>
		<div class="basic_dialog">
			<!-- 止灰浮动层 -->
			<div class="floatingLayer"></div>
			<div class="baisc_points">
				<!-- 提示内容 -->
				<div id="dialogContent" class="points_content"></div>
				<div class="points_button">确定</div>
			</div>
		</div>
	</section>
</div>
<title>${detail.title}</title>
<%@ include file="../include/statistical/footer.jsp"%>
<script type="text/javascript" src="http://wechat.easyrong.com/js/mp/share.js" ></script>
<script type="text/javascript">
	var detail = {};
	var tag = '${tag}';
	var region1 = '${provinceId}';
	var region2 = '${cityId}';
	var options = [];
	var priceAttributes = [];
	if ('${ empty detail}' == 'false') {
		detail = $
		{
			detail
		}
		;
	}
	if ('${ empty priceAttributes}' == 'false') {
		priceAttributes = JSON.parse('${priceAttributes}');
	}
	if ('${ empty options}' == 'false') {
		options = JSON.parse('${options}');
	}
	
	function hrefFund() {
		try {
			easyrong.gotoOpenUrl('0','http://ent.h5.easyrong.com/fund/load');
		} catch (e) {
			document.execCommand("stop");
			window.stop();
			window.location.href='http://ent.h5.easyrong.com/fund/load';
		}
	}
	
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
</script>
<%
    jspContext.addJSRef("js/commodity/commodityDetail.js");
    jspContext.addJSRef("js/common/isScroll.js");
    jspContext.addJSRef("js/common/code.min.js");
    jspContext.addJSRef("js/common/dialog.js");
%>
<!-- <script src="http://wechat.easyrong.com/js/mp/share.js" type="text/javascript"></script> -->