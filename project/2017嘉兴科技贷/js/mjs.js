$(function() {
    /*var marginright = function(){
        var node = $('.exper_conts');
        node.each(function(){
            if($(this).index%2!==0){
                $(this).css('margin-right','30px');
            }
        })
    };*/
    var id_value = function() {
        var liNode = $('.moreSelectContent2 .exper_conts');
        liNode.each(function() {
            $(this).attr('data-id', $(this).index());
        });
    };
    var error_delete = function() {
        $('.dialog_edit_add').find('.errorTip').addClass('notshow');
        $('.pname').removeClass('input_error');
        $('.pjob').removeClass('input_error');
        $('.pexperience').removeClass('input_error');

    }
    /*marginright();   */
    id_value();
    //添加经历输入验证
    var dialog_check = function() {
        var pname = $('.pname').val(),
            pjob = $('.pjob').val(),
            pexperience = $('.pexperience').val(),
            isOk = true;
        if (pname == '') {
            $('.pname').addClass('input_error');
            $('.pname').parents('li').find('.errorTip').removeClass('notshow');
            isOk = false;
            console.log(pname + pjob + pexperience);
        }
        if (pjob == '') {
            $('.pjob').addClass('input_error');
            $('.pjob').parents('li').find('.errorTip').removeClass('notshow');
            isOk = false;
            console.log(pname + pjob + pexperience);
        }
        if (pexperience == '') {
            $('.pexperience').addClass('input_error');
            $('.pexperience').parents('li').find('.errorTip').removeClass('notshow');
            isOk = false;
            console.log(pname + pjob + pexperience);
        }
        return isOk;
    };
    var dialog_edit_add = $('.dialog_edit_add').modal({
        width: '500px',
        bgclose: true,

    });

    $('.pname').focus(function() {
        $(this).removeClass('input_error');
        $(this).parents('li').find('.errorTip').addClass('notshow');
    });
    $('.pjob').focus(function() {
        $(this).removeClass('input_error');
        $(this).parents('li').find('.errorTip').addClass('notshow');
    });
    $('.pexperience').focus(function() {
        $(this).removeClass('input_error');
        $(this).parents('li').find('.errorTip').addClass('notshow');
    });
    //添加经历
    $(".exper_add_btn").click(function() {
        $('.dialog_edit_add .title h3').html("添加经历");
        $('.dialog_edit_add .add_contents li:eq(0)').html("添加核心管理人员职业经历");
        $('.dialog_edit_add .dokay2').html("添加");
        $('.dokay2').attr('data-id', '');
        $('.pname').val("");
        $('.pjob').val("");
        $('.pexperience').val("");
        id_value();
        error_delete();
        dialog_edit_add.open();
    });
    //编辑经历
    $(document).on('click', '.exper_btns1', function() {
        $('.dialog_edit_add .title h3').html("编辑经历");
        $('.dialog_edit_add .add_contents li:eq(0)').html("编辑核心管理人员职业经历");
        $('.dialog_edit_add .dokay2').html("确定");
        var edit_npde = $(this).parents(".exper_conts");
        var data_id = edit_npde.attr('data-id');

        /* console.log(data_id);*/
        $('.dokay2').attr('data-id', data_id);
        var obj = edit_npde.find("li:eq(0)").clone();
        obj.find(':nth-child(n)').remove();
        var pname = obj.html().trim(),
            obj = edit_npde.find("li:eq(1)").clone();
        obj.find(':nth-child(n)').remove();
        pjob = obj.html().trim(),
            pexperience = edit_npde.find("li:eq(2) p").text().trim();

        $('.pname').val(pname);
        $('.pjob').val(pjob);
        $('.pexperience').val(pexperience);

        dialog_edit_add.open();


    });

    //添加 按钮
    $('.dokay2').click(function() {
        var data_id = $(this).attr('data-id');
        var pname = $('.pname').val(),
            pjob = $('.pjob').val(),
            pexperience = $('.pexperience').val();
        var flag = dialog_check();
        /*console.log(flag);*/
        if (!flag) { return false;}
        if (data_id) {
            var editnode = $('.moreSelectContent2 ul[data-id=' + data_id + ']');
            editnode.find('li:eq(0)').html('<label>姓名：</label>' + pname);
            editnode.find('li:eq(1)').html('<label>姓名：</label>' + pjob);
            editnode.find('li:eq(2)').html('<label>姓名：</label><p>' + pexperience + '</p>');

        } else {           
            var temp = '<ul class="exper_conts"><li><label>姓名：</label>' + pname + '</li><li><label>职位：</label>' + pjob + '</li><li><label>经历：</label><p>' + pexperience + '</p></li><div class="exper_btns"><a class="exper_btns_a exper_btns1">编辑</a><a class="exper_btns_a exper_btns2">删除</a></div></ul>';
            $(".moreSelectContent2").append(temp);
            id_value();           
        }
        dialog_edit_add.close();
    });
    //删除经历
    $(document).on('click', '.exper_btns2', function() {
        $(this).parents(".exper_conts").remove();
        id_value();
    });

    //勾选有无
    $('.financeContent label').on('click', function() {

        var $I = $(this).children('i'),
            data_value = $I.attr('data-value');
        $(this).parents('.financeContent').find('i').removeClass('radioselected');
        $I.addClass('radioselected');

        if (data_value === '1') {
            $('.finance_method').removeClass('notshow');
            checkKeJiDai();
        } else {
            $('.finance_method').addClass('notshow');
            $('.finance_method2').addClass('notshow');
        }

    });
    //是否选中科技贷
    var checkKeJiDai = function() {
        var $I = $('.moreSelectContent3 label > i[data-value=1] ');
        if ($I.hasClass('financechecked')) {
            $('.finance_method2').removeClass('notshow');
        } else {
            $('.finance_method2').addClass('notshow');
        }
    };
    /*var chooseOther = function(parentsName){
        var $I = $('.'+parentsName+'.other i');
        console.log($I);
        if($I.hasClass('financechecked')){
            $I.parents('.other').find('input').attr('readonly',false);
        }else{
            $('.finance_method2').addClass('notshow');
            $I.parents('.other').find('input').val('');
            $I.parents('.other').find('input').attr('readonly',true);
        }
    };*/
    //金融支持方式
    $('.moreSelectContent3 label').on('click', function() {
        var $I = $(this).children('i'),
            data_value = $I.attr('data-value');
        $I.toggleClass('financechecked');
        checkKeJiDai();
        /*chooseOther('finance_cont1');*/
        /*chooseOther('finance_cont2');*/
        if (data_value === '6' || data_value === '10') {
            if ($I.hasClass('financechecked')) {
                $I.parents('.other').find('input').attr('readonly', false);
            } else {
                $I.parents('.other').find('input').val('');
                $I.parents('.other').find('input').attr('readonly', true);
            }
        }
    });
    //选中的data_id存入
    $(".moreSelectContent3").click(function() {
        var arrayObj = new Array();
        $.each([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], function(i, n) {
            var ck = $("#finance_type_" + n).hasClass("financechecked");
            if (ck) {
                arrayObj.push(n);
            }
        });
        $("#finance_type").val(arrayObj);
    });

})

String.prototype.trim = function() {
    return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}

$(function() {
    $('.tab').tab({
        event: 'click',
        auto: false,
        before: function() {},
        after: function() {}
    });
});