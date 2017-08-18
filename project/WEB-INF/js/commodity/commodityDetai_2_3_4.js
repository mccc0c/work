//控制textare自适应高度 
jQuery.fn.extend({
            autoHeight: function(){
                return this.each(function(){
                    var $this = jQuery(this);
                    if( !$this.attr('_initAdjustHeight') ){
                        $this.attr('_initAdjustHeight', $this.height());
                    }
                    _adjustH(this).on('textarea', function(){
                        _adjustH(this);
                    });
                });
                /**
                 * 重置高度 
                 * @param {Object} elem
                 */
                function _adjustH(elem){
                    var $obj = jQuery(elem);
                    return $obj.css({height: $obj.attr('_initAdjustHeight'), 'overflow-y': 'hidden'})
                            .height( elem.scrollHeight );
                }
            }
        });
// 使用
$(function(){
    $('textarea').autoHeight();
});

$(function(){
	$(".basic_head_fixed > a >div").on('click',function(){
		if(!$(this).hasClass('icon_head_fixed')){
			$(".basic_head_fixed >a>div").removeClass('icon_head_fixed');
			$(this).addClass('icon_head_fixed');
			return true;
		}
	})

})

/*拖动屏幕可以自动跳转的js*/
$(window).scroll(function(){
    if($(window).scrollTop()> $("#basic_head_img").outerHeight() + $("#basic_head_content").outerHeight() + $("#basic_detail").outerHeight()){
       /* $(".basic_head_fixed >a > div").removeClass("icon_head_fixed");
        $("#basic_QA_tap").addClass("icon_head_fixed");*/
    	try {
    		if (tab != "qa") {
    			tab = "qa";
    			easyrong.positionTab(tab);
    		}	
    	} catch(e) {
    		// console.log("qa");
    	}
    }else {
        /*$(".basic_head_fixed >a > div").removeClass("icon_head_fixed");
        $("#basic_head_img_tap").addClass("icon_head_fixed");*/
    	try {
    		if (tab != "detail") {
    			tab = "detail";
    			easyrong.positionTab(tab);
    		}	
    	} catch(e) {
    		// console.log("detail");
    	}
    }
})
