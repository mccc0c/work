var isIE = /msie/i.test(navigator.userAgent) && !window.opera;

function fileChange(target) {
    var filePath = target.value,
        fileTypes = [".rar", ".RAR", ".zip", ".ZIP", ".doc", ".DOC", ".docx", ".DOCX", ".png", ".PNG", '.jpg', '.JPG'],
        fileTypesLen = fileTypes.length,
        fileMaxLength = 1024 * 20,
        fileSize = 0;
    if (filePath) {
        var fileend = filePath.substring(filePath.lastIndexOf('.')), //获取文件类型
            isNext = false;
        if (fileend && fileTypesLen > 0) {
            for (var i = 0; i < fileTypesLen; i++) {
                if (fileTypes[i] == fileend) {
                    isNext = true;
                    break;
                }
            }
        }
        //判断上传文件类型
        if (!isNext) {
            $(".upload").siblings("p").text('不接受此类型文件').show();
            return false;
        } else {
            $('.upload .tip').hide();
        }
        /*console.log(fileend);*/
    } else {
        return false;
    }
    //获取文件大小，浏览器兼容性
    if (isIE) {
        var fso = new ActiveXObject("Scripting.FileSystemObject");
        if (!fso.FileExists(filePath)) {
            alert("附件不存在，请重新输入！");
            return false;
        }
        fileSize = fso.GetFile(filePath).size;
    } else {
        fileSize = target.files[0].size;
    }

    var size = fileSize / 1024; //单位KB
    /*console.log(size);
    console.log(fileMaxLength / 1024);*/
    if (size > fileMaxLength) {
        alert("附件不能超过" + fileMaxLength / 1024 + 'M！');
        target.value = "";
        return false;
    }
    if (size < 0) {
        alert("附件大小不能为0M！");
        target.value = "";
        return false;
    }
    $('#signup').ajaxSubmit({
        type: 'post',
        url: "./data/area.json",
        beforeSend: function() {
            $('.bar').width(0)
        },
        uploadProgress: function(event, position, total, percentComplete) {
            var percentVal = percentComplete + '%';
            console.log(percentVal);
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
            $('.upload_after, .uploading').hide();
            $('.upload_before').show();
        },
        complete: function(r) {},
        resetForm: false,
        clearForm: false
    })


}