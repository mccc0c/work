$(document).ready(function() {
	var a = $("#applink").val();
	if (a== null || a.length == 0){
		return;
	}
	$.ajax({
	    type: "POST",
		url:domainBasePath + "downpage/app/applink?applink="+encodeURI(a),
		async: true,
		success: function(data) {
		    },
			error: function(data) {
			}
		});
});