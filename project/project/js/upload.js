var isIE = /msie/i.test(navigator.userAgent) && !window.opera;

function fileChange(target, type) {
    var fileSize = 0;
    var filepath = target.value;
    // console.log(filepath);
    // 文件上传类型
    var filetypes, filemaxsize;
    filemaxsize = 1024 * 20; //20M
    var form = $(target).parents('form');
    switch (type) {
        case 'xls':
            filetypes = [".xls", ".XLS", ".XLSX", ".xlsx"];
            filemaxsize = 1024 * 20; //20M
            break;
        case 'img':
            filetypes = [".png", ".PNG", '.jpg', '.JPG'];
            filemaxsize = 1024 * 20; //20M
            break;
        default:
            filetypes = [".rar", ".RAR", ".zip", ".ZIP", ".doc", ".DOC", ".docx", ".DOCX", ".png", ".PNG", '.jpg', '.JPG'];
            filemaxsize = 1024 * 20; //20M
    }
    if (type != "") {
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
                // $(".filetypeBox p").text("不接受此文件类型！");
                // filetypeBox.open();
                alert("不接受此文件类型！");
                target.value = "";
                return false;
            }
        } else {
            return false;
        }
    }
    if (isIE && !target.files) {
        var filePath = target.value;
        var fileSystem = new ActiveXObject("Scripting.FileSystemObject");
        if (!fileSystem.FileExists(filePath)) {
            // $(".filetypeBox p").text("附件不存在，请重新输入！");
            alert('附件不存在，请重新输入！');
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
    ajax_upload(target.id, type, filepath, form);
}

function ajax_upload(file_element_id, type, file, form) {
    var data = {};
    data.file = file;

    form.ajaxSubmit({
        type: 'post',
        url: 'http://localhost:3000/filechange',
        secureuri: false,
        fileElementId: file_element_id,
        data: JSON.stringify(data),
        contentType: "application/json;  charset=utf-8",
        beforeSend: function() {
            form.find('.bar').width(0);
        },
        uploadProgress: function(event, position, total, percentComplete) {
            var percentVal = percentComplete + '%';
            form.find('.upload_before,.upload_after').hide();
            form.find('.uploading').show();
            form.find('.bar').width(percentVal);
        },
        success: function(data) {
            form.find(".file").val(data.result);
            form.find(".upload").next('.msg').css("visibility", "hidden");
            form.find('.upload_after').show();
            form.find('.upload_before,.uploading').hide();
            form.find(".fileName").val(data.result);
        },
        error: function() {
            form.find(".file").val('');
            form.find(".upload").siblings("p").text('上传失败').css("visibility", "visible");
            form.find('.upload_after,.uploading').hide();
            form.find('.upload_before').show();
            form.find(".fileName").val("");
        },
        complete: function(r) {},
        resetForm: false,
        clearForm: false
    });
}