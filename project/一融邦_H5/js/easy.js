(function(a){a.fn.extend({tab:function(b){var c={event:"mouseenter",auto:false,duration:3600,nav:".nav",content:".content",before:function(){},after:function(){}};
var d=a.extend({},c,b);return this.each(function(){var j=a(this);var i,g;var e=j.find(">"+d.nav+" li").length;var f=0;if(d.auto){j.on("mouseenter",function(){clearInterval(i);
});j.on("mouseleave",function(){i=setInterval(function(){if(f>=e-1){f=-1;}f++;h(f);},d.duration);}).trigger("mouseleave");j.find(">"+d.nav+" li").on(d.event,function(){f=a(this).index();
g=setTimeout(function(){h(f);},120);});j.find(">"+d.nav+" li").on("mouseleave",function(){clearInterval(g);});}else{j.find(">"+d.content+">ul").each(function(){a(this).children("li:not(:first)").hide();
});j.find(">"+d.nav+" li").on(d.event,function(){d.before(k,j);a(this).addClass("current").siblings().removeClass("current");var k=a(this).index();j.find(">"+d.content+">ul>li").eq(k).show(300,function(){d.after(k,j);
}).siblings().hide();return false;});}function h(k){j.find(".nav li").eq(k).addClass("current").siblings().removeClass("current");j.find(".content>ul>li").eq(k).show().siblings().hide();
return false;}});},tmpl:function(c,b){(function(){var e={};this.tmpl=function d(h,g){var f=!/\W/.test(h)?e[h]=e[h]||d(document.getElementById(h).innerHTML):new Function("obj","var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('"+h.replace(/[\r\t\n]/g," ").split("<%").join("\t").replace(/((^|%>)[^\t]*)'/g,"$1\r").replace(/\t=(.*?)%>/g,"',$1,'").split("\t").join("');").split("%>").join("p.push('").split("\r").join("\\'")+"');}return p.join('');");
return g?f(g):f;};})();return this.each(function(){a(this).append(tmpl(c,b));});},modal:function(b){var c={bgscroll:false,width:null,height:null,dragable:false,ani:true,bgclose:false,mobileDetect:true,myalert:false,alertCenter:true,hideDuration:0,top:"50%",left:"50%",overflow:false,beforeOpen:function(){},onOpen:function(){},onClose:function(){},onOk:function(){}};
var e=a.extend({},c,b);var d=this;return(function(){var k;var g=d.selector;var m=e.dialog?a(e.dialog):d;var r=e.dialog?e.dialog:d.selector;var h=m.height();
var l=m.width();var p=false;var n,j;var o=window.innerWidth-a("body").width();if(e.mobileDetect&&d.isMobile()){m.addClass("dmobile");}if(!m.next(".modalbg")[0]){m.after('<div class="modalbg"></div>');
a(".modalbg").height(a(document).height());}var f=m.next(".modalbg");if(!e.dragable){m.find(".dtitle").css("cursor","auto");}if(e.ani){m.addClass("dani");
}if(e.myalert){m.addClass("dalert");}if(e.alertCenter===false){m.find(".dcontent").css("text-align","left");}m.hide();q(l,h);if(e.auto){m=d;m.fadeIn();
f.fadeIn();}if(e.width||e.height){m.css({width:e.width,height:e.height});}if(e.dialog){a(document).on("click",g,function(t){k=a(this);t.stopPropagation();
e.beforeOpen(k);i();e.onOpen(k);});}else{k=true;}a(document).on("click",r+" .dclose",function(){if(!k){return;}s();e.onClose();k=null;return false;});a(document).on("click",r+" .dcancle",function(){if(!k){return;
}s();e.onClose();k=null;return false;});a(document).on("click",r+" .dokay",function(){if(!k){return;}s();e.onOk(k,a(this).parents(r));k=null;return false;
});a(document).on("mousedown",r+" .dtitle",function(t){if(e.dragable){p=true;}n=t.clientX-parseInt(m.css("left"));j=t.clientY-parseInt(m.css("top"));return false;
});f.on("click",function(){if(e.bgclose){s();e.onClose();}});function q(t,u){m.css({left:e.left,top:e.top,"margin-left":-t/2+"px","margin-top":-u/2+"px"});
if(e.left!=="50%"){m.css({"margin-left":"0px"});}else{if(e.top!=="50%"){m.css({"margin-top":"0px"});}}}function i(){h=m.height();l=m.width();q(l,h);if(e.bgscroll){a("body").css({overflow:"auto"});
}else{a("body").css({overflow:"hidden"});}a("body").css({"padding-right":o+"px"});m.fadeIn();f.fadeIn(0);if(e.hideDuration!==0){m.find(".dtitle,.dbtn").hide();
m.addClass("dalert");setTimeout(function(){s();e.onClose();},e.hideDuration);}}function s(){m.fadeOut("fast");f.fadeOut("fast");if(e.overflow==false){setTimeout(function(){a("body").css({overflow:"auto","padding-right":"0px"});
},200);}}a(document).mousemove(function(B){if(p){var B=B||window.event;var v=B.clientX-n;var x=B.clientY-j;var A=m.width()/2;var z=m.height()/2;var u=document.documentElement.clientWidth-A;
var y=document.documentElement.clientHeight-z;if(v<A){v=A;}else{if(v>u){v=u;}}if(x<z){x=z;}else{if(x>y){x=y;}}m.css({left:v+"px",top:x+"px"});return false;
}});a(document).mouseup(function(t){p=false;});a(window).resize(function(){h=m.height();l=m.width();q(l,h);});d.open=function(){e.beforeOpen();i();e.onOpen();
};d.close=function(){s();e.onClose();};return d;})();},isMobile:function(){if(/Android|Windows Phone|webOS|iPhone|iPod|BlackBerry|iPad|Opera/i.test(navigator.userAgent)){return true;
}},myalert:function(b){var c='<div id="myalert" style="width:70%; background:#000; opacity:0.8; color:#fff; font-size:13px; min-height:20px; line-height:20px; padding:5px; text-align:center;position:absolute; top:40%; left:15%; z-index:100001; border-radius:5px; display:none">'+b+"</div>";
a("body").append(c);a("#myalert").fadeIn();setTimeout(function(){a("#myalert").fadeOut().remove();},3500);},slider:function(b){var c={num:1,auto:false,loop:true};
var d=a.extend({},c,b);return(function(){var g=a(this);var h=g;var j=1;var k=a(h).find(".list ul");var e=a(h).find(".list li").outerWidth(true);if(d.loop==true){var o=k.html();
k.append(o);}var n=a(h).find(".list li").length;var m=Math.round(a(h).find(".list").outerWidth(true)/e);var l=Math.ceil((n-m)/d.num);if(n<=m){a(h).find(".prev, .next").hide();
a(h).find(".list").addClass("lessimg");}if(d.loop==false){a(h).find(".prev").addClass("disabled");}a(h).find(".next").click(function(){if(k.is(":animated")){k.stop(true,true);
}if(d.loop){if(j>=l){var i=n/2-m;k.css("margin-left",-e*i*d.num);f(-1);j=i+2;}else{f(-1);j++;}}else{if(j>l){return;}else{a(h).find(".prev").removeClass("disabled");
a(this).removeClass("disabled");f(-1);j++;if(j>l){a(this).addClass("disabled");}return false;}}});a(h).find(".prev").click(function(){if(k.is(":animated")){k.stop(true,true);
}if(d.loop){if(j==1){k.css("margin-left",-e*n/2*d.num);f(1);j=n/2;}else{f(1);j--;}}else{if(j==1){return;}else{a(h).find(".prev").removeClass("disabled");
a(this).removeClass("disabled");f(1);j--;if(j==1){a(this).addClass("disabled");}return false;}}});function f(i){k.animate({marginLeft:"+="+e*d.num*i},200);
}setInterval(function(){if(d.auto){a(h).find(".next").trigger("click");}},4000);})();},fixmenu:function(b){var c={};var d=a.extend({},c,b);return this.each(function(){var f=a(this);
var e=f[0]&&f.offset().top;a(window).scroll(function(){if(a(this).scrollTop()>e){f.addClass("on").css({position:"fixed",top:"0px"});}else{f.removeClass("on").css({position:"absolute",top:e+"px"});
a(".fixblank").show();}});});},accordion:function(b){var c={event:"mouseenter",showfirst:true,showall:false,collapse:true,animate:true,duration:300,nav:"dt",content:"dd",active:"on"};
var d=a.extend({},c,b);return this.each(function(){var h=a(this),g=h.find(d.nav),f=h.find(d.content),e=d.active;if(d.showfirst){g.eq(0).addClass(e).next(d.content).show();
}if(d.showall){g.addClass(e);f.show();}g.on(d.event,function(){var l=a(this),k=l.next(d.content),j=a(this).siblings(),i=a(this).siblings().next(d.content);
if(d.animate){if(l.is("."+e)){k.slideUp();setTimeout(function(){l.removeClass(e);},400);}else{k.slideDown();setTimeout(function(){l.addClass(e);},400);
}if(d.collapse){i.slideUp();setTimeout(function(){j.removeClass(e);},400);}}else{if(l.is("."+e)){l.removeClass(e);k.hide();}else{l.addClass(e);k.show();
}if(d.collapse){j.removeClass(e);i.hide();}}});});},dropdown:function(b){var c={event:"mouseenter"};var d=a.extend({},c,b);return this.each(function(){var e=a(this);
e.find("ul li:has(ul)").on(d.event,function(){a(this).children("ul").stop(true,true).slideDown(400);});e.find("ul li:has(ul)").on("mouseleave",function(){a(this).children("ul").stop(true,true).slideUp("fast");
});});},slide123:function(b){var c={duration:3600};var d=a.extend({},c,b);return this.each(function(){var j=a(this);var i;var e=j.find(".num li").length;
var g=j.find(".content li").width();var f=0;j.hover(function(){clearInterval(i);},function(){i=setInterval(function(){if(f>=e-1){f=-1;}f++;h(f);},d.duration);
}).trigger("mouseleave");j.find(".num li").mouseover(function(){f=a(".slide123 .num li").index(this);setTimeout(function(){h(f);},200);});function h(k){j.find(".num li").removeClass("on").eq(k).addClass("on");
j.find(".content ul").stop().animate({left:-g*k},500);}});},scrollone:function(b){var c={duration:3600};var d=a.extend({},c,b);return this.each(function(){var f=a(this);
var e=f.find("li").height();f.each(function(){var g=a(this);setInterval(function(){var h=g.find("li:last-child");g.find("li:last-child").remove();g.find("ul").prepend(h.css({height:0}));
h.animate({height:e+"px"});},d.duration);});});},scrollline:function(b){var c={duration:3600};var d=a.extend({},c,b);return this.each(function(){var h=a(this);
var e=-h.find("li").height();function f(){h.find("ul:first").animate({marginTop:e+"px"},500,function(){a(this).css({marginTop:"0px"}).find("li:first").appendTo(this);
});}var g=setInterval(function(){f();},d.duration);h.hover(function(){clearInterval(g);},function(){g=setInterval(function(){f();},d.duration);});});},sidemenu:function(b){var c={event:"mouseenter"};
var d=a.extend({},c,b);return this.each(function(){var f=a(this);var e=f.find(".content").width();f.on(d.event,function(){a(this).animate({right:0},"fast");
});f.on("mouseleave",function(){a(this).animate({right:-e+"px"},"fast");});});},wordsleft:function(b){var c={};var d=a.extend({},c,b);return this.each(function(){var e=a(this);
a(document).keyup(function(){e.text(110-a(d.textarea).val().length);});});},inout:function(b){var c={};var d=a.extend({},c,b);return this.each(function(){var j=a(this);
var i,g;var e=j.find(".num li").length;var f=0;j.find(".content li").first().show();j.hover(function(){clearInterval(i);},function(){i=setInterval(function(){if(f>=e-1){f=-1;
}f++;h(f);},3600);}).trigger("mouseleave");j.find(".num li").hover(function(){f=j.find(".num li").index(this);g=setTimeout(function(){h(f);},120);},function(){clearTimeout(g);
});function h(k){j.find(".num li").eq(k).addClass("on").siblings().removeClass("on");j.find(".content li").eq(k).fadeIn("200").siblings().fadeOut("200");
return false;}});},delayshow:function(b){var c={};var d=a.extend({},c,b);return this.each(function(){var e=a(this);e.find(".nav li").hover(function(){var f=e.find(".nav li").index(this);
timer=setTimeout(function(){e.find(".nav li").removeClass("current").eq(f).addClass("current");e.find(".content li").hide().eq(f).show();},200);},function(){clearTimeout(timer);
});});},tip:function(b){var c={};var d=a.extend({},c,b);return this.each(function(){var e=a(this);e.click(function(f){f.stopPropagation();var g=a(f.target).offset();
a(d.target).css({top:g.top+a(f.target).height()+"px",left:g.left});a(d.target).toggle("slow");});a(document).click(function(){a(d.target).slideUp("slow");
});a(d.target).click(function(f){a(this).fadeOut(1000);});});},zoom:function(b){var d={xzoom:400,yzoom:400,offset:10,position:"right",lens:1,preload:1};
if(b){a.extend(d,b);}var c="";a(this).hover(function(){var f=a(this).offset().left;var i=a(this).offset().top;var h=a(this).children("img").get(0).offsetWidth;
var e=a(this).children("img").get(0).offsetHeight;c=a(this).children("img").attr("alt");var g=a(this).children("img").attr("src");a(this).children("img").attr("alt","");
if(a("div.zoomdiv").get().length==0){a(this).after("<div class='zoomdiv'><img class='bigimg' src='../images/"+g+"'/></div>");a(this).append("<div class='jqZoomPup'> </div>");
}if(d.position=="right"){if(f+h+d.offset+d.xzoom>screen.width){leftpos=f-d.offset-d.xzoom;}else{leftpos=f+h+d.offset;}}else{leftpos=f-d.xzoom-d.offset;
if(leftpos<0){leftpos=f+h+d.offset;}}a("div.zoomdiv").css({top:i,left:leftpos});a("div.zoomdiv").width(d.xzoom);a("div.zoomdiv").height(d.yzoom);a("div.zoomdiv").show();
if(!d.lens){a(this).css("cursor","crosshair");}a(document.body).mousemove(function(m){mouse=new MouseEvent(m);var n=a(".bigimg").get(0).offsetWidth;var l=a(".bigimg").get(0).offsetHeight;
var j="x";var k="y";if(isNaN(k)|isNaN(j)){var k=(n/h);var j=(l/e);a("div.jqZoomPup").width((d.xzoom)/(k*1));a("div.jqZoomPup").height((d.yzoom)/(j*1));
if(d.lens){a("div.jqZoomPup").css("visibility","visible");}}xpos=mouse.x-a("div.jqZoomPup").width()/2-f;ypos=mouse.y-a("div.jqZoomPup").height()/2-i;if(d.lens){xpos=(mouse.x-a("div.jqZoomPup").width()/2<f)?0:(mouse.x+a("div.jqZoomPup").width()/2>h+f)?(h-a("div.jqZoomPup").width()-2):xpos;
ypos=(mouse.y-a("div.jqZoomPup").height()/2<i)?0:(mouse.y+a("div.jqZoomPup").height()/2>e+i)?(e-a("div.jqZoomPup").height()-2):ypos;}if(d.lens){a("div.jqZoomPup").css({top:ypos,left:xpos});
}scrolly=ypos;a("div.zoomdiv").get(0).scrollTop=scrolly*j;scrollx=xpos;a("div.zoomdiv").get(0).scrollLeft=(scrollx)*k;});},function(){a(this).children("img").attr("alt",c);
a(document.body).unbind("mousemove");if(d.lens){a("div.jqZoomPup").remove();}a("div.zoomdiv").remove();});count=0;if(d.preload){a("body").append("<div style='display:none;' class='jqPreload"+count+"'></div>");
a(this).each(function(){var f=a(this).children("img").attr("src");var e=jQuery("div.jqPreload"+count+"").html();jQuery("div.jqPreload"+count+"").html(e+'<img src="'+f+'">');
});}},check:function(b){var c={};var d=a.extend({},c,b);return this.each(function(){var e=a(this);a("[name=items]:checkbox").click(function(){var f=true;
a("[name=items]:checkbox").each(function(){if(!this.checked){f=false;}});a("#checkall").prop("checked",f);});a("#checkall").click(function(){a("[name=items]:checkbox").prop("checked",this.checked);
});a("#uncheckall").click(function(){a("[name=items]:checkbox").prop("checked",false);});a("#fan").click(function(){a("[name=items]:checkbox").each(function(){this.checked=!this.checked;
});});a("#submit").click(function(){var f="你选中的是：\r\n";a("[name=items]:checkbox:checked").each(function(){f+=a(this).val()+"\r\n";});alert(f);});});},scrollto:function(b){var c={};
var d=a.extend({},c,b);return this.each(function(){var e=a(this);a(function(){a(window).scroll(function(){if(a(window).scrollTop()>700){a(".anchor").show();
}else{a(".anchor").hide();}});a(".anchor").click(function(){a("html, body").animate({scrollTop:0},240);});});jQuery.scrollto=function(g,f){a(g).click(function(){var h=a(this).data("scroll");
a(this).addClass("thisscroll").siblings().removeClass("thisscroll");a("html,body").animate({scrollTop:a(h).offset().top},f);return false;});};a.scrollto("#scrollnav a",600);
});},scrollbar:function(b){var c={};var d=a.extend({},c,b);return this.each(function(){var j=a(this);var f=j.find(".bar1")[0];var h=j.find(".bar2")[0];
var g=j.find(".bar3")[0];var i=j.find(".bar0")[0];var e=0;f.onmousedown=function(n){var m=n||event;e=m.clientY-f.offsetTop;document.onmousemove=l;document.onmouseup=k;
function l(r){if(a(g).height()>a(h).height()){var o=r||event;var p=o.clientY-e;var q=i.offsetHeight-f.offsetHeight;if(p<0){p=0;}else{if(p>q){p=q;}}f.style.top=p+"px";
var s=p/q;g.style.top=-s*(g.offsetHeight-h.offsetHeight)+"px";}}function k(){this.onmousemove=null;this.onmouseup=null;}return false;};});},waterfall:function(b){var c={scrollBox:null,moreHeight:0,callback:function(){}};
var d=a.extend({},c,b);return this.each(function(){var f=a(this);var e=true;f.scroll(function(){var g=d.scrollBox?a(d.scrollBox).height()-d.moreHeight:a(document).height()-d.moreHeight;
if(f.scrollTop()>=g-f.height()){if(e){d.callback();e=false;}setTimeout(function(){e=true;},1200);}});});},scratch:function(b){var c={image:false,percent:0.85,radius:30};
var d=a.extend({},c,b);return this.each(function(){var i=a(this);var g=i[0],q=g.getContext("2d");var f,o,p=d.radius,m,e=100,n=30;var l=i.parent(".scratch");
var j=i.parent(".scratch")[0];g.width=j.clientWidth;g.height=j.clientHeight;if(d.image){var h=new Image();h.src=d.image;h.onload=function(){q.drawImage(h,0,0,g.width,g.height);
l.addClass("on");k();};}else{q.fillStyle="#999";q.fillRect(0,0,g.width,g.height);l.addClass("on");k();}function k(){var s="ontouchstart" in window?true:false,u=s?"touchstart":"mousedown",t=s?"touchmove":"mousemove",r=s?"touchend":"mouseup";
q.lineCap="round";q.lineJoin="round";q.lineWidth=p*2;q.globalCompositeOperation="destination-out";g.addEventListener(u,function(v){clearTimeout(m);v.preventDefault();
f=s?v.targetTouches[0].pageX-j.offsetLeft:v.clientX-j.offsetLeft;o=s?v.targetTouches[0].pageY-j.offsetTop:v.clientY-j.offsetTop;q.save();q.beginPath();
q.arc(f,o,1,0,2*Math.PI);q.fill();q.restore();g.addEventListener(t,w);g.addEventListener(r,function(){g.removeEventListener(t,w);m=setTimeout(function(){var C=q.getImageData(0,0,g.width,g.height);
var A=0;for(var z=0;z<C.width;z+=n){for(var D=0;D<C.height;D+=n){var B=(D*C.width+z)*4;if(C.data[B+3]>0){A++;}}}if(A/(C.width*C.height/(n*n))<d.percent){g.className="removeimg";
j.style.display="block";}},e);});function w(x){clearTimeout(m);x.preventDefault();x2=s?x.targetTouches[0].pageX-j.offsetLeft:x.clientX-j.offsetLeft;y2=s?x.targetTouches[0].pageY-j.offsetTop:x.clientY-j.offsetTop;
q.save();q.moveTo(f,o);q.lineTo(x2,y2);q.stroke();q.restore();f=x2;o=y2;}});}});},shake:function(b){var c={threshold:1500,waiting:1500,timeout:2000,music:"images/shake.mp3",shaked:function(){}};
var d=a.extend({},c,b);return this.each(function(){var h=a(this);var m=true;var f;if(window.DeviceMotionEvent){window.addEventListener("devicemotion",g,false);
}var k=d.threshold;var e=0;var p,o,n,l,j,i;function g(u){var q=u.accelerationIncludingGravity;var t=new Date().getTime();if((t-e)>100){var r=(t-e);e=t;
p=q.x;o=q.y;n=q.z;var s=Math.abs(p+o+n-l-j-i)/r*10000;if(s>k){if(d.music){a("body").append('<audio src="../images/'+d.music+'"></audio>');a("audio")[0].play();
}clearTimeout(f);setTimeout(function(){if(m){d.shaked();m=false;}},d.waiting);f=setTimeout(function(){m=true;},d.timeout);}l=p;j=o;i=n;}}});},demo:function(b){var c={};
var d=a.extend({},c,b);return this.each(function(){var e=a(this);});}});})(jQuery);if(typeof console=="undefined"||typeof console.log=="undefined"){var console={log:function(){}};
}function setCookie(b,d,a){var c=new Date();c.setDate(c.getDate()+a);document.cookie=b+"="+d+"; expires="+c;}function getCookie(c){var a=document.cookie.split("; ");
for(var d=0;d<a.length;d++){var b=a[d].split("=");if(b[0]==c){return b[1];}}return"";}function removeCookie(a){setCookie(a,"",-1);}function urlArgs(d){var c=location.search.substring(1).split("&");
for(var b=0;b<c.length;b++){var a=c[b].split("=");if(a[0]==d){return decodeURI(a[1]);}}return"";}function imgLoder(c,b){var a=0;$.each(c,function(e,f){var d=new Image();
d.src=f;d.onload=function(){a++;if(a==c.length){b();}};});}function lsset(a,c){var b=new Date().getTime();localStorage.setItem(a,JSON.stringify({data:c,time:b}));
}function lsget(c,g){var d=localStorage.getItem(c);if(!d){return null;}try{JSON.parse(d)&&JSON.parse(d).data&&JSON.parse(d).time;}catch(f){return null;
}var a=JSON.parse(d);if(new Date().getTime()-a.time>g){return null;}else{try{JSON.parse(a.data);}catch(f){return a.data;}var b=JSON.parse(a.data);return b;
}}function deepCopy(c){if(typeof c!="object"){return c;}var b={};for(var a in c){b[a]=deepCopy(c[a]);}return b;}Array.prototype.min=function(){var c=this[0];
var a=this.length;for(var b=1;b<a;b++){if(this[b]<c){c=this[b];}}return c;};Array.prototype.max=function(){var b=this[0];var a=this.length;for(var c=1;
c<a;c++){if(this[c]>b){b=this[c];}}return b;};