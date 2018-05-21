function SlotMachine(selector, length) {
        var item = $(selector);
        var height = item.height();
        var y = length * height * 10; // 10为转的圈数
        var time = 3000; // 单个动画时间
        var delay = 500; // 单个动画间隔

        function rand(min, max) {
            return ~~(Math.random() * (max - min + 1)) + min;
        }

        this.random = function () {
            item.each(function (i) {
                $(this).css({backgroundPositionY: height * rand(0, length - 1)});
            });
        }

        this.reset = function () {
            item.each(function (i) {
                $(this).css({backgroundPositionY: 0});
            });
        }

        this.lottery = function (results, callback) {
            var count = 3;

            function fn() {
                if (--count === 0 && typeof callback === "function") {
                    callback();
                }
            }

            item.each(function (i) {
                var target = $(this);
                // 取余 为了多次转 能转得动
                var cy = parseInt(target.css('backgroundPositionY')) % (length * height);
                target.css({backgroundPositionY: cy});

                setTimeout(function () {
                    target.animate({
                        backgroundPositionY: y - results[i] * height
                    }, time, fn);
                }, delay * i);
            });
        }
    }