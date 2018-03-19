
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

    // dialog_loan_message.open();

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