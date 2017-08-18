$(function() {
    /*$('.goodicon').click(function() {
        
    });*/
    $(document).on('click','.goodicon',function(){
        $(this).toggleClass("touched");
        if ($(this).hasClass('touched')) {
            $('.dialog_good p').html('点赞成功');

        } else {
            $('.dialog_good p').html('取消点赞');
        }
        $('.good_background').stop(false, true).fadeIn();
        $('.dialog_good').stop(false, true).fadeIn();
        $('.dialog_good').stop(false, true).delay(800).fadeOut();
        $('.good_background').stop(false, true).delay(800).fadeOut();

        $.ajax({
            type: "POST",
            url:$(this).data("domain"),
            data:{
                "comId":$(this).data("id")
            },
            async: true,
            success: function(data) {
                console.log(data);
            },
            error: function(data) {

            }
        });
    })
});
