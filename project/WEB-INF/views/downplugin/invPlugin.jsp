<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" trimDirectiveWhitespaces="true" isELIgnored="false" %>
<div id="downloadCue" class="main">
	<!-- 投资者 -->
	<section>
		<input type="hidden" id="applink" value="{&#34;type&#34;:${appLinkType},&#34;id&#34;:${detailId},&#34;otherValue&#34;:${otherValue}}"/>
		<div class="baisc_style investor">
			<div class="basic_tap">
				<!-- 下面空的div不可以删除 -->
				<div class="basic_tap_left"></div>
				<a class="basic_tap_right" href="https://wireless.applink.easyrong.com/downpage/app/inv?type=${appLinkType}&id=${detailId}&otherValue=${otherValue}">打开</a>
			</div>
		</div>
	</section>
</div>