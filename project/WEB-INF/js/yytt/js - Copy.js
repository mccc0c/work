$(function() {
    $('.goodicon').click(function() {
        $(this).toggleClass("touched");
        if ($(this).hasClass('touched')) {
            $('.dialog_good p').html('关注成功');

        } else {
            $('.dialog_good p').html('取消关注成功');
        }
        $('.good_background').stop(false, true).fadeIn();
        $('.dialog_good').stop(false, true).fadeIn();
        $('.dialog_good').stop(false, true).delay(800).fadeOut();
        $('.good_background').stop(false, true).delay(800).fadeOut();
    });
});
