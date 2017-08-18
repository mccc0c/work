<%@ page language="java" contentType="text/html;charset=UTF-8"
	pageEncoding="UTF-8" trimDirectiveWhitespaces="true"
	isELIgnored="false"%>
<%@ page import="com.easyrong.h5.jsptag.JspContext"%>
<%
    JspContext regisonContext = new JspContext(request, response, out);
	regisonContext.addCssRef("css/common/region.css");
	regisonContext.addCssRef("css/common/regionSelect.css");
%>
<!-- 服务商品地区选择器 -->
<section>
	<div class="area" id="J_area">
		<div class="location ">
			<div class="location_no">取消</div>
			<div class="location-center ">
				<span id="J_city_prov"></span>
				<input type="hidden" id="J_city_prov_id" name="prov_id" value="" />
				<span id="J_city_city"></span> 
				<input type="hidden" id="J_city_city_id" name="city_id" value="" />
			</div>
			<div class="location_yes">确定</div>
		</div>
		<div class="area-wrapper">
			<div class="area-prov">
				<div class="scroll-outer" id="J_scroll_outer">
					<ul class="scroll-inner" id="J_scroll_inner"></ul>
				</div>
			</div>
			<div class="area-prov">
				<div class="scroll-outer" id="J_scroll_outer_2">
					<ul class="scroll-inner" id="J_scroll_inner_2"></ul>
				</div>
			</div>
		</div>
	</div>
</section>
<%   
	regisonContext.addJSRef("js/common/commodityRegionSelect.js");
	regisonContext.addJSRef("js/common/isScroll.js");
%>