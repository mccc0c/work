
$(document).ready(function() { 
	$("div.banner_content").on("click",function(){
		if($("#input_content").val().length=="0"){
			$(".cover").fadeIn(500).fadeOut(2000);
			$(".points_content").fadeIn(500).fadeOut(2000);
			return false;
		}
	});
	
	$('#competitionSearch').click(function(){
		$('#search').click();
	});	
});