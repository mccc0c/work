define(function (require) {
    var SlotMachine = require('app/interactive-slotmachine');

    var slotMachine = new SlotMachine('li', 10); // 10代表显示种类有10种。本例用的是0~9 所以就是10

    slotMachine.random(); // 随机打乱

//	slotMachine.reset(); // 置为第一个


    $('button').click(begin);

    function begin() {
        // TODO AJAX.
        var res = [5,2,0]; // 3个元素的数组, 表示显示结果. (背景图从上到下的顺序)

        slotMachine.lottery(res, function() {
            alert('恭喜' + res); // 可以写个setTimeout 稍微停一会 再弹出信息
        });
    }

});