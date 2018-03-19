var startday,
    endday;
$(function() {
    //放款信息确定
    $(document).on('click', '.dokay1', function() {
        if (!$(".form_apply").valid()) {
            return;
        }
        console.log('ok');
        return false;
    });
    //放款弹窗
    var dialog_loan_message = $('.loan_message').modal({
        dialog: '.dialog_loan_message',
        width: '500px',
        height: '500px',
        beforeOpen: function() {},
        onOk: function() {}
    });
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
            0:'零',
            1:"一",
            2:"二",
            3:"三",
            4:"四",
            5:"五",
            6:"六",
            7:"七",
            8:"八",
            9:"九"
        };
        var len = (len+1)+"",h="";
        for(var i=0;i<len.length;i++){
            h+=chnNumChar[len[i]]
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

        console.log('ok');
        return false;
    });
    //授信弹窗
    var dialog_credit_message = $('.credit_message').modal({
        dialog: '.dialog_credit_message',
        width: '600px',
        height: '500px',
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
    // dialog_loan_message.open();
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
                input.datepicker("option", "minDate", getDay(dateText, 1));
            }
        };
        if (endday) {
            option.maxDate = getDay(endday, 1);
        };
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


    //放款信息验证
    var formapply = $(".form_apply").validate({
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
            if (formapply.errorList.length == 0) {
                li.children('.msg').css("visibility", "hidden");
            }
        },
        onkeyup: function(element) {
            var el = $(element),
                li = el.parent('li');
            el.valid();
            if (formapply.errorList.length == 0) {
                li.children('.msg').css("visibility", "hidden");
            }
        },
        errorPlacement: function(error, element) {
            var el = $(formapply.errorList[0].element);
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
    //单选
    $(document).on('click', '.radiostyle>li', function() {
        $('.radioArea').parent('li').find('.msg').css('visibility', 'hidden');
        $('.radiostyle li').removeClass('on');
        var ele = $(this),
            dataValue = ele.attr('data-value'),
            hasEle = $('.hasmort'),
            hasInputEle = hasEle.find('input');
        ele.addClass('on');
        // console.log(dataValue);
        $('input[name="ismortage"]').val(dataValue);
        if (dataValue === "1") {
            hasEle.removeClass('hide');
            $('.muliCheck').attr('disabled', false);
            checkOtherIsSelect();
        } else {
            hasEle.addClass('hide');
            $('.muliCheck').attr('disabled', true);
            $('.otherDiv .otherInput').attr('disabled', true);
        }
        return false;
    });
    //多选
    $(document).on('click', '.checkarea>li', function() {
        var el = $(this),
            arr = [],
            flag = false,
            hasOtherFlag = false,
            val = el.attr('data-val'),
            parentLi = el.parents('.checkbox').parent('li'),
            input = parentLi.find('.muliCheck'),
            otherDiv = parentLi.find('.otherDiv'),
            otherDivInput = otherDiv.find('.otherInput');
        el.toggleClass('on');
        // console.log(input);
        parentLi.find(".checkarea>li").each(function(i, e) {
            if ($(e).hasClass('on')) {
                arr.push($(e).attr('data-val'));
                flag = true;
            }
        });
        arr.length > 0 ? input.val(JSON.stringify(arr)) : input.val("");
        if (flag) {
            input.next('p.msg').css('visibility', 'hidden');
        } else {
            input.next('p.msg').css('visibility', 'visible');
        }
        checkOtherIsSelect();
        /*if(val=="other"&&el.hasClass('on')){
            otherDiv.removeClass('hide');
            otherDivInput.attr('disabled',false);
        }else{
            otherDiv.addClass('hide');
            otherDivInput.attr('disabled',true);
        }*/
        return false;
    });
    //增加一项
    $(document).on('click', '.morebutton', function() {
        var ele = $(this),
            parent = ele.parent('.otherDiv').children('ul'),
            temp = $('.moreStyleTemp').html(),
            inputName = ele.attr("data-input");
        parent.append(temp);
        // console.log(temp);
        giveInputName(parent);
        return false;
    });
    //删除增加的一项
    $(document).on('click', '.otherDiv .delInput', function() {
        var ele = $(this),
            parent = ele.parents('.otherDiv').children('ul'),
            delLi = ele.parent('li');
        delLi.remove();
        giveInputName(parent);
        return false;
    });
});
//增加一项input命名
function giveInputName(pUlEle) {
    var liEl = pUlEle.find('li'),
        name = pUlEle.attr("data-input");
    liEl.each(function(i, e) {
        var inputEl = $(e).find('input'),
            inputName = name + '' + i;
        inputEl.attr('name', inputName);
    });
}
//查看是否有其他选项
function checkOtherIsSelect() {
    var ele = $('.muliCheck');
    ele.each(function(i, e) {
        var p = $(e).parent('li').find('.otherDiv'),
            input = p.find('.otherInput'),
            val = $(e).val(),
            flag = false;
        if (val !== "") {
            val = JSON.parse(val);
            for (var j = 0; j < val.length; j++) {
                // console.log(j, val[j]);
                if (val[j] == "other") {
                    flag = true;
                    break;
                }
            }
        }
        if (flag) {
            p.removeClass('hide');
            input.attr('disabled', false);
        } else {
            p.addClass('hide');
            input.attr('disabled', true);
        }
    });
}