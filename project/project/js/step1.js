var pCount = getCookie('pCount');
if(pCount) {
    $('.checkReal').addClass('btnclickon').css('visibility','visible');
}else{
    $('.checkReal').css('visibility','visible');
}
// 弹窗提示
var filetypeBox = $('.filetypeBox').modal({
    width: 400,
    bgclose: 0
});
$(function() {
    $(document).on('click', '.dclose', function() {
        filetypeBox.close();
    });
    $(document).on('click', '.dokay', function() {
        filetypeBox.close();
    });

    $(document).on('click', '#step1 .nextbtn', function() {
        if (!$("#step1").valid()) {
            return;
        } else {
            // 企业真实性
            var info = $('#register_info').val();
            var regis_year = $('#register_year').val();
            if (info == undefined || info == '' || regis_year == '') {
                $(".filetypeBox p").html('请点击<button type="button" class="checkReal2">检查名称真实性</button> 完成真实性检测');
                filetypeBox.open();
                return;
            }
            if (regis_year < 1) {
                $(".filetypeBox p").html('系统检测您的企业注册时间未满一年，暂不符合申请标准');
                filetypeBox.open();
                return;
            }
            $(".nextBtn").attr("href", "javascript:void(0)");
            $(".nextBtn").text("正在处理...");
            $("#step1").submit();
        };
    });
    var validator = $("#step1").validate({
        ignore: "not:hidden",
        rules: {
            contactPhone: {
                isPhone: true
            }
        },
        onfocusout: function(element) {
            var el = $(element),
                li = el.closest('li');
            el.valid();
            if (validator.errorList.length == 0) {
                li.find('.msg').css("visibility", "hidden");
            }
        },
        onkeyup: function(element) {},
        //滚动错误
        invalidHandler: function(form, validator) {
            var errors = validator.numberOfInvalids();
            if (errors) {
                var el = $(validator.errorList[0].element);
                var li = el.closest('li');
                li.find('.msg').css("visibility", "visible");
                $('html,body').animate({
                    scrollTop: (li.offset().top - 200) + 'px'
                }, 100);
            }
        },
        errorPlacement: function(error, element) {
            var el = $(validator.errorList[0].element);
            var li = el.closest('li');
            li.find('.msg').css("visibility", "visible");
        }
    });

    var pCount = getCookie('pCount');
    var cTimer;
    var cFlag = true;
    if (pCount) {
        var pTime = getCookie('pTime');
        var time2 = (new Date()).getTime();
        var a = pCount - Math.floor((time2 - pTime) / 1000);
        $('.checkReal').text("重新发送(" + a + ")");
        $('.sms').addClass('on');
        counter(a);
        if (a < 0) {
            resetCounter();
            $('.checkReal').removeClass('btnclickon');
            $('.checkReal').closest('li').find('input[name="custName"]').removeClass("noinput");
        };
        var name = getCookie('companyInput');
        get_enterprise_info(name)
    };

    function resetCounter() {
        clearInterval(cTimer);
        $('.sms').removeClass('on');
        cFlag = true;
        $('.checkReal').text("检查名称真实性");
        $('#custName').attr("readonly",false);
        removeCookie('pCount');
        removeCookie('pTime');
    };

    function counter(a) {
        $('#custName').attr("readonly","readonly");
        $('.checkReal').addClass('btnclickon');
        $('.checkReal').closest('li').find('input[name="custName"]').addClass("noinput");
        cTimer = setInterval(function() {
            if (a > 0) {
                a--;
                $('.checkReal').text("重新发送(" + a + ")");
                setCookie('pCount', a);
                setCookie('pTime', (new Date()).getTime());
            } else {
                resetCounter();
                $('.checkReal').removeClass('btnclickon');
                $('.checkReal').closest('li').find('input[name="custName"]').removeClass("noinput");
            }
        }, 1000);
    };
    var rcom = getCookie('companyInput');
    if (rcom) {
        $('#custName').val(rcom);
    };
    // 检查企业名称真实性
    $('body').on('click', '.checkReal', function() {
        if (!cFlag) {
            return;
        };
        $('#register_none_tip').hide();
        $(this).siblings('.msg').css("visibility", "hidden");
        filetypeBox.close();
        var name = $('#custName').val();
        var pattern = /^[\u4E00-\u9FA5\(\)\（\）]+$/;
        if (name == undefined || name == '') {
            $(this).siblings('.msg').text("企业名称不能为空").css("visibility", "visible");
            cFlag = true;
        } else if (!pattern.test(name)) {
            $(this).siblings('.msg').text("企业名称不规范").css("visibility", "visible");
            cFlag = true;
        }  else {
            var a = getCookie('pCount') || 60;
            counter(a);
            if (get_enterprise_info(name)) {
                setCookie('companyInput', name);
                $(this).siblings('.msg').css("visibility", "hidden");
            }
            cFlag = false;
        };
        
    });
});

$(document).on("input", 'input[name="custName"]', function() {
    $('.checkedReal').css('visibility','hidden');;
    $('#register_info').val('');
    $('#register_year').val('');
    $('#register_none_tip').hide();
})

var isIE = /msie/i.test(navigator.userAgent) && !window.opera;

// 有上传进度条的上传文件
function fileChange(target, type) {
    var fileSize = 0;
    var filepath = target.value;
    // 文件上传类型
    var filetypes, filemaxsize;
    switch (type) {
        case 'license': // 营业执照
            filetypes = [".jpg", ".JPG", ".jpeg", ".JPEG", ".pdf", ".PDF", ".png", "PNG"];
            filemaxsize = 1024 * 20; //20M
            break;
        default:
            filetypes = [".rar", ".RAR", ".zip", ".ZIP"];
            filemaxsize = 1024 * 20; //20M
    }

    if (filepath) {
        var isnext = false;
        var fileend = filepath.substring(filepath.lastIndexOf("."));
        // var fileend = filepath.substr(-4,4);
        if (filetypes && filetypes.length > 0) {
            for (var i = 0; i < filetypes.length; i++) {
                if (filetypes[i] == fileend) {
                    isnext = true;
                    break;
                }
            }
        }
        if (!isnext) {
            $(".filetypeBox p").text("不接受此文件类型！");
            filetypeBox.open();
            target.value = "";
            return false;
        }
    } else {
        return false;
    }

    if (isIE && !target.files) {
        var filePath = target.value;
        var fileSystem = new ActiveXObject("Scripting.FileSystemObject");
        if (!fileSystem.FileExists(filePath)) {
            $(".filetypeBox p").text("附件不存在，请重新输入！");
            return false;
        }
        var file = fileSystem.GetFile(filePath);
        fileSize = file.Size;
    } else {
        fileSize = target.files[0].size;
    }

    var size = fileSize / 1024;
    if (size > filemaxsize) {
        alert("附件大小不能大于" + filemaxsize / 1024 + "M！");
        target.value = "";
        return false;
    }
    if (size <= 0) {
        alert("附件大小不能为0M！");
        target.value = "";
        return false;
    }
    ajax_upload('uploadfile', type);
}

function ajax_upload(file_element_id, type) {
    $('#step1').ajaxSubmit({
        type: 'post',
        url: '/yrtong/yangpu/ajax_upload_files/' + type,
        data: {},
        secureuri: false,
        fileElementId: file_element_id,
        dataType: 'json',
        beforeSend: function() {
            $('.bar').width(0)
        },
        uploadProgress: function(event, position, total, percentComplete) {
            var percentVal = percentComplete + '%';
            $('.upload_before').hide();
            $('.uploading').show();
            $('.bar').width(percentVal)
        },
        success: function(data) {
            // var data = eval('('+data+')');
            $("#file").val(data.pic);
            $(".upload").next('.msg').css("visibility", "hidden");
            $('.upload_after').show();
            $('.upload_before,.uploading').hide();
        },
        error: function() {
            $("#file").val('');
            $(".upload").siblings("p").text('上传失败').css("visibility", "visible");
            $('.upload_after,.uploading').hide();
            $('.upload_before').show();
        },
        complete: function(r) {},
        resetForm: false,
        clearForm: false
    });
}

// 用企业名称获取企业信息
function get_enterprise_info(name) {
    var ck = 0;
    $.ajax({
        async: false,
        dateType: "json",
        type: 'post',
        data: {
            name: name
        },
        url: '/yrtong/yangpu/ajax_query_enterprise_name?' + (new Date().valueOf()),
        success: function(result) {
            var info = eval("(" + result + ")");
            ck = info.ck;
            if (ck == 1) {
                var data = info.data;
                // 注册相关信息
                $('#register_info').val(data.register_info);
                // 注册年限
                var date = new Date();
                var start_date = new Date(data.start_date);
                var t = (date - start_date) / 1000;
                var year_seconds = 365 * 3600 * 24;
                $('#register_year').val((t / year_seconds).toFixed(2));
                $('.checkedReal').html("<i></i>已验证真实性").attr('style', 'color:#000').css('visibility','visible');
            } else if(ck == -1) { // 企业存在审核中贷款信息
                $('.checkedReal').html('该企业已有贷款在申请中，如有疑问请咨询客服').attr('style', 'color:red').css('visibility','visible');
                $('#register_none_tip').html('该企业已有贷款在申请中，如有疑问请咨询客服').show();
            } else {
                $('#register_info').val('');
                $('#register_year').val('');
                $('.checkedReal').html("企业信息不存在").attr('style', 'color:red').css('visibility','visible');
                $('#register_none_tip').text("企业信息不存在").show();
            }
        }
    });
    return ck;
}