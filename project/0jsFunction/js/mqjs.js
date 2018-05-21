(function($) {
    $.fn.extend({       
        loadmore: function(options) {
            var defaults = {
                loading: '',
                next: function() {}
            };
            var set = $.extend({}, defaults, options);
            var start,
                end,
                length,
                isLock = false, //是否锁定整个操作
                isCanDo = false, //是否移动滑块
                isTouchPad = (/hp-tablet/gi).test(navigator.appVersion),
                hasTouch = 'ontouchstart' in window && !isTouchPad;
            /*var obj = document.querySelector(option.container);*/
            /*var loading = obj.firstElementChild;*/
            /*var offset = loading.clientHeight;*/

            return this.each(function() {
                var $t = $(this);

                var loadingNode = $t.find(set.loading);
                var loadingOffset = loadingNode.height();
                var objparent = $t.parent()[0];

                var fn = {
                    //移动容器
                    translate: function(diff) {
                        $t.css('transform', 'translate3d(0,' + diff + 'px,0)');
                        $t.css('webkitTransform', 'translate3d(0,' + diff + 'px,0)');
                    },
                    //设置效果时间
                    setTransition: function(time) {

                        $t.css('transition', 'all ' + time + 's');
                        $t.css('webkitTransition', 'all ' + time + 's');

                    },
                    //返回到初始位置
                    back: function() {
                        fn.translate(0 - loadingOffset);
                        //标识操作完成
                        isLock = false;
                    }
                };
                
                //滑动开始
                function start(e) {
                    if (objparent.scrollTop <= 0 && !isLock) {
                        var even = typeof event == "undefined" ? e : event;
                        //标识操作进行中
                        isLock = true;
                        isCanDo = true;
                        //保存当前鼠标Y坐标
                        start = hasTouch ? even.touches[0].pageY : even.pageY;
                        /*console.log(start);*/
                        //消除滑块动画时间
                        fn.setTransition(0);
                        loadingNode.innerHTML = '下拉刷新数据';
                    }
                    return false;
                };
                //滑动中
                function move(e) {
                    if (objparent.scrollTop <= 0 && isCanDo) {
                        var even = typeof event == "undefined" ? e : event;
                        //保存当前鼠标Y坐标
                        end = hasTouch ? even.touches[0].pageY : even.pageY;
                        /*console.log(end);*/
                        if (start < end) {
                            even.preventDefault();
                            //消除滑块动画时间
                            fn.setTransition(0);
                            //移动滑块
                            if ((end - start - loadingOffset) / 2 <= 150) {
                                length = (end - start - loadingOffset) / 2;
                                fn.translate(length);
                            } else {
                                length += 0.3;
                                fn.translate(length);
                            }
                        }
                    }
                };
                //滑动结束
                function end(e) {
                    if (isCanDo) {
                        isCanDo = false;

                        //判断滑动距离是否大于等于指定值
                        if (end - start >= loadingOffset) {
                            //设置滑块回弹时间
                            fn.setTransition(1);
                            //保留提示部分
                            fn.translate(0);
                            //执行回调函数
                            loadingNode.html('正在刷新数据');
                            if (typeof set.next == "function") {
                                set.next.call(fn, e);
                            }
                            /*setTimeout(function() {
                                fn.back.call();
                            }, 2000);*/
                        } else {
                            //返回初始状态
                            fn.back();
                        }
                    }
                };
                fn.translate(0 - loadingOffset);
                $t.on('touchstart', start);
                $t.on('touchmove', move);
                $t.on('touchend', end);
                $t.on('mousedown', start);
                $t.on('mousemove', move);
                $t.on('mouseup', end);

            });
        }
    });
})(jQuery);