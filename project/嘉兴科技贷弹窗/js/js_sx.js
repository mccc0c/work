var startday,
    endday;
$(function() {
    //新增授信
    $(document).on('click', '.moreCredit', function() {
        var ele = $(this),
            temp = $('.addCreditTemp').html(),
            ul = $('.creditlist'),
            len = $('.creditlist>li').length;
        ul.append(temp);
        var lastli = $('.creditlist>li:last-child'),
            input = lastli.find('input');
        input.each(function(i, e) {
            $(e).attr('name', 'newcreInput' + i + len);
        });
        var chnNumChar = {
            0: '零',
            1: "一",
            2: "二",
            3: "三",
            4: "四",
            5: "五",
            6: "六",
            7: "七",
            8: "八",
            9: "九"
        };
        var len = (len + 1) + "",
            h = "";
        for (var i = 0; i < len.length; i++) {
            h += chnNumChar[len[i]];
        }
        lastli.find('.creid label').html('第' + h + "次授信");
        startday = "";
        endday = "";
        return false;
    });
    //保存新增
    $(document).on('click', '.toSave', function() {
        var ele = $(this),
            form = ele.parents('.addform');

        if (!form.valid()) {
            return;
        }
        var data = form.serializeArray(),
        postData = {};
        $.each(data, function(i, e) {
            postData[e["name"]] = e["value"];
        });
        console.log(postData);
        return false;
    });
    //授信弹窗
    var dialog_credit_message = $('.credit_message').modal({
        dialog: '.dialog_credit_message',
        width: '600px',
        height: '90%',
        beforeOpen: function() {},
        onOk: function() {}
    });
    //失效弹窗
    $('.toLost').modal({
        dialog: '.dialog_del',
        width: '400px',
        height: '250px',
        onOk: function(a) {}
    });
    // dialog_credit_message.open();
    //新增授信日历
    $(document).on('focus', '.credit_start', function() {
        var that = $(this);
        var option = {
            dateFormat: 'yy-mm-dd',
            changeYear: true,
            changeMonth: true,
            // maxDate:getDay(startday, 1),
            onSelect: function(dateText, inst) {
                var ele = that,
                    p = ele.parents('.credetail'),
                    input = p.find('.credit_end');
                // console.log(input);
                ele.parent('li').find('label.error').hide();
                startday = dateText;
                input.datepicker("option", "minDate", getDay(dateText, -1));
            }
        };
        if (endday) {
            option.maxDate = getDay(endday, -1);
        }
        that.datepicker(option);
    });
    $(document).on('focus', '.credit_end', function() {
        var that = $(this);
        var option = {
            dateFormat: 'yy-mm-dd',
            changeYear: true,
            changeMonth: true,
            onSelect: function(dateText, inst) {
                // console.log(that);
                var ele = that,
                    p = ele.parents('.credetail'),
                    input = p.find('.credit_start');
                ele.parent('li').find('label.error').hide();
                endday = dateText;
                input.datepicker("option", "maxDate", getDay(dateText, 1));
            }
        };
        if (startday) {
            option.minDate = getDay(startday, 1);
        }
        that.datepicker(option);
        return false;
    });
    //新增授信验证
    /*var addform = $(".addform").validate({
        rules: {
            mobile: {
                isPhone: true
            }
        },
        ignore: "not:hidden",
        onfocusout: function(element) {
            var el = $(element),
                li = el.parent('li');
            el.valid();
            if (addform.errorList.length == 0) {
                li.children('.msg').css("visibility", "hidden");
            }
        },
        onkeyup: function(element) {
            var el = $(element),
                li = el.parent('li');
            el.valid();
            if (addform.errorList.length == 0) {
                li.children('.msg').css("visibility", "hidden");
            }
        },
        errorPlacement: function(error, element) {
            var el = $(addform.errorList[0].element);
            var li = el.parent('li');
            element.removeClass('error');
            el.addClass('error');
            li.children('.msg').css("visibility", "visible");
        },
        invalidHandler: function(form, validator) {
            var errors = validator.numberOfInvalids();
            if (errors) {
                $('.msg').css("visibility", "hidden");
                var el = $(validator.errorList[0].element);
                var li = el.parent('li');
                $('.dcontent').animate({
                    scrollTop: ((li[0].offsetTop) - 100) + 'px'
                }, 100);
            }
        }
    });*/
});