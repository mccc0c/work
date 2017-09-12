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
     var h = $(this).height();
     var H = $('.head-bar').height() + $('.main-bar').height();
     if (h < H) {
         $('.left-nav').height(H);
     } else {
         $('.left-nav').height(h);
     }

     function placeholderPic() {
         var w = $('body').width();
         if(w <1174){
         	$('.form_addPeopleSearch .sbtn').css('margin-left','2.5%');
         }else{
         	$('.form_addPeopleSearch .sbtn').css('margin-left','0px');
         }
         if (w > 1536 ) {
         	$('body').removeClass('less1024');
         	$('body').removeClass('less1536');
         	$('body').addClass('more1536');
             
         }else if(w<=1536 && w>=1200){
         	$('body').removeClass('less1024');   
         	$('body').removeClass('more1536');
         	$('body').addClass('less1536');  
         	    
         }else{
         	$('body').removeClass('less1536');
         	$('body').removeClass('more1536');
         	$('body').addClass('less1024');
         }
     }
     placeholderPic();
     window.onresize = function() {
         placeholderPic();
     }
 });