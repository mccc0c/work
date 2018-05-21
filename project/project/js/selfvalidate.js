var password = new function() {

    //原始密码
    this.oldpassword_check = function() {
        if ($("#oldpass").val() == '') {
            $('#oldpass').siblings('.exclamation').text('原始密码不能为空！').css('display', 'inline-block');
            $('#oldpass').css('border', '1px solid #ee6f15');
            return false;
        } else {
            $('#oldpass').css('border', '1px solid #eaeaea');
            return true;
        }
    };

    //新的密码
    this.password_check = function() {
        if (!$("#newpass").val().match(/(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{6,20}$/)) {
            $("#newpass").siblings('.exclamation').text("密码需设置6位及以上，且包含字母和数字").css('display', 'inline-block');
            $('#newpass').css('border', '1px solid #ee6f15');
            $("#newpass").focus(function() {
                $("#newpass").siblings('.exclamation').hide().text('请完成该项！');
                $('#newpass').css('border', '1px solid #ee6f15');
            });
            return false;
        } else {
            if ($("#newpass").val() == $("#oldpass").val()) {
                $("#newpass").siblings('.exclamation').text("新密码不能与原始密码相同！").css('display', 'inline-block');
                $('#newpass').css('border', '1px solid #ee6f15');
                return false;
            }
            $('#newpass').css('border', '1px solid #eaeaea');
            return true;
        }

    };

    //重复密码
    this.confrim_password_check = function() {
        var c_password = $('#checknewpass').val();
        var v_password = $('#newpass').val();
        if (c_password == '') {
            $('#checknewpass').siblings('.exclamation').text("请完成该项！").css('display', 'inline-block');
            $('#checknewpass').css('border', '1px solid #ee6f15');
        } else if (!$("#checknewpass").val().match(/(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{6,20}$/)) {
            $('#checknewpass').css('border', '1px solid #ee6f15');
            $('#checknewpass').siblings('.exclamation').text("密码需设置6位及以上，且包含字母和数字！").css('display', 'inline-block');
            $("#newpass").focus(function() {
                $('#checknewpass').siblings('.exclamation').hide().text('请完成该项！');
                $('#checknewpass').css('border', '1px solid #ee6f15');
            });
            return false;
        } else if (c_password != v_password) {
            $('#checknewpass').siblings('.exclamation').text("两次密码不一致，请重新输入！").css('display', 'inline-block');
            $('#checknewpass').css('border', '1px solid #ee6f15');
        } else {
            $('#checknewpass').css('border', '1px solid #eaeaea');
            return true;
        }
    }
};

//验证
var register = new function() {

    this.show_msg = function(id, msg, initial_msg) {
        var msg_label = $('#' + id);
        msg_label.css({ 'border': '1px solid #ee6f15', 'color': '#ee6f15' });
        msg_label.siblings('.warn').text(msg).css('display', 'inline-block');
        msg_label.focus(function() {
            msg_label.next('.warn').hide().text(initial_msg);
        });
    };

    //手机号
    this.mobile_check = function() {
        var mobile = $("#mobile");
        var result = false;
        if (mobile.val() == "") {
            mobile.css({ 'border': '1px solid #ee6f15', 'color': '#ee6f15' });
            mobile.next('.warn').text('请填写手机号码！').css('display', 'inline-block');
            result = false;
        } else if (!mobile.val().match(/^((13|14|15|17|18)+)\d{9}$/)) {
            mobile.css({ 'border': '1px solid #ee6f15', 'color': '#ee6f15' });
            mobile.next('.warn').text('手机号码格式不正确,请重新输入！').css('display', 'inline-block');
            mobile.focus(function() {
                mobile.next('.warn').hide().text('请填写手机号码');
            });
            result = false;
        } else {
            mobile.next('.warn').hide();
            mobile.css({ 'border': '1px solid #ddd', 'color': '#333' });
            result = true;
        }
        return result;
    };



    // 验证码
    this.captcha_check = function() {
        var captcha_msg = $("#captcha_msg");
        if (captcha_msg.val() == "") {
            captcha_msg.css({ 'border': '1px solid #ee6f15', 'color': '#ee6f15' });
            captcha_msg.siblings('.warn').text('请填写短信验证码！').show();
            return false;
        }
        return true;
    };

    //发送验证码
    this.captcha_send = function() {

        var mobile = $("#mobile");
        var result = '';
        if (mobile.val() == "") {
            mobile.css({ 'border': '1px solid #ee6f15', 'color': '#ee6f15' });
            mobile.next('.warn').text('请填写手机号码！').show();
            return false;
        } else if (!mobile.val().match(/^((13|14|15|17|18)+)\d{9}$/)) {
            mobile.css({ 'border': '1px solid #ee6f15', 'color': '#ee6f15' });
            mobile.next('.warn').text('手机号码格式不正确,请重新输入！').show();
            mobile.focus(function() {
                mobile.next('.warn').hide().text('请填写手机号码');
            });
            return false;
        } else {
            $("#captcha_msg").next('.warn').hide();
            result = ajax.captchaAjax(mobile.val(), 'ajax_mobile_sms');
            return result;
        }
    };

    //全部验证
    this.input_all_check = function() {
        var captcha_msg = $("#captcha_msg");
        if (captcha_msg.val() == '') {
            captcha_msg.siblings('.warn').show();
            return false;
        }

        $('.forget_input').each(function() {
            var v_default = $(this).val();
            if ($(this).val() == '') {
                $(this).val(v_default);
                $(this).css({ 'border': '1px solid #ee6f15', 'color': '#ee6f15' });
                $(this).next('.warn').show();
                return false;
            }
        });
        return true;
    }
};

var checkOldPWDFlag = false;
var changePwdAjax = {
    chekOldPwd: function() {
        checkOldPWDFlag = false;
        var data = { type: $('#userType').val(), mobile: $('#nowmobile').val(), password: $('#oldpass').val() };
        $.ajax({
            type: 'POST',
            url: '/api/user/login',
            data: JSON.stringify(data),
            contentType: "application/json;  charset=utf-8",
            success: function(r) {
                if (r.code == 200) {
                    $('#oldpass').css('border', '1px solid #eaeaea');
                    checkOldPWDFlag = true;
                    return true;
                } else {
                    checkOldPWDFlag = false;
                    $('#oldpass').siblings('.exclamation').text('现用密码错误！').css('display', 'inline-block');
                    $('#oldpass').css('border', '1px solid #ee6f15');
                    return false;
                }
            },
            fail: function(r) {
                checkOldPWDFlag = false;
                alert('现用密码验证出错');
                return false;
            }
        });
    },
    changePwd: function() {
        if(!checkOldPWDFlag){console.log('现密码出错');return;}
        var data = { type: $('#userType').val(), mobile: $('#nowmobile').val(), password: $('#newpass').val() };
        $.ajax({
            type: 'PUT',
            url: '/api/user/modify_password',
            data: JSON.stringify(data),
            contentType: "application/json;  charset=utf-8",
            success: function(r) {
                if (r.code == 200) {
                    console.log(r);
                    alert('密码修改成功');
                    $('#changePwdForm')[0].reset();
                    return true;
                } else {
                    alert('密码修改出错');
                    return false;
                }
            }
        });
    }
};
var ajax = new function() {

    this.captchaAjax = function(userdata, url) {
        var isAjax = '';
        $.ajax({
            type: 'post',
            url: url,
            async: false,
            dateType: "json",
            data: { mobile: userdata },
            success: function(ob) {
                var data = eval('(' + ob + ')');
                isAjax = data.info;
            }
        });
        return isAjax;
    };
};
$(function() {
    //判断是否有手机号
    if ($('.newPhone')[0]) {
        $('.addNewPhone, .addNewPhoneForm').hide();
    };
    $(document).on('click', '.newPhone i', function() {
        $('.myphone').text('新手机号:')
        $('.addNewPhoneForm').show();
    });
    $(document).on('click', '.addNewPhone', function() {
        var t = $('.newPhone span').text();
        $('.addNewPhone').hide();
        $('.addNewPhoneForm').show();
    });

    //原始密码
    $('#oldpass').focus(function() {
        // $(this).css('border', '1px solid #ee6f15');
        $(this).siblings('.exclamation').hide();
    }).blur(function() {
        if (password.oldpassword_check()) {
            var el = $(this),
                oldpass = el.val();
            return changePwdAjax.chekOldPwd();
        }
    });

    //新的密码
    $('#newpass').focus(function() {
        // $(this).css('border', '1px solid #ee6f15');
        $(this).siblings('.exclamation').hide();
    }).blur(function() {
        return password.password_check();
    });

    //确认密码
    $('#checknewpass').focus(function() {
        // $(this).css('border', '1px solid #ee6f15');
        $(this).siblings('.exclamation').hide();
    }).blur(function() {
        return password.confrim_password_check();
    });
    //密码提交
    $('.changepassbtn').click(function() {
        if (!password.oldpassword_check()) {
            return false;
        }
        if (!password.password_check()) {
            return false;
        }
        if (!password.confrim_password_check()) {
            return false;
        }
        else {
            // console.log('a');
            changePwdAjax.changePwd();
        }
    });
    //手机验证码
    $('.getVerification_code').click(function() {

        var verifi_button = $('.getVerification_code');
        var result = register.captcha_send();
        var captcha_msg = $("#captcha_msg");
        if (!result) {
            return false;
        }
        if (result == 'success') {
            verifi_button.attr("disabled", true);
            verifi_button.css({ 'background': '#7b7a7a' });
            var timer = null;
            var n = 60;
            timer = setInterval(function() {
                n--;
                // console.log(n);
                verifi_button.val(n + '秒');

                if (n == 0) {
                    clearInterval(timer);
                    verifi_button.attr("disabled", false);
                    verifi_button.css({ 'background': '#ee6f15' });
                    verifi_button.val('获取验证码');
                }
            }, 1000);
        } else {
            register.show_msg('captcha_msg', '发送失败!', '请输入短信验证码');
            return false;
        }
    });

    //提交
    $('#submit_button').click(function() {
        if (!register.mobile_check()) {
            return false;
        }

        var check = register.input_all_check();

        if (!check) {
            return false;
        }

        $('#submit_button').attr("disabled", true);
        $('#changemobile_form').submit();

    });

    $('#mobile').on('blur', function() {
        register.mobile_check();
    })
});

