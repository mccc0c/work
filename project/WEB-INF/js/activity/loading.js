
function loaded () {
    var myScroll,
        upIcon = $("#up-icon"),
        downIcon = $("#down-icon"),
        distance = 30; //滑动距离

    myScroll = new IScroll('#wrapper', { probeType: 3, mouseWheel: true });

    myScroll.on("scroll",function(){
        var y = this.y,
            maxY = this.maxScrollY - y,
            downHasClass = downIcon.hasClass("reverse_icon"),
            upHasClass = upIcon.hasClass("reverse_icon");

        if(y >= distance){
            !downHasClass && downIcon.addClass("reverse_icon");
            return "";
        }else if(y < distance && y > 0){
            downHasClass && downIcon.removeClass("reverse_icon");
            return "";
        }

        if(maxY >= distance){
            !upHasClass && upIcon.addClass("reverse_icon");
            return "";
        }else if(maxY < distance && maxY >=0){
            upHasClass && upIcon.removeClass("reverse_icon");
            return "";
        }
    });
    function upAjax(){
		alert(2);
        var params = '{"params":{"shopType":"0","sort":"0","cityId":"1","pageRows":"10","deviceType":"MX4","toPage":"1","userX":"118.790609","userY":"32.047616","filter":"0"}}';
        $.ajax({
            type: "post",
            url: "url",
            data: params,
            crossDomain: true,
            xhrFields: {
                withCredentials: true
            },
            dataType: "json",
            contentType: "application/json; charset=utf-8"
        }).done(function(d) {
            if (d && d.response.shopList.length > 0) {
                console.log(d.response.shopList);
                var content = "";
                for(var i=0,len=d.response.shopList.length;i<len;i++){
                    content += "<li>"+ d.response.shopList[i].shopName +"</li>"
                }
                $('#thelist').append(content);
                myScroll.refresh(d.response.page.pageAmount);
            }
        }).fail(function() {
            document.getElementById('thelist').innerHTML = "<li style='font-size:1em;'>数据请求失败，请重新刷新</li>";
        })
    }

    function downAjax(){
		alert(1);
		//alert(this.currentPage);
        var params = '{"params":{"shopType":"0","sort":"0","cityId":"1","pageRows":"10","deviceType":"MX4","toPage":"1","userX":"118.790609","userY":"32.047616","filter":"0"}}';
        $.ajax({
            type: "post",
            url: "url",
            data: params,
            crossDomain: true,
            xhrFields: {
                withCredentials: true
            },
            dataType: "json",
            contentType: "application/json; charset=utf-8"
        }).done(function(d) {
            if (d && d.response.shopList.length > 0) {
                console.log(d.response.shopList);
                var content = "";
                for(var i=0,len=d.response.shopList.length;i<len;i++){
                    content += "<li>"+ d.response.shopList[i].shopName +"</li>"
                }
                $('#thelist').prepend(content);
                myScroll.refresh(d.response.page.pageAmount);
            }
        }).fail(function() {
            document.getElementById('thelist').innerHTML = "<li style='font-size:1em;'>数据请求失败，请重新刷新</li>";
        })
    }
    // 下拉刷新事件
    myScroll.on("slideDown",function(){
        if(this.y > distance){
            downAjax();
            upIcon.removeClass("reverse_icon")
        }
    });
    // 上拉滑动事件
    myScroll.on("slideUp",function(){
        if(this.maxScrollY - this.y > distance){
            upAjax();
            upIcon.removeClass("reverse_icon")
        }
    });
}
loaded ();