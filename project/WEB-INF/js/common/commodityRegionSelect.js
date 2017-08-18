function getRegionObject(region1,region2List){
	return {
		region1:region1,
		region2:region2List
	};
	
	/*region:{
    "city": "江苏",
    "cityCode": 16,
    "totalPrices": null}*/

}

var regionSelect = {
		chooseFunction:undefined,
		regions:[],
	    getRegion1Id:function(){
	        return $('#J_city_prov_id').val();
	    },
	    getRegion1Name:function(){
	        return $('#J_city_prov').html();
	    },
	    getRegion2Id:function(){
	        return $('#J_city_city_id').val();
	    },
	    getRegion2Name:function(){
	        return $('#J_city_city').html();
	    },
	    init: function (commodityId) {
            $.ajax({
                type: "get",
                url: '/commodity/region?fwId=' +commodityId,
                async: false,
                success: function (result) {
                    /*if(data.status==1){
                    	for(key in data.result){
                    		var tmp=data.result[key];
                    		regionSelect.regions.push(getRegionObject(tmp.localAndPriceDto,tmp.localAndPriceDtoList));
                    	}
                    }*/
	            	for(key in result){
	            		var tmp=result[key];
	            		regionSelect.regions.push(getRegionObject(tmp.localAndPriceDto,tmp.localAndPriceDtoList));
	            	}
                }
            });
            $(".location_yes").on("click", function () {
                $('#J_area').css('display', 'none');
                $("#dangqiandiq").val($('#J_city_prov').html() + " " + $('#J_city_city').html())
                $("#dangqiandiq_id").val($('#J_city_prov_id').val() + "," + $('#J_city_city_id').val());
                if(regionSelect.chooseFunction!=undefined)
                	regionSelect.chooseFunction();
            });

            $(".location_no").on("click", function () {
                $('#J_area').css('display', 'none');
            })
	        var iTop = $('#header').height() + $('#J_common').outerHeight(),
	            iHeight = $(window).height() - $('.nav').outerHeight() - iTop,
	            options = {},
	            options2 = {},
	            scrollWrap = document.getElementById('J_scroll_outer'),
	            scrollElem = document.getElementById('J_scroll_inner'),
	            scrollWrap2 = document.getElementById('J_scroll_outer_2'),
	            scrollElem2 = document.getElementById('J_scroll_inner_2');
	        $('.location_tap').on('click', function () {
	            var scroll, scroll2;

	            $('#J_area').show();
	            $('#J_area').css({
	                top: iTop,
	                height: iHeight
	            });
	            $('#J_scroll_inner').html('');
	            $('#J_scroll_inner_2').html('');
	            scroll = new anima_ctrl.scrollview(scrollWrap, options);
	            scroll2 = new anima_ctrl.scrollview(scrollWrap2, options2);

	            scroll.init();
	            scroll2.init();

	            var str = '';
	            // 下面是一级注释 ***************************************************************
	            
	            for (var o in regionSelect.regions) {
	            	var r=regionSelect.regions[o];
	                if (r.region1.city== '北京') {
	                    str += '<li class="active" data-id="' + r.region1.cityCode + '">' + r.region1.city + '</li>';
	                } else {
	                    str += '<li data-id="' + r.region1.cityCode+ '">' +  r.region1.city + '</li>';
	                }
	            }
	            

	            $('#J_scroll_inner').html('').html(str);
	            // 一级区域选择
	            $('#J_scroll_inner li').on('click', function () {
	                var _id = $(this).attr('data-id'),
	                    dom = '';

	                $(this).addClass('active').siblings().removeClass('active');
	                // 保存选择省份
	                $('#J_city_prov_id').val(_id);
	                $('#J_city_prov').html($(this).html());
	                
	                //清空二级区域
	                $('#J_city_city_id').val(0);
                    $('#J_city_city').html('');

	                // 下面是二级注释***************************************************
	                var cities=[];
	                for(var o in regionSelect.regions){
	                	if(regionSelect.regions[o].region1.cityCode==_id){
	                		cities=regionSelect.regions[o].region2;
	                		break;
	                	}
	                }
	                for (var attr in cities) {
	                    dom += '<li data-id="' + cities[attr].cityCode + '">' + cities[attr].city + '</li>';;
	                }
	                $('#J_scroll_inner_2').html('').html(dom);
	                // 二级区域选择
	                $('#J_scroll_inner_2 li').on('click', function () {
	                    var _id = $(this).attr('data-id'),
	                        sURL = regionSelect.city_url + _id + '',
	                        dom2 = '';
	                    $(this).addClass('active').siblings().removeClass('active');
	                    // 保存选择城市
	                    $('#J_city_city_id').val(_id);
	                    $('#J_city_city').html($(this).html());
	                }).eq(0).trigger('click');

	                // 下面是二级注释**********************************************************************
	                // });

	            }).eq(0).trigger('click');

	            // 下面是一级注释**************************************************
	            //////// });
	         });
	    },
	    setRegion:function(region1Id,region2Id){
	        for (var o in regionSelect.regions) {
	        	var r=regionSelect.regions[o];
	            if (r.region1.cityCode== region1Id) {
	                $('#J_city_prov_id').val(r.region1.cityCode);
	                $('#J_city_prov').html(r.region1.city);
	                
	                $('#J_city_city_id').val();
                    $('#J_city_city').html('');
	                if(r.region2!=undefined&&r.region2.length>0){
	                	for(var city in r.region2){
	                		var c=r.region2[city];
	                		if(c.cityCode==region2){
	                            $('#J_city_city_id').val(c.cityCode);
	                            $('#J_city_city').html(c.city);
	                            break;
	                		}
	                	}
	                }
	                $('#J_area').css('display', 'none');
                    $("#dangqiandiq").html($('#J_city_prov').html() + " " + $('#J_city_city').html())
                    $("#dangqiandiq_id").val($('#J_city_prov_id').val() + "," + $('#J_city_city_id').val() );
	                if(regionSelect.chooseFunction!=undefined)
	                	regionSelect.chooseFunction();
	                break;
	            }
	        }

	        
	    }
	}
