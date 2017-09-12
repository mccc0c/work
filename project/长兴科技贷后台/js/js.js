/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-05-24 17:10:23
 * @version $Id$
 */

$.fn.extend ({
	tabBlock : function(info){
		var init = {after : function(){},before : function(){}};
		var obj = info;
		obj.after = obj.after || init.after;
		obj.before = obj.before || init.before;
		
		var cur_index = obj.hd.find('li.cur').index();
		if (cur_index < 0) {
			cur_index = 0;
		}
		obj.bd.find('div.item').eq(cur_index).show().siblings('div.item').hide();
		obj.hd.find('li').eq(cur_index).addClass("cur").siblings().removeClass("cur");
		obj.hd.find('li').on('click',function(){
			$(this).addClass('cur').siblings().removeClass('cur');
			var curNum = $(this).parent().find('li').index(this);
			obj.bd.find('div.item').eq(curNum).show().siblings('div.item').hide();
			obj.after($(this),$(this).index());
			return false;
		})
	}
})

$.fn.extend ({
	tabBlock2 : function(info){
		var init = {after : function(){},before : function(){}};
		var obj = info;
		obj.after = obj.after || init.after;
		obj.before = obj.before || init.before;
		obj.bd.find('div.item2').eq(0).show().siblings('.item2').hide();
		obj.hd.find('li').eq(0).addClass("cur").siblings().removeClass("cur");
		obj.hd.find('li').on('click',function(){
			$(this).addClass('cur').siblings().removeClass('cur');
			var curNum = $(this).parent().find('li').index(this);
			obj.bd.find('div.item2').eq(curNum).show().siblings('.item2').hide();
			obj.after($(this),$(this).index());
			return false;
		})
	}
})

