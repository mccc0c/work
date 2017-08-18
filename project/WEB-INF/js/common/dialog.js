/**
 * ansl
 * 20160904
 */
var confirmFunc;
$(function(){
	$(".points_button").on('click',function(){
		$(".basic_dialog").hide();
		if(confirmFunc!=undefined)confirmFunc();
	})
	$(".floatingLayer").on('click',function(){
		$(".basic_dialog").hide();
		if(confirmFunc!=undefined)confirmFunc();
	})
	// 需要提示的内容
	// $("#dialogContent").html("需要提示的内容");
})

function showDialog(showText,func){
	confirmFunc=func;
	$("#dialogContent").html(showText);
	//微信出现点击后不失去焦点的情况,导致确认框上下颜色不一致
	$(".points_button").css('background-color',$("#dialogContent").css('background-color'));
	$(".basic_dialog").show();
	
}