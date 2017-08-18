var ua = navigator.userAgent.toLowerCase();
$(document).ready(function() {
	if (isAndroid()){
		$("#android_down").show();
	} else if (isiOS()){
		$("#ios_down").show();
	}
	else	{
		$("#android_down").show();
		$("#ios_down").show();
	}
	var appType = $("#appType").val();
	// 创业者
	if (appType == "1"){
		goEnt();
	}// 投资者 
	else if (appType=="2"){
		goInv();
	}
});


function goInv() {
	window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.easyrongfund';
	/*var ua = navigator.userAgent.toLowerCase();
	if (/iphone|ipod/.test(ua)) {
		if (/micromessenger/.test(ua)) {
			alert('请点击右上角按钮，然后在弹出的菜单中，点击在Safari中打开，即可安装');
		} else {
			window.location.href = 'https://itunes.apple.com/cn/app/yi-rong-tou-zi-zhe/id1031860065?mt=8';
		}
	} else {
		window.location.href = 'https://itunes.apple.com/cn/app/yi-rong-tou-zi-zhe/id1031860065?mt=8';
	}*/
}

function goEnt() {
	window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.easyrongchuangye';
	/*
	var ua = navigator.userAgent.toLowerCase();
	if (/iphone|ipod/.test(ua)) {
		if (/micromessenger/.test(ua)) {
			alert('请点击右上角按钮，然后在弹出的菜单中，点击在Safari中打开，即可安装');
		} else {
			window.location.href = 'https://itunes.apple.com/cn/app/yi-rong-chuang-ye-zhe/id1031857893?mt=8';
		}
	} else {
		window.location.href = 'https://itunes.apple.com/cn/app/yi-rong-chuang-ye-zhe/id1031857893?mt=8';
	}*/
}
function isAndroid(){
	return ua.indexOf('android') > -1 || ua.indexOf('linux') > -1;
}

function isiOS(){
	return /iphone|ipod|ipad|mac os/.test(ua);
}