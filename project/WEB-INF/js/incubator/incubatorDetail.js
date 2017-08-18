$(function(){
		// 应该先加载类，然后再实现异步加载显示效果
		$(".common_content3 > img").addClass("lazy images_format");
		// 修改属性路径
		$(".common_content3 > img").attr('data-original',function(){
			return $("#imageone > img").attr("src")
		})
		// 实现图片的异步加载
		$("img.lazy").lazyload({effect: "fadeIn"});
		// 点击图片全屏显示，再次点击回复到原来状态
		$(".tapTouchImage > img").on("click",function(){
			if($(this).hasClass("tapImage")){
				$(this).removeClass("tapImage")
				$(".cover").fadeOut(500);
				return true;
			}else{
				$(this).addClass("tapImage");
				$(".cover").fadeIn(500);
				return true;

			}
		})
		$(".cover").on("click",function(){
			$(".tapTouchImage > img").removeClass("tapImage");
			$(".cover").fadeOut(500);
			return true;
		})
	})