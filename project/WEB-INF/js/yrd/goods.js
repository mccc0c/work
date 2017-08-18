$(document).ready(function() { 
	$("#content_show").click(function(){
		$(".box_content_select").hide();
		$(".box_content_all").show();
	});
	$("#content_hide").click(function(){
		$(".box_content_all").hide();
		$(".box_content_select").show();
	});
});