$(function() {
    var pressX = 0,
        pressY = 0;
    var $t = $(this);
    var obj = $('.slidetouch')[0];
    var t = 0;
    var activeIndex = 0;
    var slide = $(this).children('.slide');
    var total = slide.length;
    var slideDirection;
    var horizontal;
    var noslide;

    document.addEventListener('touchmove', preventTouch, false);

    function preventTouch(e) {
        e.preventDefault();
    };
    obj.addEventListener('touchstart', function(event) {
        //event.preventDefault(); form表单提交等
        event.stopPropagation();
        if (event.targetTouches.length == 1) {
            var touch = event.targetTouches[0];
            t = Date.now();
            pressX = touch.pageX;
            pressY = touch.pageY;
        };

    }, false);


    obj.addEventListener('touchmove', function(event) {
        event.preventDefault();
        event.stopPropagation();
        if (event.targetTouches.length == 1) {
            var touch = event.targetTouches[0];
            var spanX = touch.pageX - pressX;
            var spanY = touch.pageY - pressY;
            trans(obj, 0, spanY);
        }
    }, false);

    function trans(obj, x, y) {
        obj.style.webkitTransform = "translate3d(" + x + "px, " + y + "px, 0px)";
    }
/*    $(document).on('touchmove', '.noslide', stop);

    function stop(e) {
        e.stopPropagation();
    }*/

})