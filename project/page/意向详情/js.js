(function($) {
    $.fn.extend({
        tmpl: function(str, data) {
            (function() {
                var cache = {};
                this.tmpl = function tmpl(str, data) {
                    var fn = !/\W/.test(str) ?
                        cache[str] = cache[str] ||
                        tmpl(document.getElementById(str).innerHTML) :
                        new Function("obj",
                            "var p=[],print=function(){p.push.apply(p,arguments);};" +
                            "with(obj){p.push('" +
                            str
                            .replace(/[\r\t\n]/g, " ")
                            .split("<%").join("\t")
                            .replace(/((^|%>)[^\t]*)'/g, "$1\r")
                            .replace(/\t=(.*?)%>/g, "',$1,'")
                            .split("\t").join("');")
                            .split("%>").join("p.push('")
                            .split("\r").join("\\'") + "');}return p.join('');");
                    return data ? fn(data) : fn;
                };
            })();
            return this.each(function() {
                $(this).append(tmpl(str, data));
            });
        }
    });
});

$(function() {
    var delnum = "";
    var ajson;

    $('#btnsave').click(function() {
        var a = {};
        a.base = {};
        var obj = $(".rig-bot_wrapp ul").children(".total_price").clone();
        obj.find(':nth-child(n)').remove();       
        a.base.total_price = obj.html().trim().replace(/￥/g, '');

        a.base.discount_price = $('.rig-bot_wrapp .discount_price input' ).val();

        obj = $(".rig-bot_wrapp ul").children(".real_pay_price").clone();
        obj.find(':nth-child(n)').remove();       
        a.base.real_pay_price = obj.html().replace(/￥/g, '').trim();

        a.edit = [];
        var tr = $('.new .edit');
        for (var i = 0; i < tr.length; i++) {
            a.edit[i]={};
            a.edit[i].detail_id = playlist.edit[i]['detail_id'];
            a.edit[i].order_id = playlist.edit[i]['order_id'];
            a.edit[i].product_id = playlist.edit[i]['product_id'];

            a.edit[i].product_name = $('.new tr:eq('+i+') input[name = "edit"]:eq(0)').val();
            a.edit[i].product_sale_price = $('.new tr:eq('+i+') input[name = "edit"]:eq(1)').val();
            a.edit[i].product_sale_number = $('.new tr:eq('+i+') input[name = "edit"]:eq(2)').val();
            a.edit[i].singel_total_price = $('.new tr:eq('+i+') .singel_total_price').text().replace(/￥/g, '').trim();
            
        }
        var tr2 = $('.new .add');
        a.add = [];
        for (var i = 0; i < tr2.length; i++) {
            a.add[i]={};
            a.add[i].order_id = playlist.edit[0]['order_id'];
            /*a.add[i].product_id = playlist.edit[0]['product_id'];*/

            a.add[i].product_name = $('.new .add .addinput0').val();
            a.add[i].product_sale_price = $('.new .add .addinput1').val();
            a.add[i].product_sale_number = $('.new .add .addinput2').val();
            a.add[i].singel_total_price = $('.new .add .addinput3').val();
            
        }
        a.del = delnum;

        ajson = JSON.stringify(a);

        /*$.ajax({
                url: '意向详情/data.json',
                type: 'get',
                dataType: 'json',
                success: function(r) {
                    playlist = r;
                    $('#result').html("");
                    $('#base_detail').html("");
                    $('#result').tmpl('tmpl', playlist);
                    $('#base_detail').tmpl('tmpl2', playlist);
                }
            })*/
        console.log(ajson);
        alert(ajson);
    });
    //随机数组
    $rand_arr = [];
    for (var i = 0; i < 20; i++) {
        $rand_arr.push(i + 1);
    }
    $(document).on('click', '.add2', function() {
        var a = $('.addedTmpl .mb').html();
        var num = $rand_arr[0];
        $('.new').append(a);
        $('.new tr:last .addinput0').attr('name', 'addinput[' + num + '][0]');
        $('.new tr:last .addinput1').attr('name', 'addinput[' + num + '][1]');
        $('.new tr:last .addinput2').attr('name', 'addinput[' + num + '][2]');
        $rand_arr.shift();
    });

    $(document).on('click', '.dele', function() {

        
        var detailNode = $(this).parents("tr");
        var detailVal = detailNode.find('input[type="hidden"]').val();
        if(!detailVal) {
            $(this).parents('tr').remove();
            return;
        }
        if (delnum) {
            delnum +=','+detailNode.find('input[type="hidden"]').val();
            
        }else{
            delnum = detailNode.find('input[type="hidden"]').val();
        }
        $(this).parents('tr').remove();
        
        
    });

})
