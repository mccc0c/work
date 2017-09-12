$(function() {
    $('.datepicker').datepicker({
        dateFormat: 'yy-mm-dd',
        changeYear: true,
        changeMonth: true,
        onSelect: function() {
            if ($(this).hasClass('update_from')) {
                setTimeout(function() {
                    $('.update_to').focus();
                }, 0);
            }
        }
    });

    function editOrAdd(set) {
        var dialogtitle = set.dialog + ' .title' + ' h3',
            btnDokay = set.dialog + ' .dbtn' + ' .dokay2';
        $(dialogtitle).html(set.h3Name);
        $(btnDokay).html(set.dokayName);
    };
    //关闭弹窗
    function closeDialog(dialogName) {
        $('.' + dialogName).hide();
        $('.modalbg').hide();
        $("body").css({ "overflow": "auto", "padding-right": "0px" });
    }
    //初始化弹窗数据
    function employdialogInfo(set) {
        var dialogName = set.dialog,
            inputText = dialogName + ' input[type="text"]',
            error = dialogName + ' .myerror',
            radio = dialogName + ' .radio_style',
            select = dialogName + ' select';
        $(error).hide();
        $(inputText).each(function() {
            $(this).val('');
        });
        $(radio).eq(0).trigger("click");
        $("#proname option").removeAttr("selected");
        $("#proname option:contains('请选择')").attr("selected",true);
        /*$(select).each(function() {
            $(this).val('请选择');
        })*/
    };
    //获取编辑信息
    function getDialogInfo(e, set) {
        var dialogName = set.dialog,
            error = dialogName + ' .myerror',
            data = [],
            select = dialogName + ' select',
            radio = dialogName + ' .radio_style',
            input = dialogName + ' input[type="text"]';
        
        $(error).hide();
        // 获取数据
        var td = $(e).parent().parent('tr').find('td');

        td.each(function() {
            data.push($.trim($(this).html()));
        });
        $(radio).each(function() {
            if ($.trim($(this).html()) == data[1]) {
                $(this).trigger("click");
            }
        });
        $("#proname option").removeAttr("selected");
        $("#proname option").each(function() {
            var value = $(this).attr('value');
            if (value == data[2]) {
                $(this).prop('selected', true);
                return false;
            }
        });
        $(input).eq(0).val(data[3]);
        $(input).eq(1).val(data[4]);
        $(input).eq(2).val(data[5]);

    };
    // 增加联系人弹窗
    var addDialog = $('#addPeo').modal({
        dialog: '.dialog_addPeople',
        width: '568px',
        height: '390px',
        beforeOpen: function() {
            var set = {
                dialog: '.dialog_addPeople',
                h3Name: '新增联系人',
                dokayName: '确定添加'
            };
            /*editOrAdd(this, set);*/
            var dialogtitle = set.dialog + ' .title' + ' h3',
                btnDokay = set.dialog + ' .dbtn' + ' .dokay2';
            $(dialogtitle).html(set.h3Name);
            $(btnDokay).html(set.dokayName);
            employdialogInfo(this);

        },
        onOk: function() {}
    });
    /*var editDialog = $('.dialog_addPeople').modal({
        width: '568px',
        height: '390px',
        beforeOpen:function(){
            var set = {
                dialog:'.dialog_addPeople',
                h3Name:'新增联系人',
                dokayName:'确定添加'
            };
            editOrAdd(set);
            employdialogInfo(set);

        },
        onOk: function() {}
    });
    $(document).on('click','#addPeo',function(){
        editDialog.open();
    });*/

    //编辑
    var editDialog = $('.table_btn .edit_people').modal({
        dialog: '.dialog_addPeople',
        width: '568px',
        height: '390px',
        beforeOpen: function() {
        },
        onOk: function() {}
    });
    $(document).on('click', '.table_btn .edit_people', function() {
        var set = {
            dialog: '.dialog_addPeople',
            h3Name: '编辑联系人',
            dokayName: '确定编辑'
        };
        editOrAdd(set);

        getDialogInfo(this, set);
    });

    /*$('.table_btn .edit_people').modal({
        dialog: '.dialog_addPeople',
        width: '568px',
        height: '390px',
        beforeOpen:function(){
            var set = {
                h3Name:'编辑联系人',
                dokayName:'确定编辑'
            }
            editOrAdd(this,set);
            getDialogInfo(this);
            console.log(argument.caller);
        },
        onOk: function() {}
    });*/

    //单选框
    $('.form_addPeople .radio_style').click(function() {
        $(this).addClass('selected');
        $(this).siblings('.radio_style').removeClass('selected');
    })
    /*验证*/
    var form_addPeople = $('#form_addPeople');
    if (form_addPeople[0]) {
        var validator = form_addPeople.validate({
            messages: {
                pname: '请输入联系人姓名',
                pjob: '请输入联系人职位',
                pphone: '请输入联系人手机'

            },
            ignore: "not:hidden",
            onfocusout: function(element, event) {
                $element = $(element);
                if ($element.is(':input') && !$element.is(':password')) {
                    $element.val($.trim($element.val()));
                }
            },
            onkeyup: function(element) {
                var errors = validator.numberOfInvalids();
                if (errors && validator.errorList[0] && $(validator.errorList[0].element).valid()) {
                    $('.myerror').hide();
                };
            },
            invalidHandler: function(form, validator) {
                var errors = validator.numberOfInvalids();
                if (errors) {
                    $('.myerror span').html(validator.errorList[0].message);
                    $('.myerror').show();
                    validator.errorList[0].element.focus();
                    return false;
                }
            },
            errorPlacement: function(error, element) {}
        });
        //errorPlacement: Override error placement to not show error messages beside elements //
        //弹窗确认按钮
        $(document).on('click', '.dokay2', function() {
            if (!check_select()) {
                $('.myerror').find('span').html('请选择部门名称');
                $('.myerror').show();
                $('#proname').focus();
                return false;
            }
            if (form_addPeople.valid()) {
                if (!check_phone_num()) {
                    $('.myerror').find('span').html('联系电话格式不正确');
                    $('.myerror').show();
                    $('#pphone').focus();
                    return false;
                } else {
                    $('.myerror').hide();
                    /*m1.close();*/
                    closeDialog('dialog_addPeople');
                    var btnname = $.trim($(this).html());
                    /*console.log(btnname);*/
                    if (btnname == "确定编辑") {
                        console.log("编辑..");
                    }
                    if (btnname == "确定添加") {
                        console.log("添加");
                    }
                    /*$.ajax({
                        type: 'post',
                        url: '/saveDemand',
                        data: form_addPeople.serialize(),
                        dataType: 'json',
                        success: function(data) {
                            if (data.status) {
                                $('.myerror').hide();
                                m1.close(); //form表单隐藏
                                setTimeout(function() {
                                    m2.open(); //成功弹框显示
                                }, 200);
                                form_addPeople[0].reset();
                            } else {
                                $('.myerror span').html('提交失败，请重试！');
                                $('.myerror').show();
                                return false;
                            }
                        },
                        error: function(data){
                            var errors = data.responseText;
                            errors = eval('('+errors+')');
                            $('.myerror span').html(errors[0]);
                            $('.myerror').show();
                            return false;
                        }
                    });*/
                }
            }
        });
    }

    function check_phone_num() {
        var phone_reg = /^1[3578][0-9]{9}$/;
        return phone_reg.test($('#pphone').val());
    };

    function check_select() {
        var value = $('#proname option:selected').val();
        if (value === "请选择") {
            return false;
        } else {
            return true;
        }
    };
    /*删除弹框*/
    $('.del_people').modal({
        dialog: '.dialog_del',
        width: '300px',
        height: '190px',
        onOk: function() {
            /*删除确认触发方法*/
        }
    })
});