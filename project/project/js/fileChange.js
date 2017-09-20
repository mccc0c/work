var isIE = /msie/i.test(navigator.userAgent) && !window.opera;
function fileChange(target) {
    var fileSize = 0;
    var filetypes = [".rar", ".RAR", ".zip", ".ZIP", ".doc", ".DOC", ".docx", ".DOCX"];
    var filepath = target.value;
    var filemaxsize = 1024 * 20;
    //20M
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
            alert("不接受此文件类型！");
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
            alert("附件不存在，请重新输入！");
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
    $('#signup').ajaxSubmit({
        type: 'post',
        url: "/yrh/innovation/ajax_upload_file",
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
            $("#file").val(data.pic);
            $(".upload").siblings("p").hide();
            $('.upload_after').show();
            $('.upload_before,.uploading').hide();
        },
        error: function() {
            $("#file").val('');
            $(".upload").siblings("p").text('上传失败').show();
            $('.upload_after').hide();
            $('.upload_before').show();
        },
        complete: function(r) {},
        resetForm: false,
        clearForm: false
    });
}
function ajax_upload(file_element_id) {
    $.ajaxFileUpload({
        url: '/yrh/innovation/ajax_upload_file',
        secureuri: false,
        fileElementId: file_element_id,
        dataType: 'json',
        data: {},
        xhr: upProgress,
        success: function(data) {
            $("#file").val(data.pic);
            $(".upload").siblings("p").hide();
            $('.upload_after').show();
            $('.upload_before').hide();
        },
        error: function() {
            $("#file").val('');
            $(".upload").siblings("p").text('上传失败').show();
            $('.upload_after').hide();
            $('.upload_before').show();
        }
    });
}
//项目名称
$(".project_name").blur(function() {
    if ($(".project_name").val() != "") {
        $(".project_name").siblings("p").hide();
    }
})
//联系人
$(".conect").blur(function() {
    if ($(".conect").val() != "") {
        $(".conect").siblings("p").hide();
    }
})
//手机号
$(".mobile").blur(function() {
    if ($(".mobile").val() != "") {
        $(".mobile").siblings("p").hide();
    }
})
$(".submit_btn").on("click", function() {
    var phone = /^1([38]\d|4[57]|5[0-35-9]|7[06-8]|8[89])\d{8}$/;
    //项目名称
    if ($('.project_name').val() == "") {
        $(".project_name").siblings("p").show();
        $(".project_name").focus();
        return false;
    }
    //联系人
    if ($('.conect').val() == "") {
        $(".conect").siblings("p").show();
        $(".conect").focus();
        return false;
    }
    //手机号
    if ($(".mobile").val() == "" || !phone.test($(".mobile").val())) {
        $(".mobile").siblings("p").show();
        $(".mobile").focus();
        return false;
    }
    //附件
    if ($("#file").val() == "") {
        $(".upload").siblings("p").text('请上传报名表').show();
        return false;
    }
    $('#signup').submit();
});
