_getDate();
var timer = setInterval(function(){_getDate();},1000);

function _getDate(){
	// var date = new Date();
	// var then = new Date('12/1/2015 00:00:00');
	// then.setMonth(then.getMonth() - date.getMonth());
	// then.setDate(then.getDate()-date.getDate());
	// then.setHours(then.getHours()-date.getHours());
	// then.setMinutes(then.getMinutes()-date.getMinutes());
	// then.setSeconds(then.getSeconds()-date.getSeconds());
	// var options = {
	
	// 	day: "numeric", hour: "2-digit", minute: "2-digit",
	// 	second: "2-digit"
	// };

	// document.getElementById("d-day").innerHTML="D-" + then.toLocaleTimeString("ko-kr", "dS h:MM:ss");
	var now = new Date();
	var then = new Date("december 25,2015");
	var gap = then.getTime() - now.getTime();
	var day = Math.floor(gap / (1000 * 60 * 60 * 24));
	var time = Math.floor(gap % (1000 * 60 * 60 * 24));
	var hour = Math.floor(time / (1000*60*60));
	var min = Math.floor((time / (1000*60)) % 60);
	var sec = Math.floor((time / 1000) % 60);

	//document.getElementById("d-day").innerHTML="서비스 오픈: D - "+day+"일 "+("0"+hour).slice(-2)+":"+("0"+min).slice(-2)+":"+("0"+sec).slice(-2)+"<br /><h5>(바스켓 서비스는 모바일에 최적화되어있습니다)</h5>";
	document.getElementById("d-day").innerHTML="<h5>바스켓 서비스는 모바일에 최적화되어있습니다</h5>";
}

function divClose() {
	clearInterval(timer);
	$("#D-day").empty();
}
/*
var now = new Date();
var then = new Date("december 25,2015");
var gap = then.getTime() - now.getTime();
gap = Math.floor(gap / (1000 * 60 * 60 * 24));
document.getElementById("d-day").innerHTML="D-Day : "+gap;*/