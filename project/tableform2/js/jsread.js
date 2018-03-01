var getAreaTable = [];
$(function() {
	$.ajax({
		type: "get",
		url: "js/read.json",
		success: function(r) {
			// console.log(r);
			$('table caption').html(r.report_title);
			rows = r.report_row,
				cols = r.report_col;
			for (var i = 0; i < rows; i++) {
				var a = [];
				for (var j = 0; j < cols; j++) {
					var m = i * cols + j;
					var typeValue = r.columns[m].type,
						cont = r.columns[m].content;
					a.push({ type: typeValue, content: cont });
				};
				getAreaTable.push(a);
			}
			// console.log(getAreaTable);
			$('#areaTable').tmpl('areaTable_tmpl', getAreaTable);
		}
	});
	/*var areaTable = $('#areaTable').DataTable({
				bPaginate: false,//去掉翻页
				data: getAreaTable,
				columns: [{
					'data': "null",
					render: function(data, type, row, meta) {
						console.log(data);
						// if(data.type =="input"){
						// 	return '<input type="text" name="'+data.content+'" required/>';
						// }else{
						// 	return data.content
						// }
						
					}
				}]
			});*/
	$(document).on('click', '.submit', function() {
		if (!$("#posttable").valid()) {
			return;
		}
		var formdata = $("#posttable").serializeArray(),
			postData = {};

		$.each(formdata, function(i, e) {
			postData[e["name"]] = e["value"];
		});
		console.log(JSON.stringify(postData));
		/*$.ajax({
			type: 'POST',
			url: '/dynamicReport/reportCreate',
			data: JSON.stringify(postData),
			contentType: "application/json;  charset=utf-8",
			success: function(r) {
				if (r.code == 200) {
					
					alert("提交成功");
				} else {
					alert("提交失败");
				}
			}
		});*/
	})
	var validator = $("#posttable").validate({
		rules: {
			mobile: {
				isPhone: true
			}
			/*,
			                billBalance:{integer:true}*/
		},
		ignore: "not:hidden",
		onfocusout: function(element) {
			var el = $(element);
			el.valid();
			if (validator.errorList.length == 0) {
				el.next('.msg').css("visibility", "hidden");
			}
		},
		onkeyup: function(element) {
			var el = $(element);
			el.valid();
			if (validator.errorList.length == 0) {
				el.next('.msg').css("visibility", "hidden");
			}
		},
		errorPlacement: function(error, element) {
			var el = $(validator.errorList[0].element);
			/* var li = el.parent('td');*/
			element.removeClass('error');
			el.addClass('error');
			el.next('.msg').css("visibility", "visible");
		},
		invalidHandler: function(form, validator) {
			var errors = validator.numberOfInvalids();
			if (errors) {
				$('.msg').css("visibility", "hidden");
				var el = $(validator.errorList[0].element);
				/*var li = el.parent('td').parent('tr');*/
				$('.mcontent').animate({
					scrollTop: ((el[0].offsetTop) - 10) + 'px'
				}, 100);
			}
		}

	});
})