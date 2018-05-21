$(function(){
	  // 时间倒计时，到期时间为2017年1月15日
	  var nowDay = new Date();
	  var endDay = new Date('2017/03/31 00:00:00');
	  var differ = Math.floor((endDay.getTime() - nowDay.getTime()) / (1000 * 60 * 60 * 24)) + 1;
	if(differ < 10){
		$('#time1').text('0');
		$('#time2').text(differ.toString().substr(0, 1));
	}else if(differ>=10){
		$('#time1').text(differ.toString().substr(0, 1));
		$('#time2').text(differ.toString().substr(1, 2));
	}else{
		$('#time1').text('0');
		$('#time2').text('0');
	}

})