<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" trimDirectiveWhitespaces="true" isELIgnored="false" %>
<div id="downloadCue" class="main">
	<section>
		<div id="download" class="basic_download_double">
			<img src="../../images/downplugin/invAndEnt.jpg" alt="">
			<div id="download_close" class="download_close" onclick="display()">
				<img src="../../images/downplugin/close.png" alt="">
			</div>
			<a href="${basePath}downpage/app/invandent"">
				<div class="download_conent_double">
					<div class="download_tap">下载APP</div>
				</div>
			</a>
		</div>
	</section>
</div>
<script>
		function display(){
			 document.getElementById("download").style.display = "none";
		}
</script>