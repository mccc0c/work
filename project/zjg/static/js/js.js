 $(function() {
    $('.accordion').accordion({
        event: 'click',
        showfirst: false
    });
    $('.accordion >dd>a').click(function() {
        $(".accordion >dd>a").each(function() {
            $(this).removeClass("choose");
        });

        $(this).addClass("choose");
    });
    $('.search input[type=text]').focus(function() {
        if (this.value == this.defaultValue) {
            this.value = "";
        }
    }).blur(function() {
        if (this.value == "") {
            this.value = this.defaultValue;
        }
    });
 });

 $("#server_content").on('focus', function() {
    $("#note_info").html("");
 });

var dialog_service = $('.service').modal({
    dialog:'.dialog_service ',
         width: '500px',
         onOk: function() {}
     });
 /*$(document).on('click', '.service', function() {    
     dialog_service.open();
 });*/
/*$(document).on('click','.dialog .dclose',function(){
    dialog_service.close();
});*/
 $(document).on('click', '#serviceform .dokay_pass', function() {
    if (!$("#serviceform").valid()) {
        return;
    };
    dialog_service.close();
 });

 var validator = $("#serviceform").validate({
    rules: {
        mobile: {
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
    onkeyup: function(element) {
        var el = $(element),
            li = el.closest('li');
        el.valid();
        if (validator.errorList.length == 0) {
            li.find('.msg').css("visibility", "hidden");
        }
    },
    errorPlacement: function(error, element) {
        var el = $(validator.errorList[0].element);
        var li = el.parent();
        li.find('.msg').css("visibility", "visible");
    }
 });

 //审核处理
 function audit(data) {
    if (data.status == "failed") {
        alert(data.msg);
        return false;
    }
    if (data.status == "success") {
        alert("操作成功");
        location.reload();
        return false;
    } else {
        alert(data.msg);
    }
 }

 //区域全选
 $("#district_all").click(function() {
    var a = $(this).attr("class");
    if (a == 'on') {
        $.each($(this).siblings("li"), function(i, n) {
            $(this).removeClass("on");
        });
    } else {
        $.each($(this).siblings("li"), function(i, n) {
            $(this).addClass("on");
        });

    }
 });

 //类型全选
 $("#etype_all").click(function() {
    var a = $(this).attr("class");
    if (a == 'on') {
        $.each($(this).siblings("li"), function(i, n) {
            $(this).removeClass("on");
        });
    } else {
        $.each($(this).siblings("li"), function(i, n) {
            $(this).addClass("on");
        });

    }
 });

 //银行全选
 $("#bank_all").click(function() {
    var a = $(this).attr("class");
    if (a == 'on') {
        $.each($(this).siblings("li"), function(i, n) {
            $(this).removeClass("on");
        });
    } else {
        $.each($(this).siblings("li"), function(i, n) {
            $(this).addClass("on");
        });

    }
 });

 //还款全选
 $("#repay_all").click(function() {
    var a = $(this).attr("class");
    if (a == 'on') {
        $.each($(this).siblings("li"), function(i, n) {
            $(this).removeClass("on");
        });
    } else {
        $.each($(this).siblings("li"), function(i, n) {
            $(this).addClass("on");
        });

    }
 });

 //金融需求全选
 $("#finance_all").click(function() {
    var a = $(this).attr("class");
    if (a == 'on') {
        $.each($(this).siblings("li"), function(i, n) {
            $(this).removeClass("on");
        });
    } else {
        $.each($(this).siblings("li"), function(i, n) {
            $(this).addClass("on");
        });

    }
 });

 //支持方式全选
 $("#fund_supports_all").click(function() {
    var a = $(this).attr("class");
    if (a == 'on') {
        $.each($(this).siblings("li"), function(i, n) {
            $(this).removeClass("on");
        });
    } else {
        $.each($(this).siblings("li"), function(i, n) {
            $(this).addClass("on");
        });

    }
 });

 function resize() {
    var w = $(window).width();
    if (w > 1500) {
        $('body').removeClass('w1024 w1200 w1500');
    } else if (w <= 1500 && w > 1200) {
        $('body').addClass('w1500');
        $('body').removeClass('w1024 w1200');
    } else if (w <= 1200 && w > 1024) {
        $('body').addClass('w1200');
        $('body').removeClass('w1024 w1500');
    } else {
        $('body').addClass('w1024');
        $('body').removeClass('w1200 w1500');
    }
 }

 resize();
 window.onresize = function() {
    resize();
 }
$('#start_time').datepicker({
     dateFormat: 'yy-mm-dd',
     changeYear: true,
     changeMonth: true,
     onSelect: function(dateText, inst) {
         $(this).next('.msg').css("visibility", "hidden");
         $("#end_time").datepicker("option", "minDate", getDay(dateText,1));
     }
 });
 $('#end_time').datepicker({
     dateFormat: 'yy-mm-dd',
     changeYear: true,
     changeMonth: true,
     onSelect: function(dateText, inst) {
         $("#start_time").datepicker("option", "maxDate", getDay(dateText,-1));
         $(this).next('.msg').css("visibility", "hidden")
     }
 });

 function getDay(d,n) {
     d = new Date(d);
     d = +d + 1000 * 60 * 60 * 24*n;
     d = new Date(d);
     return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
 }