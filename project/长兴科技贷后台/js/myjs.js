var replaylist = ["你的财务状况不符合标准，故无法通过。",
    "你的高新技术产业产值不符合标准，故无法通过。",
    "你的资产负债率不符合标准，故无法通过。你的资产负债率不符合标准，故无法通过。你的资产负债率不符合标准，故无法通过。你的资产负债率不符合标准，故无法通过。",
    "你的资产负债率不符合标准，故无法通过。你的资产负债率不符合标准，故无法通过。"
];

$(function() {
    var sameHeight = function() {
        $('.editingshow').each(function() {
            var h = $(this).parents('li').height();
            $(this).height(h);
        });
    };
    var id_value = function() {
            var liNode = $('#results li');
            liNode.each(function() {
                $(this).attr('data-id', $(this).index());
            });
        }
        //快捷编辑内容
    $('#results').tmpl('tmpl', replaylist);
    //选中快捷回复内容
    var checked = function() {
        $(this).siblings().removeClass("act");
        $(this).addClass("act");
    };
    $(document).on('click', '.dialog_retract .fast_return .return_cont li', checked);
    //关闭按钮
    $('.dclose2').click(function() {
        $('.return_cont').toggleClass('displayon');
    });
    $('.dclose3').click(function() {
        $('.editDialog').hide();
    });
    //使用快捷回复 按钮
    $('.fast_return_btn').click(function() {
        $('.return_cont').toggleClass('displayon');
    });
    //确定使用 按钮
    $(".return_cont .ok_btn").click(function() {
            var text = $('.return_list .act').text();
            if (text) {

                $('.retract_con').html(text);
            }
            $('.return_cont').removeClass('displayon');
        })
        //编辑 按钮
    $('.return_cont .edit_btn').click(function() {
        $('.return_list div').toggleClass('displayoff');
        $('.return_list li').toggleClass('editing');
        sameHeight();
    });
    //删除 按钮
    $(document).on('click', '.delcont', function() {
        $(this).parents("li").remove();
        id_value();

    });
    //编辑图片 按钮
    $(document).on('click', '.editcont', function() {
        $('.editDialog').show();
        var text = $(this).parents("li").text();
        $('.editDialog textarea').val(text);
        var data_id = $(this).parents("li").attr("data-id");
        $('.editDialog').find('.doedit').attr('data-id', data_id);
        $('.editDialog .editDialogTitle').html('编辑快捷回复');
    });
    //新增 按钮
    $(document).on('click', '.add_btn', function() {
        $('.editDialog').show();
        $('.editDialog').find('textarea').val("");
        $('.editDialog').find('.doedit').attr('data-id', "");
        $('.editDialog .editDialogTitle').html('添加快捷回复');
    });
    //确定添加 按钮
    $(document).on('click', '.doedit', function() {
        $('.editDialog').hide();
        var data_id = $(this).attr('data-id');
        var text = $('.editDialog .add_conts').val();
        var add_li;
        var hasthisClass = $("#results").find('li').hasClass('editing');
        if (!text) {
            return;
        }
        if (data_id) {

            $("#results").find('li[data-id="' + data_id + '"]').text(text).append($('<div class="editingshow"><i class="delcont"></i><i class="break"></i><i class="editcont"></i></div>'));
        } else {
            if (hasthisClass) {
                add_li = '<li class="editing">' + text + '<div class="editingshow"><i class="delcont"></i><i class="break"></i><i class="editcont"></i></div></li>';
            } else {
                add_li = '<li>' + text + '<div class="editingshow displayoff"><i class="delcont"></i><i class="break"></i><i class="editcont"></i></div></li>';
            }

            $('.return_list').append($(add_li));
        }
        id_value();
        sameHeight();
    });


})
