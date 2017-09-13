$(function() {
    jQuery.extend(jQuery.fn.dataTableExt.oSort, {
        "num-html-pre": function(a) {
            return parseFloat(a);
        },

        "num-html-asc": function(a, b) {
            var a = parseFloat(a);
            var b = parseFloat(b);
            return ((a < b) ? -1 : ((a > b) ? 1 : 0));
        },

        "num-html-desc": function(a, b) {
            var a = parseFloat(a);
            var b = parseFloat(b);
            return ((a < b) ? 1 : ((a > b) ? -1 : 0));
        }
    });
    var table1 = $('.table1').dataTable({
        "order": [],
        "aoColumns": [{
                "bSortable": false
            }, {
                "bSortable": false
            }, {
                "bSortable": false
            },
            null,
            null, {
                "bSortable": false
            }, {
                "bSortable": false
            }, {
                "bSortable": false
            }, {
                "bSortable": false
            }, {
                "bSortable": false
            }, {
                "bSortable": false
            },
        ],
        "aoColumnDefs": [{
            "type": "num-html",
            "targets": [3, 4],
        }],
        "searching": false,
        "bPaginate": true, //开关，是否显示分页器
        "bFilter": false,
        "info": false
    });

    /*    $('#sort_col_3').dataTable($.extend(true, {}, dataTableDefaults, {
                    "aoColumnDefs": [ 
                       { "sType": "num-html", "aTargets": [ 2 ] }
                     ],
                    'aaSorting': [[2,'asc']]
                }));*/

    $(document).on('click', '.choose li', function() {
        var ind = $(this).index();
        if (!$(this).is('.on')) {
            $(this).addClass('on');            
        } else {
            $(this).removeClass('on');
            if(ind!="0"){
                $(this).parent('ul').find('li').eq(0).removeClass('on');
            }
        }

    });
    /*function checkAll(e){
        var choose = $(e).parent('ul li:gt(0)');
        choose.each(function(){
            if(0)
        })



    }*/
  //区域全选
  $("#district_all").click(function(){
    var a = $(this).attr("class");
    if (a == 'on')
    {
      $.each($(this).siblings("li"), function(i, n){
          $(this).removeClass("on");
      });
    }
    else
    {
      $.each($(this).siblings("li"), function(i, n){
          $(this).addClass("on");
      });
      
    }
  });

 /* $(document).on('click','.choose li:gt(0)',function(){
    if(!$(this).is('on')){
      $(this).parent('ul').find('li:first').removeClass('on');    
    }
  })*/
    $(document).on('click', '.chbtn .title', function() {
        var t = $(this).parents('td');
        if (!t.is('.on')) {
            $('.chbtn').removeClass('on');
            $('.choosebox').hide();
            t.addClass('on').find('.choosebox').show();
        } else {
            $('.chbtn').removeClass('on');
            $('.choosebox').hide();
        }


    });
    $(document).on('click', '.choosed', function() {
        $('.chbtn').removeClass('on');
        $('.choosebox').hide();


    });


});
jQuery.extend(jQuery.fn.dataTableExt.oSort, {
    "html-percent-pre": function(a) {
        var x = String(a).replace(/<[\s\S]*?>/g, ""); //去除html标记  
        x = x.replace(/ /ig, ""); //去除空格  
        x = x.replace(/%/, ""); //去除百分号  
        return parseFloat(x);
    },

    "html-percent-asc": function(a, b) { //正序排序引用方法  
        return ((a < b) ? -1 : ((a > b) ? 1 : 0));
    },

    "html-percent-desc": function(a, b) { //倒序排序引用方法  
        return ((a < b) ? 1 : ((a > b) ? -1 : 0));
    }
});